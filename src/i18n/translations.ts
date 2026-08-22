export type Language = 'en' | 'zh';

export const LANGUAGE_OPTIONS: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' },
];

const en = {
  // Home
  appTitle: 'Speed Math',
  appSubtitle: 'Can you beat the clock?',
  playSolo: 'Play Solo',
  localTwoPlayer: 'Local 2-Player',
  leaderboard: 'Leaderboard',
  settings: 'Settings',
  ruleAnswerWithin: '• Answer within {seconds} seconds',
  ruleAnswerWithinOne: '• Answer within 1 second',
  ruleNoTimeLimit: '• Take as long as you need',
  ruleScoring: '• Each correct answer = +1 point',
  ruleMistake: '• One mistake = Game Over',

  // Game
  score: 'Score',
  answerTrue: 'TRUE',
  answerFalse: 'FALSE',

  // Game over
  finalScore: 'Final Score',
  bestScore: 'Best: {score}',
  timeRanOut: '⏱️ Time ran out',
  wrongAnswer: '❌ Wrong answer',
  thisWasTrue: 'This was TRUE',
  thisWasFalse: 'This was FALSE',
  submitToLocalLeaderboard: '📝 Submit to Local Leaderboard',
  scoreSubmitted: '✅ Score submitted!',
  playAgain: 'Play Again',
  mainMenu: 'Main Menu',

  // Settings
  timePerQuestion: 'Time Per Question',
  timePerQuestionDescription: 'How long players have to answer each question',
  secondsShort: '{count}s',
  noTimeLimit: 'No Time Limit',
  buttonLayout: 'Button Layout',
  buttonLayoutDescription: 'Position of True and False buttons',
  trueOnLeft: 'True on Left',
  trueOnRight: 'True on Right',
  language: 'Language',
  languageDescription: 'Language used across the app',
  backToMenu: 'Back to Menu',

  // Leaderboard
  leaderboardTitle: '🏆 Leaderboard',
  topTenScores: 'Top 10 Scores',
  leaderboardDisclaimer:
    'Stored locally on this device. Clearing app data or reinstalling will reset scores. Download the iOS app for online leaderboards!',
  noScoresYet: 'No Scores Yet',
  noScoresBody: 'Play a game and submit your score to see it here!',

  // Multiplayer
  player1: 'Player 1',
  player2: 'Player 2',
  versus: 'VS',
  player1Wins: 'Player 1 Wins!',
  player2Wins: 'Player 2 Wins!',
  itsATie: "It's a Tie!",
  playerOut: '(OUT)',
  eliminated: 'ELIMINATED',

  // Username modal
  submitToLeaderboard: 'Submit to Leaderboard',
  yourScore: 'Your Score',
  enterYourName: 'Enter your name:',
  usernamePlaceholder: 'Username',
  usernameHint: '3-20 characters (letters, numbers, Chinese, spaces, _)',
  submit: 'Submit',
  skip: 'Skip',

  // Errors
  errorUsernameTooShort: 'Username must be at least 3 characters',
  errorUsernameTooLong: 'Username must be 20 characters or less',
  errorUsernameInvalidChars:
    'Username can only contain letters, numbers, Chinese characters, spaces, and underscores',
  errorInvalidUsername: 'Invalid username',
  errorInvalidScore: 'Invalid score',
  errorSaveFailed: 'Failed to save score. Please try again.',
  errorNoLeaderboardForTimeLimit: 'No leaderboard for this time limit',
  errorGameCenterSubmitFailed: 'Failed to submit to Game Center',
  errorUsernameRequired: 'Username required for local leaderboard',
  errorSubmitFailed: 'Failed to submit score',
};

