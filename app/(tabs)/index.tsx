import { StyleSheet, ScrollView, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Mock user data - in production this would come from your backend
  const userData = {
    name: "Juan",
    exercisesCompleted: 24,
    currentStreak: 7,
    longestStreak: 15,
    weeklyGoal: 5,
    weeklyProgress: 4,
    totalMinutes: 180,
    caloriesBurned: 520,
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header with greeting */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.greeting}>Hola, {userData.name}</ThemedText>
        <ThemedText
          style={[styles.subGreeting, { color: colors.textSecondary }]}
        >
          ¡Mantengamos el equilibrio hoy!
        </ThemedText>
      </ThemedView>

      {/* Streak Card */}
      <ThemedView
        style={[styles.streakCard, { backgroundColor: colors.primary }]}
      >
        <View style={styles.streakContent}>
          <IconSymbol name="flame.fill" size={32} color={colors.warning} />
          <View style={styles.streakText}>
            <ThemedText style={[styles.streakNumber, { color: colors.card }]}>
              {userData.currentStreak} días
            </ThemedText>
            <ThemedText
              style={[styles.streakLabel, { color: colors.secondary }]}
            >
              Racha actual
            </ThemedText>
          </View>
        </View>
        <ThemedText style={[styles.streakRecord, { color: colors.secondary }]}>
          Mejor racha: {userData.longestStreak} días
        </ThemedText>
      </ThemedView>

      {/* Quick Stats Grid */}
      <View style={styles.statsGrid}>
        {/* Exercises Completed */}
        <ThemedView
          style={[
            styles.statCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <IconSymbol name="figure.walk" size={28} color={colors.primary} />
          <ThemedText style={styles.statNumber}>
            {userData.exercisesCompleted}
          </ThemedText>
          <ThemedText
            style={[styles.statLabel, { color: colors.textSecondary }]}
          >
            Ejercicios
          </ThemedText>
        </ThemedView>

        {/* Total Minutes */}
        <ThemedView
          style={[
            styles.statCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <IconSymbol name="clock.fill" size={28} color={colors.accent} />
          <ThemedText style={styles.statNumber}>
            {userData.totalMinutes}
          </ThemedText>
          <ThemedText
            style={[styles.statLabel, { color: colors.textSecondary }]}
          >
            Minutos
          </ThemedText>
        </ThemedView>

        {/* Calories */}
        <ThemedView
          style={[
            styles.statCard,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <IconSymbol name="bolt.fill" size={28} color={colors.success} />
          <ThemedText style={styles.statNumber}>
            {userData.caloriesBurned}
          </ThemedText>
          <ThemedText
            style={[styles.statLabel, { color: colors.textSecondary }]}
          >
            Calorías
          </ThemedText>
        </ThemedView>
      </View>

      {/* Weekly Goal Progress */}
      <ThemedView
        style={[
          styles.goalCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View style={styles.goalHeader}>
          <ThemedText style={styles.goalTitle}>Meta Semanal</ThemedText>
          <ThemedText style={[styles.goalProgress, { color: colors.primary }]}>
            {userData.weeklyProgress}/{userData.weeklyGoal}
          </ThemedText>
        </View>

        <View
          style={[
            styles.progressBarBackground,
            { backgroundColor: colors.border },
          ]}
        >
          <View
            style={[
              styles.progressBarFill,
              {
                backgroundColor: colors.primary,
                width: `${
                  (userData.weeklyProgress / userData.weeklyGoal) * 100
                }%`,
              },
            ]}
          />
        </View>

        <ThemedText
          style={[styles.goalSubtext, { color: colors.textSecondary }]}
        >
          {userData.weeklyGoal - userData.weeklyProgress} sesiones más para
          alcanzar tu meta
        </ThemedText>
      </ThemedView>

      {/* Today's Activity Summary */}
      <ThemedView
        style={[
          styles.activityCard,
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <ThemedText style={styles.sectionTitle}>Actividad de Hoy</ThemedText>

        <View style={styles.activityItem}>
          <View
            style={[
              styles.activityIcon,
              { backgroundColor: colors.success + "20" },
            ]}
          >
            <IconSymbol
              name="checkmark.circle.fill"
              size={24}
              color={colors.success}
            />
          </View>
          <View style={styles.activityInfo}>
            <ThemedText style={styles.activityTitle}>
              Ejercicios de Equilibrio
            </ThemedText>
            <ThemedText
              style={[styles.activityTime, { color: colors.textSecondary }]}
            >
              Completado - 8:30 AM
            </ThemedText>
          </View>
        </View>

        <View style={styles.activityItem}>
          <View
            style={[
              styles.activityIcon,
              { backgroundColor: colors.success + "20" },
            ]}
          >
            <IconSymbol
              name="checkmark.circle.fill"
              size={24}
              color={colors.success}
            />
          </View>
          <View style={styles.activityInfo}>
            <ThemedText style={styles.activityTitle}>
              Reflejos Rápidos
            </ThemedText>
            <ThemedText
              style={[styles.activityTime, { color: colors.textSecondary }]}
            >
              Completado - 2:15 PM
            </ThemedText>
          </View>
        </View>

        <View style={styles.activityItem}>
          <View
            style={[styles.activityIcon, { backgroundColor: colors.border }]}
          >
            <IconSymbol name="circle" size={24} color={colors.textSecondary} />
          </View>
          <View style={styles.activityInfo}>
            <ThemedText style={styles.activityTitle}>
              Caminata Vespertina
            </ThemedText>
            <ThemedText
              style={[styles.activityTime, { color: colors.textSecondary }]}
            >
              Pendiente - 5:00 PM
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
    lineHeight: 42,
    includeFontPadding: false,
  },
  subGreeting: {
    fontSize: 16,
    lineHeight: 24,
    includeFontPadding: false,
  },
  streakCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
  },
  streakContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  streakText: {
    marginLeft: 12,
  },
  streakNumber: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 36,
    includeFontPadding: false,
  },
  streakLabel: {
    fontSize: 14,
    lineHeight: 20,
    includeFontPadding: false,
  },
  streakRecord: {
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
    includeFontPadding: false,
  },
  statsGrid: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    lineHeight: 32,
    includeFontPadding: false,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
    includeFontPadding: false,
  },
  goalCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 26,
    includeFontPadding: false,
  },
  goalProgress: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 26,
    includeFontPadding: false,
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  goalSubtext: {
    fontSize: 12,
    lineHeight: 18,
    includeFontPadding: false,
  },
  activityCard: {
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    lineHeight: 26,
    includeFontPadding: false,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  activityInfo: {
    marginLeft: 12,
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
    includeFontPadding: false,
  },
  activityTime: {
    fontSize: 13,
    marginTop: 2,
    lineHeight: 18,
    includeFontPadding: false,
  },
});
