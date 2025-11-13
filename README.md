# Equilibrado

**Equilibrado** is a comprehensive health monitoring and exercise application designed specifically for elderly users to prevent falls and cognitive decline through engaging physical and mental exercises integrated with IoT devices.

## About

As the population ages, falls and cognitive decline become increasingly significant health concerns for the elderly. Equilibrado addresses these challenges by providing a structured, gamified platform that encourages regular physical activity and mental stimulation through the use of specialized IoT devices.

### Key Features

- **Interactive Exercise Programs**: Guided exercises using IoT devices (IMU Band, Balance Disc, Touch Pads)
- **Real-time Sensor Monitoring**: Track movement data with accelerometer and gyroscope readings
- **Progress Tracking**: Monitor exercise completion, streaks, calories burned, and activity minutes
- **Gamification**: Competitive leaderboard system to encourage consistent participation
- **Mental Exercises**: Cognitive training activities including memory, attention, reasoning, and creativity exercises
- **Health Recommendations**: Evidence-based tips for nutrition, sleep, and social engagement
- **Personalized Dashboard**: Overview of daily goals, weekly progress, and achievement streaks

## Screenshots

<div align="center">
  <img src="https://via.placeholder.com/270x480/4A5F4C/F5F3ED?text=Home+Screen" alt="Home Screen" width="200"/>
  <img src="https://via.placeholder.com/270x480/4A5F4C/F5F3ED?text=Exercises" alt="Exercises Screen" width="200"/>
  <img src="https://via.placeholder.com/270x480/4A5F4C/F5F3ED?text=Exercise+Detail" alt="Exercise Detail" width="200"/>
  <img src="https://via.placeholder.com/270x480/4A5F4C/F5F3ED?text=Leaderboard" alt="Leaderboard Screen" width="200"/>
</div>

## Tech Stack

- **Framework**: React Native with Expo (~54.0)
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Graphics**: react-native-svg for circular progress indicators
- **Styling**: StyleSheet API with custom theming system
- **Icons**: SF Symbols via IconSymbol component

## Architecture

### Screen Structure

1. **Home (Inicio)** - `app/(tabs)/index.tsx`
   - Personalized greeting and user statistics
   - Current streak tracker with fire indicator
   - Quick stats: exercises completed, total minutes, calories burned
   - Weekly goal progress visualization
   - Activity summary cards

2. **Exercises (Ejercicios)** - `app/(tabs)/exercises.tsx`
   - Daily progress overview
   - Device-based exercise filtering (IMU Band, Balance Disc, Touch Pads)
   - Exercise cards with duration, difficulty, and calorie information
   - Completion status tracking

3. **Exercise Detail** - `app/exercise-detail.tsx`
   - Circular countdown timer with SVG progress indicator
   - Real-time sensor data simulation (accelerometer, gyroscope)
   - Repetition counter and calorie tracker
   - Play/pause/stop controls integrated into timer
   - Reset functionality

4. **Leaderboard (Ranking)** - `app/(tabs)/leaderboard.tsx`
   - Top 10 user rankings with medals
   - Points and exercise completion tracking
   - Current user position highlighting

5. **Recommendations (Consejos)** - `app/(tabs)/recommendations.tsx`
   - Mental exercises (memory, attention, reasoning, creativity)
   - Health tips (nutrition, sleep, social engagement)
   - Evidence-based recommendations

### IoT Device Integration

The application is designed to work with three types of IoT devices:

- **Banda IMU (IMU Band)**: Wearable sensor for tracking body movements and balance
- **Disco de Equilibrio (Balance Disc)**: Platform device for balance and stability exercises
- **Pads Táctiles (Touch Pads)**: Interactive touch-sensitive pads for reaction time and cognitive exercises

### Theming

Custom color palette inspired by health and nature:

- **Primary (Olive Green)**: #4A5F4C - Main brand color
- **Secondary (Warm Beige)**: #F5F3ED - Background accent
- **Accent (Teal)**: #5A8B8A - Interactive elements
- **Success**: #6B9F71 - Positive feedback
- **Warning**: #D4A574 - Moderate alerts
- **Error**: #C07A7A - Critical feedback

Both light and dark modes are supported throughout the application.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/Youngermaster/equilibrado.git
   cd equilibrado
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npx expo start
   ```

4. Run the app

   In the output, you'll find options to open the app in:

   - [development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
   - [Expo Go](https://expo.dev/go)

## Development

### Project Structure

```
equilibrado/
├── app/
│   ├── (tabs)/          # Tab-based navigation screens
│   │   ├── index.tsx    # Home screen
│   │   ├── exercises.tsx
│   │   ├── leaderboard.tsx
│   │   ├── recommendations.tsx
│   │   └── _layout.tsx  # Tab navigation configuration
│   ├── exercise-detail.tsx
│   └── _layout.tsx      # Root navigation layout
├── components/
│   ├── themed-text.tsx  # Reusable text component with theming
│   ├── themed-view.tsx  # Themed view wrapper
│   └── ui/
│       └── icon-symbol.tsx
├── constants/
│   └── theme.ts         # Color definitions and theming system
├── hooks/
│   └── use-color-scheme.ts
└── assets/              # Images, fonts, and other static resources
```

### Text Rendering

All text components use optimized rendering with:
- `includeFontPadding: false` - Prevents extra padding on Android
- Proper `lineHeight` values (typically 1.3-1.4x fontSize)
- Consistent typography scale across screens

### Adding New Exercises

To add new exercises, update the exercises array in `app/(tabs)/exercises.tsx`:

```typescript
{
  id: number,
  title: string,
  description: string,
  device: "Banda IMU" | "Disco de Equilibrio" | "Pads Táctiles",
  duration: string,
  difficulty: "Fácil" | "Moderado" | "Difícil",
  calories: number,
  icon: string,
  completed: boolean
}
```

## Sensor Data Simulation

The application includes realistic sensor data simulation for demonstration purposes. In production, these would be replaced with actual IoT device readings:

- **Accelerometer**: 3-axis acceleration data (m/s²)
  - Smooth variations with realistic bounds (-3 to 3 for X/Y, 8 to 11 for Z)
- **Gyroscope**: 3-axis rotational data (°/s)
  - Angular velocity with ±40°/s bounds
- **Repetition Counting**: Approximately one rep every 3 seconds
- **Calorie Tracking**: ~15-20 calories per minute of activity

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Designed for elderly health and wellness
- Built with React Native and Expo for cross-platform compatibility
- Integrates with IoT devices for enhanced exercise tracking

## Learn More

To learn more about the technologies used:

- [Expo documentation](https://docs.expo.dev/)
- [React Native documentation](https://reactnative.dev/)
- [TypeScript documentation](https://www.typescriptlang.org/)
