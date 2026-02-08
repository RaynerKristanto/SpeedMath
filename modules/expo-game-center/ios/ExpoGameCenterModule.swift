import ExpoModulesCore
import GameKit

public class ExpoGameCenterModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoGameCenter")

    AsyncFunction("authenticate") { () -> [String: Any?] in
      return try await withCheckedThrowingContinuation { continuation in
        var hasResumed = false
        GKLocalPlayer.local.authenticateHandler = { viewController, error in
          guard !hasResumed else { return }

          if let vc = viewController {
            DispatchQueue.main.async {
              guard let rootVC = UIApplication.shared.connectedScenes
                .compactMap({ $0 as? UIWindowScene })
                .flatMap({ $0.windows })
                .first(where: { $0.isKeyWindow })?
                .rootViewController else {
                hasResumed = true
                continuation.resume(returning: [
                  "isAuthenticated": false,
                  "playerAlias": nil,
                  "error": "No root view controller",
                ])
                return
              }
              rootVC.present(vc, animated: true) {
                let player = GKLocalPlayer.local
                hasResumed = true
                continuation.resume(returning: [
                  "isAuthenticated": player.isAuthenticated,
                  "playerAlias": player.isAuthenticated ? player.alias : nil,
                  "error": nil,
                ])
              }
            }
          } else if let error = error {
            hasResumed = true
            continuation.resume(returning: [
              "isAuthenticated": false,
              "playerAlias": nil,
              "error": error.localizedDescription,
            ])
          } else {
            let player = GKLocalPlayer.local
            hasResumed = true
            continuation.resume(returning: [
              "isAuthenticated": player.isAuthenticated,
              "playerAlias": player.isAuthenticated ? player.alias : nil,
              "error": nil,
            ])
          }
        }
      }
    }

    Function("isAuthenticated") { () -> Bool in
      return GKLocalPlayer.local.isAuthenticated
    }

    Function("getPlayerAlias") { () -> String? in
      let player = GKLocalPlayer.local
      return player.isAuthenticated ? player.alias : nil
    }

    AsyncFunction("submitScore") { (score: Int, leaderboardID: String) -> [String: Any?] in
      guard GKLocalPlayer.local.isAuthenticated else {
        return ["success": false, "error": "Player not authenticated"]
      }
      do {
        try await GKLeaderboard.submitScore(
          score,
          context: 0,
          player: GKLocalPlayer.local,
          leaderboardIDs: [leaderboardID]
        )
        return ["success": true, "error": nil]
      } catch {
        return ["success": false, "error": error.localizedDescription]
      }
    }

    AsyncFunction("showLeaderboard") { (leaderboardID: String) in
      guard GKLocalPlayer.local.isAuthenticated else {
        throw NSError(
          domain: "ExpoGameCenter",
          code: 1,
          userInfo: [NSLocalizedDescriptionKey: "Player not authenticated"]
        )
      }
      await MainActor.run {
        let gcVC = GKGameCenterViewController(
          leaderboardID: leaderboardID,
          playerScope: .global,
          timeScope: .allTime
        )
        let delegate = GameCenterDelegate.shared
        gcVC.gameCenterDelegate = delegate

        guard let rootVC = UIApplication.shared.connectedScenes
          .compactMap({ $0 as? UIWindowScene })
          .flatMap({ $0.windows })
          .first(where: { $0.isKeyWindow })?
          .rootViewController else { return }

        rootVC.present(gcVC, animated: true)
      }
    }
  }
}

class GameCenterDelegate: NSObject, GKGameCenterControllerDelegate {
  static let shared = GameCenterDelegate()

  func gameCenterViewControllerDidFinish(
    _ gameCenterViewController: GKGameCenterViewController
  ) {
    gameCenterViewController.dismiss(animated: true)
  }
}
