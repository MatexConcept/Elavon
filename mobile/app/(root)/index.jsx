import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useTransactions } from "../../hooks/useTransactions.js";
import { useSettings, useTransaction } from "../../hooks/useElavon.js";
import { useEffect, useState } from "react";
import PageLoader from "../../components/PageLoader.jsx";
import { styles } from "../../assets/styles/home.styles.js";
import { Ionicons } from "@expo/vector-icons";
import { BalanceCard } from "../../components/BalanceCard.jsx";
import TransactionItem from "../../components/TransactionItem.jsx";
import ErrorModal from '../../components/ErrorModal.jsx';

export default function Page() {
  const { user } = useUser();

  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const { transactions, summary, isLoading, loadData, deleteTransaction } =
    useTransactions(user.id);

  const { settings, loading: settingsLoading } = useSettings();
  const {
    transaction,
    loading: transactionsLoading,
    refetchTransactions,
  } = useTransaction(10);

    const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('send'); 

    const handleSend = () => {
    setModalType('send');
    setModalVisible(true);
  };

  const handleReceive = () => {
    setModalType('receive');
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchTransactions()]); 
    setRefreshing(false);
  };

  if (isLoading && !refreshing) return <PageLoader />;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          {/* LEFT  */}
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/E_logo.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>{settings.profile_name}</Text>
            </View>
          </View>
           <View style={styles.headerRight}>
         
            <SignOutButton />
          </View>
         
        </View>

{/*         
        <BalanceCard
          accountBalance={settings.account_balance}
          onSend={() => router.push("/send")}
          onReceive={() => router.push("/receive")}
        /> */}
         <BalanceCard 
        accountBalance={settings.account_balance}
        onSend={handleSend}
        onReceive={handleReceive}
      />

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>

      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transaction}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => <TransactionItem item={item} />}
        keyExtractor={(item) => item.transaction_id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={{ alignItems: "center", paddingVertical: 40 }}>
            <Ionicons name="receipt-outline" size={48} color="#9A8478" />
            <Text style={{ color: "#9A8478", marginTop: 12, fontSize: 16 }}>
              No transactions yet
            </Text>
          </View>
        )}
      />

         <ErrorModal 
        visible={modalVisible}
        onClose={closeModal}
        type={modalType}
      />
    </View>
  );
}
