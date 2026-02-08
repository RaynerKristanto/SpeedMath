# Speed Math Game 🧮⚡

A fast-paced mobile math game built with React Native and Expo. Test your math skills by confirming whether equations are true or false within 1 second!

## Features

- **Quick Gameplay**: Answer true/false to math equations in under 1 second
- **Score Tracking**: Earn points for each correct answer
- **Visual Timer**: See the countdown with an animated progress bar
- **Game Over**: One wrong answer or timeout ends the game
- **Math Operations**: Addition, subtraction, and multiplication problems
- **Mobile-First Design**: Optimized for mobile devices
- **Multiplayer Ready**: Structure in place for future multiplayer mode

## How to Play

1. An equation appears on screen (e.g., "5 + 3 = 8")
2. Tap **TRUE** if the equation is correct, **FALSE** if it's wrong
3. You have **1 second** to answer
4. Correct answers increase your score by 1
5. Wrong answers or timeouts end the game
6. Try to beat your high score!

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo Go app on your phone (available on iOS App Store or Google Play)

### Setup

1. Install dependencies:
```bash
source ~/.nvm/nvm.sh
npm install
```

2. Start the development server:
```bash
npm start
```

3. Run on your device:
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Physical Device**:
     1. Install Expo Go app on your phone
     2. Scan the QR code shown in the terminal

## Project Structure

```
speed-math/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx       # Main menu
│   │   ├── GameScreen.tsx       # Main game logic
│   │   └── GameOverScreen.tsx   # Results screen
│   ├── utils/
│   │   └── equationGenerator.ts # Random equation generator
│   └── types/
│       └── game.ts              # TypeScript types
├── App.tsx                      # Main app component
└── package.json
```

## Future Enhancements

- [ ] Multiplayer mode with real-time competition
- [ ] Leaderboards
- [ ] Difficulty levels (easy, medium, hard)
- [ ] Sound effects and haptic feedback
- [ ] Daily challenges
- [ ] Achievement system
- [ ] Different game modes (time attack, endless, etc.)

## Technologies Used

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **TypeScript** - Type-safe JavaScript
- **React Hooks** - State management

## Development

To modify the game:

- **Change difficulty**: Edit number ranges in `src/utils/equationGenerator.ts`
- **Adjust timer**: Modify the `1000` milliseconds value in `src/screens/GameScreen.tsx`
- **Update styling**: Edit StyleSheet objects in each screen component
- **Add operations**: Add new operators to the `OPERATORS` array in `equationGenerator.ts`

## License

MIT
