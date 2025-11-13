import { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface SensorData {
  accelX: number;
  accelY: number;
  accelZ: number;
  gyroX: number;
  gyroY: number;
  gyroZ: number;
}

export default function ExerciseDetailScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();
  const params = useLocalSearchParams();

  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // Default 60 seconds
  const [sensorData, setSensorData] = useState<SensorData>({
    accelX: 0,
    accelY: 0,
    accelZ: 0,
    gyroX: 0,
    gyroY: 0,
    gyroZ: 0,
  });
  const [reps, setReps] = useState(0);
  const [calories, setCalories] = useState(0);

  // Parse duration from params (e.g., "60 seg" -> 60)
  useEffect(() => {
    if (params.duration) {
      const durationStr = params.duration as string;
      const seconds = parseInt(durationStr.replace(/\D/g, '')) || 60;
      setTimeLeft(seconds);
    }
  }, [params.duration]);

  // Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused, timeLeft]);

  // Mock sensor data updates
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        // Generate mock sensor data with realistic variations
        setSensorData({
          accelX: (Math.random() * 4 - 2).toFixed(2) as any,
          accelY: (Math.random() * 4 - 2).toFixed(2) as any,
          accelZ: (9.8 + Math.random() * 2 - 1).toFixed(2) as any,
          gyroX: (Math.random() * 60 - 30).toFixed(2) as any,
          gyroY: (Math.random() * 60 - 30).toFixed(2) as any,
          gyroZ: (Math.random() * 60 - 30).toFixed(2) as any,
        });

        // Randomly increment reps
        if (Math.random() > 0.7) {
          setReps((prev) => prev + 1);
        }

        // Increment calories
        setCalories((prev) => Number((prev + 0.05).toFixed(1)));
      }, 200);
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(parseInt((params.duration as string)?.replace(/\D/g, '')) || 60);
    setReps(0);
    setCalories(0);
    setSensorData({
      accelX: 0,
      accelY: 0,
      accelZ: 0,
      gyroX: 0,
      gyroY: 0,
      gyroZ: 0,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 10) return colors.error;
    if (timeLeft <= 30) return colors.warning;
    return colors.primary;
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color={colors.card} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <ThemedText style={[styles.headerTitle, { color: colors.card }]}>
            {params.title || 'Ejercicio'}
          </ThemedText>
          <ThemedText style={[styles.headerSubtitle, { color: colors.secondary }]}>
            {params.device || 'Dispositivo'}
          </ThemedText>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {/* Timer Circle */}
      <View style={styles.timerSection}>
        <View style={[styles.timerCircle, { borderColor: getTimerColor() }]}>
          <ThemedText style={[styles.timerText, { color: getTimerColor() }]}>
            {formatTime(timeLeft)}
          </ThemedText>
          <ThemedText style={[styles.timerLabel, { color: colors.textSecondary }]}>
            {isPaused ? 'Pausado' : isRunning ? 'En Progreso' : 'Listo'}
          </ThemedText>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.quickStats}>
        <View style={[styles.quickStatCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <IconSymbol name="arrow.clockwise" size={24} color={colors.primary} />
          <ThemedText style={styles.quickStatValue}>{reps}</ThemedText>
          <ThemedText style={[styles.quickStatLabel, { color: colors.textSecondary }]}>
            Repeticiones
          </ThemedText>
        </View>

        <View style={[styles.quickStatCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <IconSymbol name="bolt.fill" size={24} color={colors.warning} />
          <ThemedText style={styles.quickStatValue}>{calories}</ThemedText>
          <ThemedText style={[styles.quickStatLabel, { color: colors.textSecondary }]}>
            Calorías
          </ThemedText>
        </View>
      </View>

      {/* Sensor Data */}
      <ThemedView style={[styles.sensorSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <ThemedText style={styles.sensorTitle}>Datos del Sensor</ThemedText>

        {/* Accelerometer */}
        <View style={styles.sensorGroup}>
          <View style={styles.sensorHeader}>
            <IconSymbol name="waveform.path.ecg" size={20} color={colors.accent} />
            <ThemedText style={styles.sensorGroupTitle}>Acelerómetro (m/s²)</ThemedText>
          </View>

          <View style={styles.sensorDataRow}>
            <View style={styles.sensorDataItem}>
              <ThemedText style={[styles.sensorAxis, { color: colors.error }]}>X</ThemedText>
              <ThemedText style={[styles.sensorValue, { color: isRunning ? colors.text : colors.textSecondary }]}>
                {sensorData.accelX}
              </ThemedText>
            </View>

            <View style={styles.sensorDataItem}>
              <ThemedText style={[styles.sensorAxis, { color: colors.success }]}>Y</ThemedText>
              <ThemedText style={[styles.sensorValue, { color: isRunning ? colors.text : colors.textSecondary }]}>
                {sensorData.accelY}
              </ThemedText>
            </View>

            <View style={styles.sensorDataItem}>
              <ThemedText style={[styles.sensorAxis, { color: colors.accent }]}>Z</ThemedText>
              <ThemedText style={[styles.sensorValue, { color: isRunning ? colors.text : colors.textSecondary }]}>
                {sensorData.accelZ}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Gyroscope */}
        <View style={styles.sensorGroup}>
          <View style={styles.sensorHeader}>
            <IconSymbol name="gyroscope" size={20} color={colors.primary} />
            <ThemedText style={styles.sensorGroupTitle}>Giroscopio (°/s)</ThemedText>
          </View>

          <View style={styles.sensorDataRow}>
            <View style={styles.sensorDataItem}>
              <ThemedText style={[styles.sensorAxis, { color: colors.error }]}>X</ThemedText>
              <ThemedText style={[styles.sensorValue, { color: isRunning ? colors.text : colors.textSecondary }]}>
                {sensorData.gyroX}
              </ThemedText>
            </View>

            <View style={styles.sensorDataItem}>
              <ThemedText style={[styles.sensorAxis, { color: colors.success }]}>Y</ThemedText>
              <ThemedText style={[styles.sensorValue, { color: isRunning ? colors.text : colors.textSecondary }]}>
                {sensorData.gyroY}
              </ThemedText>
            </View>

            <View style={styles.sensorDataItem}>
              <ThemedText style={[styles.sensorAxis, { color: colors.accent }]}>Z</ThemedText>
              <ThemedText style={[styles.sensorValue, { color: isRunning ? colors.text : colors.textSecondary }]}>
                {sensorData.gyroZ}
              </ThemedText>
            </View>
          </View>
        </View>
      </ThemedView>

      {/* Control Buttons */}
      <View style={styles.controls}>
        {!isRunning ? (
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: colors.primary }]}
            onPress={handleStart}
            activeOpacity={0.8}
          >
            <IconSymbol name="play.fill" size={24} color={colors.card} />
            <ThemedText style={[styles.primaryButtonText, { color: colors.card }]}>
              Iniciar
            </ThemedText>
          </TouchableOpacity>
        ) : (
          <View style={styles.runningControls}>
            <TouchableOpacity
              style={[styles.secondaryButton, { backgroundColor: colors.warning }]}
              onPress={handlePause}
              activeOpacity={0.8}
            >
              <IconSymbol name={isPaused ? 'play.fill' : 'pause.fill'} size={20} color={colors.card} />
              <ThemedText style={[styles.secondaryButtonText, { color: colors.card }]}>
                {isPaused ? 'Reanudar' : 'Pausar'}
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.secondaryButton, { backgroundColor: colors.error }]}
              onPress={handleStop}
              activeOpacity={0.8}
            >
              <IconSymbol name="stop.fill" size={20} color={colors.card} />
              <ThemedText style={[styles.secondaryButtonText, { color: colors.card }]}>
                Detener
              </ThemedText>
            </TouchableOpacity>
          </View>
        )}

        {!isRunning && timeLeft !== (parseInt((params.duration as string)?.replace(/\D/g, '')) || 60) && (
          <TouchableOpacity
            style={[styles.resetButton, { borderColor: colors.border }]}
            onPress={handleReset}
            activeOpacity={0.8}
          >
            <IconSymbol name="arrow.clockwise" size={20} color={colors.textSecondary} />
            <ThemedText style={[styles.resetButtonText, { color: colors.textSecondary }]}>
              Reiniciar
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  headerSpacer: {
    width: 40,
  },
  timerSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  timerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  timerLabel: {
    fontSize: 14,
    marginTop: 8,
  },
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  quickStatCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  quickStatValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
  },
  quickStatLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  sensorSection: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  sensorTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  sensorGroup: {
    marginBottom: 16,
  },
  sensorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sensorGroupTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  sensorDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sensorDataItem: {
    alignItems: 'center',
  },
  sensorAxis: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  sensorValue: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  controls: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  runningControls: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 6,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    marginTop: 12,
    gap: 6,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
