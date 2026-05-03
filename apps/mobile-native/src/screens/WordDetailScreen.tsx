import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getWord } from '../lib/api';

export default function WordDetailScreen({ route }: any) {
  const { id } = route.params;

  const { data: word, isLoading } = useQuery({
    queryKey: ['word', id],
    queryFn: () => getWord(id),
  });

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0284c7" />
      </View>
    );
  }

  if (!word) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Word not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Tai Khamyang */}
      <View style={styles.section}>
        <Text style={styles.label}>Tai Khamyang</Text>
        <Text style={styles.mainText}>{word.tai_khamyang_word}</Text>
      </View>

      {/* English */}
      <View style={styles.section}>
        <Text style={styles.label}>English</Text>
        <Text style={styles.mainText}>{word.english_word}</Text>
      </View>

      {/* Assamese */}
      <View style={styles.section}>
        <Text style={styles.label}>Assamese</Text>
        <Text style={styles.mainText}>{word.assamese_word}</Text>
      </View>

      {/* Pronunciation */}
      {word.pronunciation && (
        <View style={styles.pronunciationCard}>
          <Text style={styles.pronunciationLabel}>🔊 Pronunciation</Text>
          <Text style={styles.pronunciationText}>{word.pronunciation}</Text>
        </View>
      )}

      {/* Metadata */}
      <View style={styles.metadataCard}>
        <Text style={styles.metadataLabel}>Added</Text>
        <Text style={styles.metadataText}>
          {new Date(word.created_at).toLocaleDateString()}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#64748b',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  mainText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e293b',
  },
  pronunciationCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  pronunciationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 4,
  },
  pronunciationText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1e40af',
  },
  metadataCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  metadataLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 4,
  },
  metadataText: {
    fontSize: 14,
    color: '#475569',
  },
});
