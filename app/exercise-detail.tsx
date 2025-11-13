import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useRouter, useLocalSearchParams } from "expo-router";
import Svg, { Circle } from "react-native-svg";

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
  const colors = Colors[colorScheme ?? "light"];
  const router = useRouter();
  const params = useLocalSearchParams();

  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // Default 60 seconds
  const [sensorData, setSensorData] = useState<SensorData>({
    accelX: 0,
    accelY: 0,
    accelZ: 9.8,
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
      const seconds = parseInt(durationStr.replace(/\D/g, "")) || 60;
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

  // Mock sensor data updates - More realistic simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let repCounter = 0;

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        // Generate smooth, realistic sensor variations
        setSensorData((prev) => ({
          accelX: Number(
            Math.max(
              -3,
              Math.min(3, prev.accelX + (Math.random() - 0.5) * 0.6)
            ).toFixed(2)
          ),
          accelY: Number(
            Math.max(
              -3,
              Math.min(3, prev.accelY + (Math.random() - 0.5) * 0.6)
            ).toFixed(2)
          ),
          accelZ: Number(
            Math.max(
              8,
              Math.min(11, 9.8 + (Math.random() - 0.5) * 0.5)
            ).toFixed(2)
          ),
          gyroX: Number(
            Math.max(
              -40,
              Math.min(40, prev.gyroX + (Math.random() - 0.5) * 8)
            ).toFixed(2)
          ),
          gyroY: Number(
            Math.max(
              -40,
              Math.min(40, prev.gyroY + (Math.random() - 0.5) * 8)
            ).toFixed(2)
          ),
          gyroZ: Number(
            Math.max(
              -40,
              Math.min(40, prev.gyroZ + (Math.random() - 0.5) * 8)
            ).toFixed(2)
          ),
        }));

        // Realistic rep counting - approximately every 3 seconds
        repCounter++;
        if (repCounter >= 15) {
          // 15 * 200ms = 3 seconds
          setReps((prev) => prev + 1);
          repCounter = 0;
        }

        // Realistic calorie increment - about 15-20 calories per minute
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
    setTimeLeft(
      parseInt((params.duration as string)?.replace(/\D/g, "")) || 60
    );
    setReps(0);
    setCalories(0);
    setSensorData({
      accelX: 0,
      accelY: 0,
      accelZ: 9.8,
      gyroX: 0,
      gyroY: 0,
      gyroZ: 0,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 10) return colors.error;
    if (timeLeft <= 30) return colors.warning;
    return colors.primary;
  };

  // Calculate progress percentage
  const initialTime =
    parseInt((params.duration as string)?.replace(/\D/g, "")) || 60;
  const progress = (timeLeft / initialTime) * 100;

  // Circle parameters for SVG (30% larger for better spacing)
  const circleRadius = 117;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset =
    circleCircumference - (circleCircumference * progress) / 100;

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <IconSymbol name="chevron.left" size={24} color={colors.card} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <ThemedText style={[styles.headerTitle, { color: colors.card }]}>
            {params.title || "Ejercicio"}
          </ThemedText>
          <ThemedText
            style={[styles.headerSubtitle, { color: colors.secondary }]}
          >
            {params.device || "Dispositivo"}
          </ThemedText>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Timer Circle with Progress Bar */}
        <View style={styles.timerSection}>
          <View style={styles.timerContainer}>
            {/* SVG Progress Circle */}
            <Svg width="260" height="260" style={styles.svgCircle}>
              <Circle
                cx="130"
                cy="130"
                r={circleRadius}
                stroke={colors.border}
                strokeWidth="8"
                fill="none"
              />
              <Circle
                cx="130"
                cy="130"
                r={circleRadius}
                stroke={getTimerColor()}
                strokeWidth="8"
                fill="none"
                strokeDasharray={circleCircumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 130 130)"
              />
            </Svg>

            {/* Timer Text and Controls */}
            <View style={styles.timerContent}>
              <ThemedText
                style={[styles.timerText, { color: getTimerColor() }]}
              >
                {formatTime(timeLeft)}
              </ThemedText>
              <ThemedText
                style={[styles.timerLabel, { color: colors.textSecondary }]}
              >
                {isPaused ? "Pausado" : isRunning ? "En Progreso" : "Listo"}
              </ThemedText>

              {/* Play/Pause/Stop Controls */}
              {!isRunning ? (
                <TouchableOpacity
                  style={[
                    styles.centerButton,
                    { backgroundColor: colors.primary },
                  ]}
                  onPress={handleStart}
                  activeOpacity={0.8}
                >
                  <IconSymbol name="play.fill" size={32} color={colors.card} />
                </TouchableOpacity>
              ) : (
                <View style={styles.miniControls}>
                  <TouchableOpacity
                    style={[
                      styles.miniButton,
                      { backgroundColor: colors.warning },
                    ]}
                    onPress={handlePause}
                    activeOpacity={0.8}
                  >
                    <IconSymbol
                      name={isPaused ? "play.fill" : "pause.fill"}
                      size={20}
                      color={colors.card}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.miniButton,
                      { backgroundColor: colors.error },
                    ]}
                    onPress={handleStop}
                    activeOpacity={0.8}
                  >
                    <IconSymbol
                      name="stop.fill"
                      size={20}
                      color={colors.card}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View
            style={[
              styles.quickStatCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <IconSymbol
              name="arrow.clockwise"
              size={24}
              color={colors.primary}
            />
            <ThemedText style={styles.quickStatValue}>{reps}</ThemedText>
            <ThemedText
              style={[styles.quickStatLabel, { color: colors.textSecondary }]}
            >
              Repeticiones
            </ThemedText>
          </View>

          <View
            style={[
              styles.quickStatCard,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <IconSymbol name="bolt.fill" size={24} color={colors.warning} />
            <ThemedText style={styles.quickStatValue}>{calories}</ThemedText>
            <ThemedText
              style={[styles.quickStatLabel, { color: colors.textSecondary }]}
            >
              Calorías
            </ThemedText>
          </View>
        </View>

        {/* Sensor Data */}
        <ThemedView
          style={[
            styles.sensorSection,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <ThemedText style={styles.sensorTitle}>Datos del Sensor</ThemedText>

          {/* Accelerometer */}
          <View style={styles.sensorGroup}>
            <View style={styles.sensorHeader}>
              <IconSymbol
                name="waveform.path.ecg"
                size={20}
                color={colors.accent}
              />
              <ThemedText style={styles.sensorGroupTitle}>
                Acelerómetro (m/s²)
              </ThemedText>
            </View>

            <View style={styles.sensorDataRow}>
              <View style={styles.sensorDataItem}>
                <ThemedText
                  style={[styles.sensorAxis, { color: colors.error }]}
                >
                  X
                </ThemedText>
                <ThemedText
                  style={[
                    styles.sensorValue,
                    {
                      color: isRunning ? colors.text : colors.textSecondary,
                    },
                  ]}
                >
                  {sensorData.accelX}
                </ThemedText>
              </View>

              <View style={styles.sensorDataItem}>
                <ThemedText
                  style={[styles.sensorAxis, { color: colors.success }]}
                >
                  Y
                </ThemedText>
                <ThemedText
                  style={[
                    styles.sensorValue,
                    {
                      color: isRunning ? colors.text : colors.textSecondary,
                    },
                  ]}
                >
                  {sensorData.accelY}
                </ThemedText>
              </View>

              <View style={styles.sensorDataItem}>
                <ThemedText
                  style={[styles.sensorAxis, { color: colors.accent }]}
                >
                  Z
                </ThemedText>
                <ThemedText
                  style={[
                    styles.sensorValue,
                    {
                      color: isRunning ? colors.text : colors.textSecondary,
                    },
                  ]}
                >
                  {sensorData.accelZ}
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Gyroscope */}
          <View style={styles.sensorGroup}>
            <View style={styles.sensorHeader}>
              <IconSymbol name="gyroscope" size={20} color={colors.primary} />
              <ThemedText style={styles.sensorGroupTitle}>
                Giroscopio (°/s)
              </ThemedText>
            </View>

            <View style={styles.sensorDataRow}>
              <View style={styles.sensorDataItem}>
                <ThemedText
                  style={[styles.sensorAxis, { color: colors.error }]}
                >
                  X
                </ThemedText>
                <ThemedText
                  style={[
                    styles.sensorValue,
                    {
                      color: isRunning ? colors.text : colors.textSecondary,
                    },
                  ]}
                >
                  {sensorData.gyroX}
                </ThemedText>
              </View>

              <View style={styles.sensorDataItem}>
                <ThemedText
                  style={[styles.sensorAxis, { color: colors.success }]}
                >
                  Y
                </ThemedText>
                <ThemedText
                  style={[
                    styles.sensorValue,
                    {
                      color: isRunning ? colors.text : colors.textSecondary,
                    },
                  ]}
                >
                  {sensorData.gyroY}
                </ThemedText>
              </View>

              <View style={styles.sensorDataItem}>
                <ThemedText
                  style={[styles.sensorAxis, { color: colors.accent }]}
                >
                  Z
                </ThemedText>
                <ThemedText
                  style={[
                    styles.sensorValue,
                    {
                      color: isRunning ? colors.text : colors.textSecondary,
                    },
                  ]}
                >
                  {sensorData.gyroZ}
                </ThemedText>
              </View>
            </View>
          </View>
        </ThemedView>

        {/* Reset Button */}
        {!isRunning &&
          timeLeft !==
            (parseInt((params.duration as string)?.replace(/\D/g, "")) ||
              60) && (
            <TouchableOpacity
              style={[
                styles.resetButton,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.card,
                },
              ]}
              onPress={handleReset}
              activeOpacity={0.8}
            >
              <IconSymbol
                name="arrow.clockwise"
                size={20}
                color={colors.primary}
              />
              <ThemedText
                style={[styles.resetButtonText, { color: colors.primary }]}
              >
                Reiniciar
              </ThemedText>
            </TouchableOpacity>
          )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
    includeFontPadding: false,
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
    lineHeight: 20,
    includeFontPadding: false,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  timerSection: {
    alignItems: "center",
    paddingVertical: 10,
  },
  timerContainer: {
    width: 260,
    height: 260,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  svgCircle: {
    position: "absolute",
  },
  timerContent: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    lineHeight: 58,
    includeFontPadding: false,
  },
  timerLabel: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 16,
    lineHeight: 20,
    includeFontPadding: false,
  },
  centerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  miniControls: {
    flexDirection: "row",
    gap: 12,
  },
  miniButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickStats: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  quickStatCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  quickStatValue: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 8,
    lineHeight: 36,
    includeFontPadding: false,
  },
  quickStatLabel: {
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
    includeFontPadding: false,
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
    fontWeight: "600",
    marginBottom: 16,
    lineHeight: 26,
    includeFontPadding: false,
  },
  sensorGroup: {
    marginBottom: 16,
  },
  sensorHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  sensorGroupTitle: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
    includeFontPadding: false,
  },
  sensorDataRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  sensorDataItem: {
    alignItems: "center",
  },
  sensorAxis: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 20,
    includeFontPadding: false,
  },
  sensorValue: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "monospace",
    lineHeight: 32,
    includeFontPadding: false,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    marginHorizontal: 20,
    gap: 6,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
    includeFontPadding: false,
  },
});
