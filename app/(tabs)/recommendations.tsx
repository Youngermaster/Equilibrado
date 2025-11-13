import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface MentalExercise {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Fácil' | 'Moderado' | 'Difícil';
  icon: string;
  category: 'Memoria' | 'Atención' | 'Razonamiento' | 'Creatividad';
}

interface HealthTip {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: string;
}

export default function RecommendationsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Mock mental exercises data
  const mentalExercises: MentalExercise[] = [
    {
      id: 1,
      title: 'Recordar la Lista',
      description: 'Memoriza y recuerda una lista de 10 objetos cotidianos.',
      duration: '5-10 min',
      difficulty: 'Fácil',
      icon: 'list.bullet',
      category: 'Memoria',
    },
    {
      id: 2,
      title: 'Sudoku Guiado',
      description: 'Resuelve puzzles de Sudoku adaptados a tu nivel.',
      duration: '15-20 min',
      difficulty: 'Moderado',
      icon: 'square.grid.3x3',
      category: 'Razonamiento',
    },
    {
      id: 3,
      title: 'Encuentra las Diferencias',
      description: 'Identifica las diferencias entre dos imágenes similares.',
      duration: '10 min',
      difficulty: 'Fácil',
      icon: 'eye',
      category: 'Atención',
    },
    {
      id: 4,
      title: 'Palabras Encadenadas',
      description: 'Forma palabras conectando la última letra con la primera.',
      duration: '10-15 min',
      difficulty: 'Moderado',
      icon: 'link',
      category: 'Creatividad',
    },
    {
      id: 5,
      title: 'Cálculo Mental',
      description: 'Ejercicios de matemáticas básicas para mantener la mente ágil.',
      duration: '8-10 min',
      difficulty: 'Moderado',
      icon: 'function',
      category: 'Razonamiento',
    },
  ];

  // Mock health tips data
  const healthTips: HealthTip[] = [
    {
      id: 1,
      title: 'Hidratación Regular',
      description: 'Bebe al menos 6-8 vasos de agua al día. La hidratación es crucial para el funcionamiento cognitivo.',
      icon: 'drop.fill',
      category: 'Nutrición',
    },
    {
      id: 2,
      title: 'Sueño Reparador',
      description: 'Duerme 7-8 horas diarias. Un buen descanso mejora la memoria y el equilibrio.',
      icon: 'moon.fill',
      category: 'Descanso',
    },
    {
      id: 3,
      title: 'Socialización Activa',
      description: 'Mantén contacto regular con familia y amigos. Las relaciones sociales protegen la salud mental.',
      icon: 'person.2.fill',
      category: 'Social',
    },
    {
      id: 4,
      title: 'Alimentación Balanceada',
      description: 'Incluye frutas, verduras y proteínas magras en tu dieta. Omega-3 es beneficioso para el cerebro.',
      icon: 'leaf.fill',
      category: 'Nutrición',
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

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Recomendaciones</ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
          Ejercicios mentales y consejos de salud
        </ThemedText>
      </ThemedView>

      {/* Daily Mental Exercise */}
      <ThemedView style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Ejercicio del Día</ThemedText>
          <IconSymbol name="brain.head.profile" size={24} color={colors.primary} />
        </View>

        <TouchableOpacity
          style={[styles.featuredCard, { backgroundColor: colors.primary }]}
          activeOpacity={0.8}
        >
          <View style={styles.featuredContent}>
            <View style={[styles.featuredIcon, { backgroundColor: colors.card }]}>
              <IconSymbol name={mentalExercises[0].icon as any} size={32} color={colors.primary} />
            </View>
            <View style={styles.featuredText}>
              <ThemedText style={[styles.featuredTitle, { color: colors.card }]}>
                {mentalExercises[0].title}
              </ThemedText>
              <ThemedText style={[styles.featuredDescription, { color: colors.secondary }]}>
                {mentalExercises[0].description}
              </ThemedText>
              <View style={styles.featuredMeta}>
                <View style={[styles.metaBadge, { backgroundColor: colors.card + '30' }]}>
                  <IconSymbol name="clock" size={14} color={colors.card} />
                  <ThemedText style={[styles.metaText, { color: colors.card }]}>
                    {mentalExercises[0].duration}
                  </ThemedText>
                </View>
                <View style={[styles.metaBadge, { backgroundColor: colors.card + '30' }]}>
                  <ThemedText style={[styles.metaText, { color: colors.card }]}>
                    {mentalExercises[0].difficulty}
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ThemedView>

      {/* Mental Exercises List */}
      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Más Ejercicios Mentales</ThemedText>

        {mentalExercises.slice(1).map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            style={[styles.exerciseCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <View style={[styles.exerciseIcon, { backgroundColor: colors.primary + '15' }]}>
              <IconSymbol name={exercise.icon as any} size={24} color={colors.primary} />
            </View>
            <View style={styles.exerciseInfo}>
              <View style={styles.exerciseHeader}>
                <ThemedText style={styles.exerciseTitle}>{exercise.title}</ThemedText>
                <View style={[styles.categoryBadge, { backgroundColor: colors.accent + '15' }]}>
                  <ThemedText style={[styles.categoryText, { color: colors.accent }]}>
                    {exercise.category}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={[styles.exerciseDescription, { color: colors.textSecondary }]}>
                {exercise.description}
              </ThemedText>
              <View style={styles.exerciseMeta}>
                <View style={styles.metaItem}>
                  <IconSymbol name="clock" size={14} color={colors.textSecondary} />
                  <ThemedText style={[styles.metaItemText, { color: colors.textSecondary }]}>
                    {exercise.duration}
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
          </TouchableOpacity>
        ))}
      </ThemedView>

      {/* Health Tips */}
      <ThemedView style={styles.section}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Consejos de Salud</ThemedText>
          <IconSymbol name="heart.fill" size={24} color={colors.error} />
        </View>

        {healthTips.map((tip) => (
          <ThemedView
            key={tip.id}
            style={[styles.tipCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={[styles.tipIcon, { backgroundColor: colors.accent + '15' }]}>
              <IconSymbol name={tip.icon as any} size={28} color={colors.accent} />
            </View>
            <View style={styles.tipContent}>
              <View style={styles.tipHeader}>
                <ThemedText style={styles.tipTitle}>{tip.title}</ThemedText>
                <View style={[styles.tipCategoryBadge, { backgroundColor: colors.primary + '15' }]}>
                  <ThemedText style={[styles.tipCategoryText, { color: colors.primary }]}>
                    {tip.category}
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={[styles.tipDescription, { color: colors.textSecondary }]}>
                {tip.description}
              </ThemedText>
            </View>
          </ThemedView>
        ))}
      </ThemedView>

      {/* CTA Card */}
      <TouchableOpacity
        style={[styles.ctaCard, { backgroundColor: colors.accent }]}
        activeOpacity={0.8}
      >
        <IconSymbol name="sparkles" size={32} color={colors.card} />
        <View style={styles.ctaText}>
          <ThemedText style={[styles.ctaTitle, { color: colors.card }]}>
            ¿Necesitas ayuda personalizada?
          </ThemedText>
          <ThemedText style={[styles.ctaDescription, { color: colors.secondary }]}>
            Contacta con tu fisioterapeuta para recomendaciones específicas
          </ThemedText>
        </View>
        <IconSymbol name="chevron.right" size={24} color={colors.card} />
      </TouchableOpacity>
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  featuredCard: {
    padding: 20,
    borderRadius: 16,
  },
  featuredContent: {
    flexDirection: 'row',
    gap: 16,
  },
  featuredIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredText: {
    flex: 1,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  featuredDescription: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  featuredMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
  },
  exerciseCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    gap: 12,
  },
  exerciseIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  exerciseDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  exerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaItemText: {
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
  tipCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    gap: 12,
  },
  tipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipContent: {
    flex: 1,
  },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  tipCategoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tipCategoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  tipDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  ctaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 20,
    borderRadius: 16,
    gap: 12,
  },
  ctaText: {
    flex: 1,
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  ctaDescription: {
    fontSize: 13,
  },
});
