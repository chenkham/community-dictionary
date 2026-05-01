import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { getWords, searchWords } from '@/lib/api';
import type { Word } from '@/lib/api';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Fetch all words by default
  const { data: allWords, isLoading: loadingAll } = useQuery({
    queryKey: ['words'],
    queryFn: () => getWords({ page: 1, limit: 100 }),
    enabled: !searchQuery,
  });

  // Search words when query exists
  const { data: searchResults, isLoading: loadingSearch } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => searchWords(searchQuery),
    enabled: searchQuery.length > 0,
  });

  const words = searchQuery ? searchResults?.results : allWords?.data;
  const isLoading = searchQuery ? loadingSearch : loadingAll;

  const renderWord = ({ item }: { item: Word }) => (
    <TouchableOpacity
      style={styles.wordCard}
      onPress={() => router.push(`/word/${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.wordRow}>
        <View style={styles.wordColumn}>
          <Text style={styles.label}>Tai Khamyang</Text>
          <Text style={styles.wordText}>{item.tai_khamyang_word}</Text>
        </View>
        <View style={styles.wordColumn}>
          <Text style={styles.label}>English</Text>
          <Text style={styles.wordText}>{item.english_word}</Text>
        </View>
        <View style={styles.wordColumn}>
          <Text style={styles.label}>Assamese</Text>
          <Text style={styles.wordText}>{item.assamese_word}</Text>
        </View>
      </View>
      {item.pronunciation && (
        <View style={styles.pronunciationRow}>
          <Text style={styles.pronunciationLabel}>🔊 </Text>
          <Text style={styles.pronunciationText}>{item.pronunciation}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search in any language..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
      </View>

      {/* Results Count */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>
          {searchQuery ? 'Search Results' : 'All Words'}
        </Text>
        <Text style={styles.countText}>
          {words?.length || 0} {words?.length === 1 ? 'word' : 'words'}
        </Text>
      </View>

      {/* Word List */}
      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0284c7" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : words && words.length > 0 ? (
        <FlatList
          data={words}
          renderItem={renderWord}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>
            {searchQuery
              ? 'No words found. Try a different search.'
              : 'No words available yet.'}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  searchInput: {
    height: 48,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1e293b',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  countText: {
    fontSize: 14,
    color: '#64748b',
  },
  listContent: {
    padding: 16,
  },
  wordCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  wordRow: {
    flexDirection: 'column',
    gap: 12,
  },
  wordColumn: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  wordText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
  },
  pronunciationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  pronunciationLabel: {
    fontSize: 14,
  },
  pronunciationText: {
    fontSize: 14,
    color: '#64748b',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748b',
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
});
