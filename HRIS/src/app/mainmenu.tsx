import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

export default function MainMenuScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // Kembali ke halaman login (index.tsx) dan menggantikan stack navigasi
    router.replace('/');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Selamat Datang di Main Menu
      </ThemedText>

      <ThemedText style={styles.subtitle}>
        Anda berhasil masuk ke sistem KRONOSFA.
      </ThemedText>

      {/* Tombol Logout */}
      <Pressable
        style={({ pressed }) => [
          styles.logoutButton,
          { opacity: pressed ? 0.7 : 1 }
        ]}
        onPress={handleLogout}
      >
        <ThemedText style={styles.logoutText}>LOGOUT</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
    gap: Spacing.three,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#6B7280',
  },
  logoutButton: {
    marginTop: Spacing.four,
    backgroundColor: '#EF4444', // Warna merah untuk aksi logout
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    cursor: 'pointer',
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});