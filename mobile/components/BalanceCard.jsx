// import { View, Text } from "react-native";
// import { styles } from "../assets/styles/home.styles";
// import { COLORS } from "../constants/colors";

// export const BalanceCard = ({ summary }) => {
//   return (
//     <View style={styles.balanceCard}>
//       <Text style={styles.balanceTitle}>Total Balance</Text>
//       <Text style={styles.balanceAmount}>${parseFloat(summary.balance).toFixed(2)}</Text>
//       <View style={styles.balanceStats}>
//         <View style={styles.balanceStatItem}>
//           <Text style={styles.balanceStatLabel}>Income</Text>
//           <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
//             +${parseFloat(summary.income).toFixed(2)}
//           </Text>
//         </View>
//         <View style={[styles.balanceStatItem, styles.statDivider]} />
//         <View style={styles.balanceStatItem}>
//           <Text style={styles.balanceStatLabel}>Expenses</Text>
//           <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
//             -${Math.abs(parseFloat(summary.expenses)).toFixed(2)}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };



// import { View, Text, TouchableOpacity } from "react-native";

// export const BalanceCard = ({ accountBalance, onSend, onReceive }) => {
//   const COLORS = {
//     primary: "#8B593E",
//     background: "#FFF8F3",
//     text: "#4A3428",
//     border: "#E5D3B7",
//     white: "#FFFFFF",
//     textLight: "#9A8478",
//     card: "#FFFFFF",
//     shadow: "#000000",
//   };

//   const styles = {
//     balanceCard: {
//       backgroundColor: COLORS.card,
//       borderRadius: 20,
//       padding: 24,
//       width: '100%',
//       shadowColor: COLORS.shadow,
//       shadowOffset: { width: 0, height: 4 },
//       shadowOpacity: 0.1,
//       shadowRadius: 12,
//       elevation: 8,
//       borderWidth: 1,
//       borderColor: COLORS.border,
//     },
//     balanceTitle: {
//       fontSize: 13,
//       color: COLORS.textLight,
//       fontWeight: '600',
//       textTransform: 'uppercase',
//       letterSpacing: 0.5,
//       marginBottom: 8,
//     },
//     balanceAmount: {
//       fontSize: 38,
//       fontWeight: '700',
//       color: COLORS.primary,
//       marginBottom: 24,
//       letterSpacing: -0.5,
//     },
//     actionButtons: {
//       flexDirection: 'row',
//       gap: 12,
//     },
//     sendButton: {
//       flex: 1,
//       backgroundColor: COLORS.primary,
//       borderRadius: 14,
//       paddingVertical: 16,
//       alignItems: 'center',
//       justifyContent: 'center',
//       shadowColor: COLORS.primary,
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.2,
//       shadowRadius: 8,
//       elevation: 4,
//     },
//     sendButtonText: {
//       color: COLORS.white,
//       fontSize: 15,
//       fontWeight: '600',
//     },
//     receiveButton: {
//       flex: 1,
//       backgroundColor: COLORS.background,
//       borderRadius: 14,
//       paddingVertical: 16,
//       alignItems: 'center',
//       justifyContent: 'center',
//       borderWidth: 2,
//       borderColor: COLORS.primary,
//     },
//     receiveButtonText: {
//       color: COLORS.primary,
//       fontSize: 15,
//       fontWeight: '600',
//     },
//   };

//   return (
//     <View style={styles.balanceCard}>
//       <Text style={styles.balanceTitle}>Total Balance</Text>
//       <Text style={styles.balanceAmount}>
//         ${parseFloat(accountBalance).toLocaleString('en-US', { 
//           minimumFractionDigits: 2, 
//           maximumFractionDigits: 2 
//         })}
//       </Text>
      
//       {/* Action Buttons */}
//       <View style={styles.actionButtons}>
//         <TouchableOpacity 
//           style={styles.sendButton} 
//           onPress={onSend}
//           activeOpacity={0.8}
//         >
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={styles.receiveButton} 
//           onPress={onReceive}
//           activeOpacity={0.8}
//         >
//           <Text style={styles.receiveButtonText}>Receive</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// components/BalanceCard.jsx
// import { View, Text, TouchableOpacity } from "react-native";

// export const BalanceCard = ({ accountBalance, onSend, onReceive }) => {
//   const COLORS = {
//     primary: "#8B593E",
//     background: "#FFF8F3",
//     text: "#4A3428",
//     border: "#E5D3B7",
//     white: "#FFFFFF",
//     textLight: "#9A8478",
//     card: "#FFFFFF",
//     shadow: "#000000",
//   };

