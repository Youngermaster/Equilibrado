import { StyleSheet, ScrollView, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { IconSymbol } from "@/components/ui/icon-symbol";

interface LeaderboardUser {
  id: number;
  name: string;
  points: number;
  streak: number;
  rank: number;
  avatar: string;
  isCurrentUser?: boolean;
}

export default function LeaderboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Mock leaderboard data - in production this would come from your backend
  const leaderboardData: LeaderboardUser[] = [
    {
      id: 1,
      name: "María García",
      points: 2450,
      streak: 21,
      rank: 1,
      avatar: "👵",
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      points: 2180,
      streak: 15,
      rank: 2,
      avatar: "👴",
    },
    {
      id: 3,
      name: "Ana Martínez",
      points: 1920,
      streak: 18,
      rank: 3,
      avatar: "👵",
    },
    {
      id: 4,
      name: "Juan López",
      points: 1750,
      streak: 7,
      rank: 4,
      avatar: "👴",
      isCurrentUser: true,
    },
    {
      id: 5,
      name: "Rosa Fernández",
      points: 1640,
      streak: 12,
      rank: 5,
      avatar: "👵",
    },
    {
      id: 6,
      name: "Pedro Sánchez",
      points: 1520,
      streak: 9,
      rank: 6,
      avatar: "👴",
    },
    {
      id: 7,
      name: "Isabel Torres",
      points: 1380,
      streak: 14,
      rank: 7,
      avatar: "👵",
    },
    {
      id: 8,
      name: "José Ramírez",
      points: 1290,
      streak: 6,
      rank: 8,
      avatar: "👴",
    },
    {
      id: 9,
      name: "Carmen Díaz",
      points: 1150,
      streak: 11,
      rank: 9,
      avatar: "👵",
    },
    {
      id: 10,
      name: "Luis Moreno",
      points: 1020,
      streak: 8,
      rank: 10,
      avatar: "👴",
    },
  ];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "#FFD700"; // Gold
      case 2:
        return "#C0C0C0"; // Silver
      case 3:
        return "#CD7F32"; // Bronze
      default:
        return colors.textSecondary;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `${rank}°`;
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Tabla de Clasificación</ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
          Compite con otros miembros de la comunidad
        </ThemedText>
      </ThemedView>

      {/* Current User Highlight */}
      <ThemedView
        style={[
          styles.currentUserCard,
          { backgroundColor: colors.primary, borderColor: colors.accent },
        ]}
      >
        <View style={styles.currentUserContent}>
          <View style={styles.currentUserInfo}>
            <ThemedText
              style={[styles.currentUserLabel, { color: colors.secondary }]}
            >
              Tu posición
            </ThemedText>
            <ThemedText
              style={[styles.currentUserRank, { color: colors.card }]}
            >
              {getRankIcon(4)}
            </ThemedText>
          </View>
          <View style={styles.currentUserStats}>
            <View style={styles.statItem}>
              <ThemedText style={[styles.statValue, { color: colors.card }]}>
                1,750
              </ThemedText>
              <ThemedText
                style={[styles.statLabel, { color: colors.secondary }]}
              >
                Puntos
              </ThemedText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <ThemedText style={[styles.statValue, { color: colors.card }]}>
                7
              </ThemedText>
              <ThemedText
                style={[styles.statLabel, { color: colors.secondary }]}
              >
                Racha
              </ThemedText>
            </View>
          </View>
        </View>
      </ThemedView>

      {/* Leaderboard List */}
      <ThemedView style={styles.leaderboardList}>
        {leaderboardData.map((user) => (
          <ThemedView
            key={user.id}
            style={[
              styles.leaderboardItem,
              {
                backgroundColor: user.isCurrentUser
                  ? colors.primary + "15"
                  : colors.card,
                borderColor: user.isCurrentUser
                  ? colors.primary
                  : colors.border,
                borderWidth: user.isCurrentUser ? 2 : 1,
              },
            ]}
          >
            {/* Rank */}
            <View style={styles.rankContainer}>
              <ThemedText
                style={[
                  styles.rankText,
                  {
                    color:
                      user.rank <= 3
                        ? getRankColor(user.rank)
                        : colors.textSecondary,
                  },
                ]}
              >
                {getRankIcon(user.rank)}
              </ThemedText>
            </View>

            {/* Avatar */}
            <View style={[styles.avatar, { backgroundColor: colors.border }]}>
              <ThemedText style={styles.avatarEmoji}>{user.avatar}</ThemedText>
            </View>

            {/* User Info */}
            <View style={styles.userInfo}>
              <ThemedText
                style={[
                  styles.userName,
                  user.isCurrentUser && { color: colors.primary },
                ]}
              >
                {user.name}
                {user.isCurrentUser && " (Tú)"}
              </ThemedText>
              <View style={styles.userStats}>
                <View style={styles.userStatItem}>
                  <IconSymbol
                    name="star.fill"
                    size={14}
                    color={colors.warning}
                  />
                  <ThemedText
                    style={[
                      styles.userStatText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {user.points}
                  </ThemedText>
                </View>
                <View style={styles.userStatItem}>
                  <IconSymbol
                    name="flame.fill"
                    size={14}
                    color={colors.warning}
                  />
                  <ThemedText
                    style={[
                      styles.userStatText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {user.streak} días
                  </ThemedText>
                </View>
              </View>
            </View>

            {/* Points Badge */}
            {user.rank <= 3 && (
              <View
                style={[
                  styles.badge,
                  { backgroundColor: getRankColor(user.rank) + "20" },
                ]}
              >
                <ThemedText
                  style={[styles.badgeText, { color: getRankColor(user.rank) }]}
                >
                  Top {user.rank}
                </ThemedText>
              </View>
            )}
          </ThemedView>
        ))}
      </ThemedView>

      {/* Info Card */}
      <ThemedView
        style={[
          styles.infoCard,
          { backgroundColor: colors.accent + "15", borderColor: colors.accent },
        ]}
      >
        <IconSymbol name="info.circle.fill" size={24} color={colors.accent} />
        <View style={styles.infoText}>
          <ThemedText style={styles.infoTitle}>¿Cómo ganar puntos?</ThemedText>
          <ThemedText
            style={[styles.infoDescription, { color: colors.textSecondary }]}
          >
            Completa ejercicios diarios, mantén tu racha y supera tus metas
            semanales para escalar posiciones.
          </ThemedText>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
    lineHeight: 42,
    includeFontPadding: false,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    includeFontPadding: false,
  },
  currentUserCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
  },
  currentUserContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  currentUserInfo: {
    flex: 1,
  },
  currentUserLabel: {
    fontSize: 14,
    marginBottom: 4,
    lineHeight: 20,
    includeFontPadding: false,
  },
  currentUserRank: {
    fontSize: 36,
    fontWeight: "bold",
    lineHeight: 44,
    includeFontPadding: false,
  },
  currentUserStats: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 32,
    includeFontPadding: false,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 18,
    includeFontPadding: false,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#FFFFFF40",
  },
  leaderboardList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  rankContainer: {
    width: 40,
    alignItems: "center",
  },
  rankText: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 28,
    includeFontPadding: false,
    textAlign: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarEmoji: {
    fontSize: 28,
    lineHeight: 36,
    textAlign: "center",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 22,
    includeFontPadding: false,
  },
  userStats: {
    flexDirection: "row",
    gap: 16,
  },
  userStatItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  userStatText: {
    fontSize: 13,
    lineHeight: 18,
    includeFontPadding: false,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
    includeFontPadding: false,
  },
  infoCard: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 30,
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    borderWidth: 1,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 22,
    includeFontPadding: false,
  },
  infoDescription: {
    fontSize: 14,
    lineHeight: 20,
    includeFontPadding: false,
  },
});
