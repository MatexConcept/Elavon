// components/ErrorModal.jsx
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  primary: "#8B593E",
  background: "#FFF8F3",
  text: "#4A3428",
  border: "#E5D3B7",
  white: "#FFFFFF",
  textLight: "#9A8478",
  error: "#E74C3C",
  card: "#FFFFFF",
  shadow: "#000000",
};

export default function ErrorModal({ visible, onClose, type }) {
  const isSendError = type === 'send';

  const modalContent = {
    send: {
      title: "Transfer Unavailable",
      message: "We're unable to proceed with your transfer at this time. Your account has been temporarily restricted pending a regulatory and compliance review.\n\nThis restriction has been placed in line with Central Bank of Ireland directives and will remain active until the ongoing investigation is concluded.",
      buttonText: "Close"
    },
    receive: {
      title: "Incoming Transfers Restricted",
      message: "Incoming payments to this account are currently suspended due to a court-issued injunction and ongoing compliance review.\n\nAny attempted transfers will be automatically declined and returned to the sender's bank. This measure is temporary and will be lifted once the review is completed.",
      buttonText: "Got It"
    }
  };

  const content = modalContent[type] || modalContent.send;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Error Icon */}
          <View style={styles.iconContainer}>
            <Ionicons name="alert-circle" size={64} color={COLORS.error} />
          </View>

          {/* Title */}
          <Text style={styles.title}>{content.title}</Text>

          {/* Message */}
          <Text style={styles.message}>{content.message}</Text>

          {/* Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>{content.buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: COLORS.textLight,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});