//   const styles = {
//     balanceCard: {
//       backgroundColor: COLORS.card,
//       borderRadius: 20,
//       padding: 24,
//       width: '100%',
//       shadowColor: COLORS.shadow,
//       shadowOffset: { width: 0, height: 4 },
//       shadowOpacity: 0.1,
//       shadowRadius: 12,
//       elevation: 8,
//       borderWidth: 1,
//       borderColor: COLORS.border,
//     },
//     balanceTitle: {
//       fontSize: 13,
//       color: COLORS.textLight,
//       fontWeight: '600',
//       textTransform: 'uppercase',
//       letterSpacing: 0.5,
//       marginBottom: 8,
//     },
//     balanceAmount: {
//       fontSize: 38,
//       fontWeight: '700',
//       color: COLORS.primary,
//       marginBottom: 24,
//       letterSpacing: -0.5,
//     },
//     actionButtons: {
//       flexDirection: 'row',
//       gap: 12,
//     },
//     sendButton: {
//       flex: 1,
//       backgroundColor: COLORS.primary,
//       borderRadius: 14,
//       paddingVertical: 16,
//       alignItems: 'center',
//       justifyContent: 'center',
//       shadowColor: COLORS.primary,
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.2,
//       shadowRadius: 8,
//       elevation: 4,
//     },
//     sendButtonText: {
//       color: COLORS.white,
//       fontSize: 15,
//       fontWeight: '600',
//     },
//     receiveButton: {
//       flex: 1,
//       backgroundColor: COLORS.background,
//       borderRadius: 14,
//       paddingVertical: 16,
//       alignItems: 'center',
//       justifyContent: 'center',
//       borderWidth: 2,
//       borderColor: COLORS.primary,
//     },
//     receiveButtonText: {
//       color: COLORS.primary,
//       fontSize: 15,
//       fontWeight: '600',
//     },
//   };

//   // Safely parse the balance
//   const balance = Number(accountBalance) || 0;
  
//   console.log('BalanceCard received:', accountBalance); // Debug log
//   console.log('Parsed balance:', balance); // Debug log

//   return (
//     <View style={styles.balanceCard}>
//       <Text style={styles.balanceTitle}>Total Balance</Text>
//       <Text style={styles.balanceAmount}>
//         ${balance.toLocaleString('en-US', { 
//           minimumFractionDigits: 2, 
//           maximumFractionDigits: 2 
//         })}
//       </Text>
      
//       {/* Action Buttons */}
//       <View style={styles.actionButtons}>
//         <TouchableOpacity 
//           style={styles.sendButton} 
//           onPress={onSend}
//           activeOpacity={0.8}
//         >
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={styles.receiveButton} 
//           onPress={onReceive}
//           activeOpacity={0.8}
//         >
//           <Text style={styles.receiveButtonText}>Receive</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// components/BalanceCard.jsx
import { View, Text, TouchableOpacity } from "react-native";

export const BalanceCard = ({ accountBalance, onSend, onReceive }) => {
  const COLORS = {
    primary: "#8B593E",
    background: "#FFF8F3",
    text: "#4A3428",
    border: "#E5D3B7",
    white: "#FFFFFF",
    textLight: "#9A8478",
    card: "#FFFFFF",
    shadow: "#000000",
  };

  const styles = {
    balanceCard: {
      backgroundColor: COLORS.card,
      borderRadius: 20,
      padding: 24,
      width: '100%',
      shadowColor: COLORS.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
      borderWidth: 1,
      borderColor: COLORS.border,
    },
    balanceTitle: {
      fontSize: 13,
      color: COLORS.textLight,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 8,
    },
    balanceAmount: {
      fontSize: 38,
      fontWeight: '700',
      color: COLORS.primary,
      marginBottom: 24,
      letterSpacing: -0.5,
    },
    actionButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    sendButton: {
      flex: 1,
      backgroundColor: COLORS.primary,
      borderRadius: 14,
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: COLORS.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    sendButtonText: {
      color: COLORS.white,
      fontSize: 15,
      fontWeight: '600',
    },
    receiveButton: {
      flex: 1,
      backgroundColor: COLORS.background,
      borderRadius: 14,
      paddingVertical: 16,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: COLORS.primary,
    },
    receiveButtonText: {
      color: COLORS.primary,
      fontSize: 15,
      fontWeight: '600',
    },
  };

  const balance = Number(accountBalance) || 0;

  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Text style={styles.balanceAmount}>
        ${balance.toLocaleString('en-US', { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        })}
      </Text>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={onSend}
          activeOpacity={0.8}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.receiveButton} 
          onPress={onReceive}
          activeOpacity={0.8}
        >
          <Text style={styles.receiveButtonText}>Receive</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};