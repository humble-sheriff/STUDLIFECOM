import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Transaction {
  id: string;
  type: 'sent' | 'received' | 'paybill' | 'buygoods';
  amount: number;
  recipient: string;
  date: Date;
  reference: string;
  status: 'completed' | 'pending' | 'failed';
}

interface MPesaAccount {
  phoneNumber: string;
  balance: number;
  isLinked: boolean;
  lastSync: Date;
}

export default function MPesaIntegration() {
  const [account, setAccount] = useState<MPesaAccount>({
    phoneNumber: '',
    balance: 0,
    isLinked: false,
    lastSync: new Date(),
  });
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLinking, setIsLinking] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');

  useEffect(() => {
    loadMPesaData();
  }, []);

  const loadMPesaData = () => {
    // Simulate loading M-Pesa data
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        type: 'sent',
        amount: 500,
        recipient: 'John Doe',
        date: new Date(Date.now() - 86400000),
        reference: 'QGH7K8L9M0',
        status: 'completed',
      },
      {
        id: '2',
        type: 'received',
        amount: 1200,
        recipient: 'Mary Smith',
        date: new Date(Date.now() - 172800000),
        reference: 'QGH7K8L9M1',
        status: 'completed',
      },
      {
        id: '3',
        type: 'paybill',
        amount: 2500,
        recipient: 'Kenya Power',
        date: new Date(Date.now() - 259200000),
        reference: 'QGH7K8L9M2',
        status: 'completed',
      },
    ];
    
    setTransactions(mockTransactions);
    
    // Simulate linked account
    setAccount({
      phoneNumber: '+254712345678',
      balance: 5420,
      isLinked: true,
      lastSync: new Date(),
    });
  };

  const linkMPesaAccount = async () => {
    if (!phoneNumber || !pin) {
      Alert.alert('Error', 'Please enter your phone number and PIN');
      return;
    }

    setIsLinking(true);
    
    // Simulate linking process
    setTimeout(() => {
      setAccount({
        phoneNumber: phoneNumber,
        balance: 5420,
        isLinked: true,
        lastSync: new Date(),
      });
      setIsLinking(false);
      Alert.alert('Success', 'M-Pesa account linked successfully!');
    }, 2000);
  };

  const unlinkAccount = () => {
    Alert.alert(
      'Unlink M-Pesa Account',
      'Are you sure you want to unlink your M-Pesa account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Unlink', 
          style: 'destructive',
          onPress: () => {
            setAccount({
              phoneNumber: '',
              balance: 0,
              isLinked: false,
              lastSync: new Date(),
            });
            setTransactions([]);
          }
        },
      ]
    );
  };

  const syncTransactions = () => {
    Alert.alert('Syncing...', 'Fetching latest transactions from M-Pesa');
    // Simulate sync
    setTimeout(() => {
      setAccount(prev => ({ ...prev, lastSync: new Date() }));
      Alert.alert('Success', 'Transactions synced successfully!');
    }, 1500);
  };

  const sendMoney = () => {
    Alert.alert('Send Money', 'This feature will be available in the full version');
  };

  const requestMoney = () => {
    Alert.alert('Request Money', 'This feature will be available in the full version');
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'sent': return 'arrow-up';
      case 'received': return 'arrow-down';
      case 'paybill': return 'card';
      case 'buygoods': return 'storefront';
      default: return 'swap-horizontal';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'sent': return '#DC3545';
      case 'received': return '#28A745';
      case 'paybill': return '#FFC107';
      case 'buygoods': return '#17A2B8';
      default: return '#666';
    }
  };

  const formatAmount = (amount: number, type: string) => {
    const prefix = type === 'received' ? '+' : '-';
    return `${prefix}KSh ${amount.toLocaleString()}`;
  };

  if (!account.isLinked) {
    return (
      <ScrollView style={styles.container}>
        <Card style={styles.linkingCard}>
          <View style={styles.mpesaLogo}>
            <Ionicons name="phone-portrait" size={60} color="#228B22" />
          </View>
          
          <Text style={styles.linkingTitle}>Connect Your M-Pesa</Text>
          <Text style={styles.linkingDesc}>
            Link your M-Pesa account to automatically track your transactions and manage your budget effectively.
          </Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              placeholder="+254 7XX XXX XXX"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>M-Pesa PIN</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your M-Pesa PIN"
              value={pin}
              onChangeText={setPin}
              secureTextEntry
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
          
          <Button
            title={isLinking ? "Linking Account..." : "Link M-Pesa Account"}
            onPress={linkMPesaAccount}
            loading={isLinking}
            gradient
            fullWidth
            icon="link"
          />
          
          <View style={styles.securityNote}>
            <Ionicons name="shield-checkmark" size={20} color="#228B22" />
            <Text style={styles.securityText}>
              Your M-Pesa credentials are encrypted and secure. We use bank-level security to protect your data.
            </Text>
          </View>
        </Card>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Balance Card */}
      <LinearGradient
        colors={['#228B22', '#32CD32']}
        style={styles.balanceCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceLabel}>M-Pesa Balance</Text>
          <TouchableOpacity onPress={unlinkAccount}>
            <Ionicons name="settings" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.balanceAmount}>KSh {account.balance.toLocaleString()}</Text>
        <Text style={styles.phoneNumber}>{account.phoneNumber}</Text>
        
        <View style={styles.balanceActions}>
          <TouchableOpacity style={styles.balanceAction} onPress={sendMoney}>
            <Ionicons name="arrow-up" size={20} color="#fff" />
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.balanceAction} onPress={requestMoney}>
            <Ionicons name="arrow-down" size={20} color="#fff" />
            <Text style={styles.actionText}>Request</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.balanceAction} onPress={syncTransactions}>
            <Ionicons name="refresh" size={20} color="#fff" />
            <Text style={styles.actionText}>Sync</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <Card style={styles.actionsCard}>
        <Text style={styles.actionsTitle}>Quick Actions</Text>
        
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: '#17A2B8' + '20' }]}>
              <Ionicons name="card" size={24} color="#17A2B8" />
            </View>
            <Text style={styles.actionLabel}>Pay Bill</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: '#FFC107' + '20' }]}>
              <Ionicons name="storefront" size={24} color="#FFC107" />
            </View>
            <Text style={styles.actionLabel}>Buy Goods</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: '#6F42C1' + '20' }]}>
              <Ionicons name="phone-portrait" size={24} color="#6F42C1" />
            </View>
            <Text style={styles.actionLabel}>Airtime</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem}>
            <View style={[styles.actionIcon, { backgroundColor: '#E83E8C' + '20' }]}>
              <Ionicons name="wallet" size={24} color="#E83E8C" />
            </View>
            <Text style={styles.actionLabel}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Recent Transactions */}
      <Card style={styles.transactionsCard}>
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Recent Transactions</Text>
          <Text style={styles.lastSync}>
            Last sync: {account.lastSync.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
        
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={[
              styles.transactionIcon,
              { backgroundColor: getTransactionColor(transaction.type) + '20' }
            ]}>
              <Ionicons 
                name={getTransactionIcon(transaction.type)} 
                size={20} 
                color={getTransactionColor(transaction.type)} 
              />
            </View>
            
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionRecipient}>{transaction.recipient}</Text>
              <Text style={styles.transactionReference}>Ref: {transaction.reference}</Text>
              <Text style={styles.transactionDate}>
                {transaction.date.toLocaleDateString()}
              </Text>
            </View>
            
            <View style={styles.transactionRight}>
              <Text style={[
                styles.transactionAmount,
                { color: getTransactionColor(transaction.type) }
              ]}>
                {formatAmount(transaction.amount, transaction.type)}
              </Text>
              <View style={[styles.statusBadge, { backgroundColor: '#28A745' + '20' }]}>
                <Text style={[styles.statusText, { color: '#28A745' }]}>
                  {transaction.status.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </Card>

      {/* Spending Insights */}
      <Card style={styles.insightsCard}>
        <Text style={styles.insightsTitle}>Spending Insights</Text>
        
        <View style={styles.insightItem}>
          <Ionicons name="trending-down" size={24} color="#28A745" />
          <View style={styles.insightContent}>
            <Text style={styles.insightText}>You've spent 15% less this week</Text>
            <Text style={styles.insightSubtext}>Great job managing your budget!</Text>
          </View>
        </View>
        
        <View style={styles.insightItem}>
          <Ionicons name="restaurant" size={24} color="#FFC107" />
          <View style={styles.insightContent}>
            <Text style={styles.insightText}>Food expenses: KSh 2,400</Text>
            <Text style={styles.insightSubtext}>20% of your monthly budget</Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  linkingCard: {
    padding: 30,
    alignItems: 'center',
  },
  mpesaLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#228B22' + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  linkingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 10,
    textAlign: 'center',
  },
  linkingDesc: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
    padding: 15,
    backgroundColor: '#228B22' + '10',
    borderRadius: 12,
  },
  securityText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
    flex: 1,
    lineHeight: 18,
  },
  balanceCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 20,
  },
  balanceActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  balanceAction: {
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
    fontWeight: '600',
  },
  actionsCard: {
    marginBottom: 20,
    padding: 20,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionItem: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    color: '#36454F',
    fontWeight: '600',
    textAlign: 'center',
  },
  transactionsCard: {
    marginBottom: 20,
    padding: 20,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F',
  },
  lastSync: {
    fontSize: 12,
    color: '#666',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionRecipient: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
  },
  transactionReference: {
    fontSize: 12,
    color: '#666',
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  insightsCard: {
    marginBottom: 20,
    padding: 20,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 15,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  insightContent: {
    flex: 1,
    marginLeft: 12,
  },
  insightText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
  },
  insightSubtext: {
    fontSize: 14,
    color: '#666',
  },
});