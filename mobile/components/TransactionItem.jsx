// components/TransactionItem.jsx
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const COLORS = {
  primary: "#8B593E",
  background: "#FFF8F3",
  text: "#4A3428",
  border: "#E5D3B7",
  white: "#FFFFFF",
  textLight: "#9A8478",
  expense: "#E74C3C",
  income: "#2ECC71",
  card: "#FFFFFF",
  shadow: "#000000",
};

export default function TransactionItem({ item }) {
  const isCredit = item.type === 'credit';
  const iconBgColor = isCredit 
    ? 'rgba(46, 204, 113, 0.1)' 
    : 'rgba(231, 76, 60, 0.1)';
  const iconColor = isCredit ? COLORS.income : COLORS.expense;
  const amountColor = isCredit ? COLORS.income : COLORS.expense;

  return (
    <View
      style={styles.transactionItem}
    >
      <View style={styles.leftSection}>
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          <Ionicons
            name={isCredit ? "trending-up" : "trending-down"}
            size={22}
            color={iconColor}
          />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.recipientName} numberOfLines={1}>
            {item.recipient_name}
          </Text>
          <Text style={styles.transactionTime}>
            {item.description || 'No time'}
          </Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={[styles.amount, { color: amountColor }]}>
          {isCredit ? '+' : '-'}${parseFloat(item.amount).toFixed(2)}
        </Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionItem: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  transactionInfo: {
    flex: 1,
  },
  recipientName: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
  },
  transactionTime: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  status: {
    fontSize: 12,
    color: COLORS.textLight,
    textTransform: "capitalize",
  },
});