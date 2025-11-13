import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';

interface Exercise {
  id: number;
  title: string;
  description: string;
  device: 'Banda IMU' | 'Disco de Equilibrio' | 'Pads Táctiles';
  duration: string;
  difficulty: 'Fácil' | 'Moderado' | 'Difícil';
  calories: number;
  icon: string;
  completed: boolean;
}

export default function ExercisesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  // Mock exercises data
  const exercises: Exercise[] = [
    {
      id: 1,
      title: 'Levantamiento de Piernas',
      description: 'Mejora el equilibrio y fortalece las piernas con movimientos controlados.',
      device: 'Banda IMU',
      duration: '60 seg',
      difficulty: 'Fácil',
      calories: 15,
      icon: 'figure.walk',
      completed: true,
    },
    {
      id: 2,
      title: 'Balanceo Lateral',
      description: 'Trabaja el equilibrio lateral desplazando el peso de un lado a otro.',
      device: 'Disco de Equilibrio',
      duration: '90 seg',
      difficulty: 'Moderado',
      calories: 25,
      icon: 'figure.gymnastics',
      completed: true,
    },
    {
      id: 3,
      title: 'Reflejos Rápidos',
      description: 'Mejora el tiempo de reacción tocando los pads que se iluminan.',
      device: 'Pads Táctiles',
      duration: '120 seg',
      difficulty: 'Moderado',
      calories: 20,
      icon: 'hand.tap',
      completed: false,
    },
    {
      id: 4,
      title: 'Rotación Controlada',
      description: 'Ejercicio de rotación del tronco manteniendo el equilibrio.',
      device: 'Disco de Equilibrio',
      duration: '60 seg',
      difficulty: 'Difícil',
      calories: 30,
      icon: 'arrow.triangle.2.circlepath',
      completed: false,
    },
    {
      id: 5,
      title: 'Marcha en Sitio',
      description: 'Simula caminar sin desplazarte, ideal para calentar.',
      device: 'Banda IMU',
      duration: '120 seg',
      difficulty: 'Fácil',
      calories: 18,
      icon: 'figure.walk.motion',
      completed: false,
    },
    {
      id: 6,
      title: 'Secuencia de Memoria',
      description: 'Toca los pads siguiendo la secuencia que se muestra.',
      device: 'Pads Táctiles',
      duration: '180 seg',
      difficulty: 'Difícil',
      calories: 22,
      icon: 'brain',
      completed: false,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil':
        return colors.success;
      case 'Moderado':
        return colors.warning;
      case 'Difícil':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const getDeviceColor = (device: string) => {
    switch (device) {
      case 'Banda IMU':
        return colors.primary;
      case 'Disco de Equilibrio':
        return colors.accent;
      case 'Pads Táctiles':
        return colors.warning;
      default:
        return colors.textSecondary;
    }
  };

  const handleExercisePress = (exercise: Exercise) => {
    // Navigate to exercise detail screen
    router.push({
      pathname: '/exercise-detail',
      params: {
        id: exercise.id,
        title: exercise.title,
        device: exercise.device,
        duration: exercise.duration,
      },
    });
  };

  const completedExercises = exercises.filter(e => e.completed).length;
  const totalExercises = exercises.length;
  const completionPercentage = (completedExercises / totalExercises) * 100;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Ejercicios</ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
          Entrena con tus dispositivos
        </ThemedText>
      </ThemedView>

      {/* Progress Overview */}
      <ThemedView style={[styles.progressCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.progressHeader}>
          <View>
            <ThemedText style={styles.progressTitle}>Progreso de Hoy</ThemedText>
            <ThemedText style={[styles.progressSubtitle, { color: colors.textSecondary }]}>
              {completedExercises} de {totalExercises} completados
            </ThemedText>
          </View>
          <View style={styles.progressCircle}>
            <ThemedText style={[styles.progressPercentage, { color: colors.primary }]}>
              {Math.round(completionPercentage)}%
            </ThemedText>
          </View>
        </View>

        <View style={[styles.progressBarBackground, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.progressBarFill,
              { backgroundColor: colors.primary, width: `${completionPercentage}%` }
            ]}
          />
        </View>
      </ThemedView>

      {/* Device Filter Chips */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          <TouchableOpacity style={[styles.filterChip, { backgroundColor: colors.primary }]} activeOpacity={0.7}>
            <ThemedText style={[styles.filterChipText, { color: colors.card }]}>Todos</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}
            activeOpacity={0.7}
          >
            <ThemedText style={[styles.filterChipText, { color: colors.text }]}>Banda IMU</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}
            activeOpacity={0.7}
          >
            <ThemedText style={[styles.filterChipText, { color: colors.text }]}>Disco</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}
            activeOpacity={0.7}
          >
            <ThemedText style={[styles.filterChipText, { color: colors.text }]}>Pads</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Exercises List */}
      <ThemedView style={styles.exercisesList}>
        {exercises.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            style={[
              styles.exerciseCard,
              {
                backgroundColor: colors.card,
                borderColor: exercise.completed ? colors.success : colors.border,
                borderWidth: exercise.completed ? 2 : 1,
              }
            ]}
            onPress={() => handleExercisePress(exercise)}
            activeOpacity={0.7}
          >
            {/* Completed Badge */}
            {exercise.completed && (
              <View style={[styles.completedBadge, { backgroundColor: colors.success }]}>
                <IconSymbol name="checkmark" size={16} color={colors.card} />
              </View>
            )}

            <View style={styles.exerciseContent}>
              {/* Icon */}
              <View style={[styles.exerciseIconContainer, { backgroundColor: getDeviceColor(exercise.device) + '15' }]}>
                <IconSymbol name={exercise.icon as any} size={32} color={getDeviceColor(exercise.device)} />
              </View>

              {/* Info */}
              <View style={styles.exerciseInfo}>
                <ThemedText style={styles.exerciseTitle}>{exercise.title}</ThemedText>
                <ThemedText style={[styles.exerciseDescription, { color: colors.textSecondary }]}>
                  {exercise.description}
                </ThemedText>

                {/* Meta Info */}
                <View style={styles.exerciseMeta}>
                  <View style={[styles.deviceBadge, { backgroundColor: getDeviceColor(exercise.device) + '20' }]}>
                    <ThemedText style={[styles.deviceText, { color: getDeviceColor(exercise.device) }]}>
                      {exercise.device}
                    </ThemedText>
                  </View>
                </View>

                {/* Stats Row */}
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <IconSymbol name="clock" size={14} color={colors.textSecondary} />
                    <ThemedText style={[styles.statText, { color: colors.textSecondary }]}>
                      {exercise.duration}
                    </ThemedText>
                  </View>
                  <View style={styles.statItem}>
                    <IconSymbol name="bolt.fill" size={14} color={colors.textSecondary} />
                    <ThemedText style={[styles.statText, { color: colors.textSecondary }]}>
                      {exercise.calories} cal
                    </ThemedText>
                  </View>
                  <View
                    style={[
                      styles.difficultyBadge,
                      { backgroundColor: getDifficultyColor(exercise.difficulty) + '20' }
                    ]}
                  >
                    <ThemedText
                      style={[styles.difficultyText, { color: getDifficultyColor(exercise.difficulty) }]}
                    >
                      {exercise.difficulty}
                    </ThemedText>
                  </View>
                </View>
              </View>

              {/* Chevron */}
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>
        ))}
      </ThemedView>

      {/* Tips Card */}
      <ThemedView style={[styles.tipsCard, { backgroundColor: colors.primary + '15', borderColor: colors.primary }]}>
        <IconSymbol name="lightbulb.fill" size={24} color={colors.primary} />
        <View style={styles.tipsText}>
          <ThemedText style={styles.tipsTitle}>Consejo</ThemedText>
          <ThemedText style={[styles.tipsDescription, { color: colors.textSecondary }]}>
            Realiza los ejercicios en un espacio seguro, con buena iluminación y cerca de un apoyo.
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
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  progressCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 14,
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  exercisesList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  exerciseCard: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  completedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  exerciseContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  exerciseIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  exerciseDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  exerciseMeta: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  deviceBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  deviceText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 13,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tipsCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 30,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  tipsText: {
    flex: 1,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  tipsDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