const zh: Record<keyof typeof en, string> = {
  // Home
  appTitle: '速算挑战',
  appSubtitle: '你能跑赢时间吗？',
  playSolo: '单人游戏',
  localTwoPlayer: '双人对战',
  leaderboard: '排行榜',
  settings: '设置',
  ruleAnswerWithin: '• 每题限时 {seconds} 秒',
  ruleAnswerWithinOne: '• 每题限时 1 秒',
  ruleNoTimeLimit: '• 不限时间，慢慢想',
  ruleScoring: '• 每答对一题 = +1 分',
  ruleMistake: '• 答错一次 = 游戏结束',

  // Game
  score: '得分',
  answerTrue: '正确',
  answerFalse: '错误',

  // Game over
  finalScore: '最终得分',
  bestScore: '最佳：{score}',
  timeRanOut: '⏱️ 时间到了',
  wrongAnswer: '❌ 答错了',
  thisWasTrue: '这题是“正确”',
  thisWasFalse: '这题是“错误”',
  submitToLocalLeaderboard: '📝 提交到本地排行榜',
  scoreSubmitted: '✅ 成绩已提交！',
  playAgain: '再来一局',
  mainMenu: '主菜单',

  // Settings
  timePerQuestion: '每题时间',
  timePerQuestionDescription: '玩家回答每道题可用的时间',
  secondsShort: '{count}秒',
  noTimeLimit: '不限时间',
  buttonLayout: '按钮布局',
  buttonLayoutDescription: '“正确”和“错误”按钮的位置',
  trueOnLeft: '正确在左',
  trueOnRight: '正确在右',
  language: '语言',
  languageDescription: '全应用使用的语言',
  backToMenu: '返回菜单',

  // Leaderboard
  leaderboardTitle: '🏆 排行榜',
  topTenScores: '前 10 名',
  leaderboardDisclaimer:
    '成绩仅保存在本机。清除应用数据或重装应用会重置成绩。下载 iOS 版可使用在线排行榜！',
  noScoresYet: '还没有成绩',
  noScoresBody: '玩一局并提交成绩，就会显示在这里！',

  // Multiplayer
  player1: '玩家 1',
  player2: '玩家 2',
  versus: 'VS',
  player1Wins: '玩家 1 获胜！',
  player2Wins: '玩家 2 获胜！',
  itsATie: '平局！',
  playerOut: '（出局）',
  eliminated: '已淘汰',

  // Username modal
  submitToLeaderboard: '提交到排行榜',
  yourScore: '你的得分',
  enterYourName: '请输入你的名字：',
  usernamePlaceholder: '用户名',
  usernameHint: '3-20 个字符（字母、数字、汉字、空格、下划线）',
  submit: '提交',
  skip: '跳过',

  // Errors
  errorUsernameTooShort: '用户名至少需要 3 个字符',
  errorUsernameTooLong: '用户名不能超过 20 个字符',
  errorUsernameInvalidChars: '用户名只能包含字母、数字、汉字、空格和下划线',
  errorInvalidUsername: '用户名无效',
  errorInvalidScore: '成绩无效',
  errorSaveFailed: '保存成绩失败，请重试。',
  errorNoLeaderboardForTimeLimit: '该时间限制暂无排行榜',
  errorGameCenterSubmitFailed: '提交到 Game Center 失败',
  errorUsernameRequired: '本地排行榜需要用户名',
  errorSubmitFailed: '提交成绩失败',
};

export type TranslationKey = keyof typeof en;

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en,
  zh,
};

export type MessageTier = 'sPlusPlusPlus' | 'sPlusPlus' | 's' | 'a' | 'b' | 'c' | 'f';

export const gameOverMessages: Record<Language, Record<MessageTier, string[]>> = {
  en: {
    sPlusPlusPlus: ["Take my\uD83D\uDCB0 and don't go any higher"],
    sPlusPlus: ['\uD83E\uDD2F someone check this run', 'You are \uD83E\uDD16'],
    s: ['top 1% behavior', "you're built different", 'main character moment', 'clip this'],
    a: [
      'certified solid run',
      'Good but not top tier',
      "You're locked in",
      'this is above above average',
    ],
    b: [
      'respectable performance',
      'not bad at all actually',
      'lowkey solid',
      'not cracked, but capable',
    ],
    c: [
      'nothing to screenshot',
      'Mid',
      "you weren't guessing the whole time",
      'this could go somewhere',
      'a few neurons connected',
    ],
    f: [
      "Numbers are hard. It's okay.",
      "We'll keep this a secret from your friends",
      'the equation watching you answer: \uD83D\uDC41\uFE0F\uD83D\uDC44\uD83D\uDC41\uFE0F',
      'Even my grandma can get 10',
      'the scoreboard is judging silently',
      'you got this next run trust',
      'As good as my monkey!',
    ],
  },
  zh: {
    sPlusPlusPlus: ['\uD83D\uDCB0 拿走我的钱，别再往上冲了'],
    sPlusPlus: ['\uD83E\uDD2F 谁来查一下这局', '你是 \uD83E\uDD16 吧'],
    s: ['前 1% 的操作', '你和别人不一样', '主角光环时刻', '这段必须剪下来'],
    a: ['稳得一批', '很强，但还不是天花板', '完全进入状态了', '这已经是超常发挥'],
    b: ['表现可圈可点', '其实真的不赖', '低调但扎实', '算不上神，但够用'],
    c: ['没什么好截图的', '一般般', '至少不是全程瞎猜', '还有的救', '几个脑细胞连上了'],
    f: [
      '数字很难，没关系的。',
      '这局我们就不告诉你朋友了',
      '算式看着你作答：\uD83D\uDC41\uFE0F\uD83D\uDC44\uD83D\uDC41\uFE0F',
      '我奶奶都能拿 10 分',
      '记分板在默默评判你',
      '下一局肯定行，相信我',
      '和我家猴子水平差不多！',
    ],
  },
};
