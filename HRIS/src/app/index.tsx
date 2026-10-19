import React, { useState } from 'react';
import * as Device from 'expo-device';
import { Modal, Platform, Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { AnimatedIcon } from '@/components/animated-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

const REGISTERED_USERS = ['superadmin@gmail.com', 'hafiz@gmail.com', 'abas@gmail.com', 'excel@gmail.com'];
const REGISTERED_PASSWORDS = ['superadmin', 'hafiz', 'abas', 'excel'];

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State untuk Kontrol Pop-Up Modal (Hanya Digunakan Untuk Error)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const router = useRouter();

  // Fungsi Pemicu Pop-Up Error
  const showErrorPopup = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    const trimmedPass = password.trim();

    // 1. Validasi input kosong
    if (!trimmedEmail || !trimmedPass) {
      showErrorPopup('Login Error', 'Email dan Password tidak boleh kosong!');
      return;
    }

    // 2. Cari indeks email
    const userIndex = REGISTERED_USERS.indexOf(trimmedEmail.toLowerCase());

    if (userIndex === -1) {
      showErrorPopup('Email Tidak Ditemukan', `Email "${trimmedEmail}" tidak terdaftar dalam sistem.`);
      return;
    }

    // 3. Verifikasi password sesuai indeks email
    if (REGISTERED_PASSWORDS[userIndex] !== trimmedPass) {
      showErrorPopup('Password Salah', 'Password yang Anda masukkan salah. Silakan coba lagi.');
      return;
    }

    // 4. Jika login berhasil -> LANGSUNG NAVIGASI TANPA POP-UP
    router.replace("/mainmenu");
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            KRONOSFA.
          </ThemedText>
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          Silakan login terlebih dahulu untuk mengakses aplikasi ini.
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          {/* Row Email */}
          <ThemedView style={styles.inputRow}>
            <ThemedText style={styles.label}>Email :</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Silakan Masukkan Email Anda"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </ThemedView>

          {/* Row Password */}
          <ThemedView style={styles.inputRow}>
            <ThemedText style={styles.label}>Password :</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Silakan Masukkan Password Anda"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </ThemedView>

          {/* Tombol Login */}
          <Pressable 
            style={({ pressed }) => [
              styles.button,
              { opacity: pressed ? 0.7 : 1 }
            ]} 
            onPress={handleLogin}
          >
            <ThemedText style={styles.buttonText}>LOGIN</ThemedText>
          </Pressable>
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}

        {/* --- KOMPONEN POP-UP MODAL (HANYA UNTUK ERROR) --- */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <ThemedView style={styles.modalOverlay}>
            <ThemedView style={styles.modalBox}>
              <ThemedText style={styles.modalTitle}>{modalTitle}</ThemedText>
              <ThemedText style={styles.modalMessage}>{modalMessage}</ThemedText>

              <Pressable
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <ThemedText style={styles.modalButtonText}>Tutup</ThemedText>
              </Pressable>
            </ThemedView>
          </ThemedView>
        </Modal>

      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
    marginBottom: Spacing.two,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
    zIndex: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  label: {
    fontWeight: '600',
    minWidth: 90,
  },
  input: {
    flex: 1,
    height: 38,
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 13,
    color: '#000000',
  },
  button: {
    marginTop: Spacing.two,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    cursor: 'pointer',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  /* Style Pop-Up Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
  },
  modalBox: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: Spacing.four,
    alignItems: 'center',
    gap: Spacing.two,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    marginVertical: Spacing.two,
  },
  modalButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 6,
    cursor: 'pointer',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});