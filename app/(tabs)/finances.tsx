import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface BudgetCategory {
  name: string;
  spent: number;
  budget: number;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface Scholarship {
  id: string;
  title: string;
  amount: string;
  deadline: string;
  status: 'available' | 'applied' | 'awarded';
  requirements: string[];
}

export default function Finances() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showMpesaIntegration, setShowMpesaIntegration] = useState(false);

  const totalBalance = 12500;
  const monthlyBudget = 18000;
  const monthlySpent = 5500;

  const transactions: Transaction[] = [
    {
      id: '1',
      title: 'Lunch at Cafeteria',
      amount: -250,
      type: 'expense',
      category: 'Food',
      date: 'Today',
      icon: 'restaurant',
    },
    {
      id: '2',
      title: 'Textbook Purchase',
      amount: -1200,
      type: 'expense',
      category: 'Education',
      date: 'Yesterday',
      icon: 'book',
    },
    {
      id: '3',
      title: 'Scholarship Payment',
      amount: 5000,
      type: 'income',
      category: 'Scholarship',
      date: '2 days ago',
      icon: 'school',
    },
    {
      id: '4',
      title: 'Transport',
      amount: -150,
      type: 'expense',
      category: 'Transport',
      date: '3 days ago',
      icon: 'bus',
    },
  ];

  const budgetCategories: BudgetCategory[] = [
    {
      name: 'Food',
      spent: 2500,
      budget: 4000,
      color: '#BB0000',
      icon: 'restaurant',
    },
    {
      name: 'Transport',
      spent: 1200,
      budget: 2000,
      color: '#228B22',
      icon: 'bus',
    },
    {
      name: 'Education',
      spent: 1500,
      budget: 3000,
      color: '#FFD700',
      icon: 'book',
    },
    {
      name: 'Entertainment',
      spent: 300,
      budget: 1000,
      color: '#87CEEB',
      icon: 'game-controller',
    },
  ];

  const scholarships: Scholarship[] = [
    {
      id: '1',
      title: 'Kenya Government Scholarship',
      amount: 'KSh 50,000',
      deadline: 'March 30, 2024',
      status: 'available',
      requirements: ['GPA > 3.5', 'Financial need', 'Community service'],
    },
    {
      id: '2',
      title: 'University Merit Award',
      amount: 'KSh 25,000',
      deadline: 'April 15, 2024',
      status: 'applied',
      requirements: ['Top 10% of class', 'Leadership experience'],
    },
    {
      id: '3',
      title: 'STEM Excellence Grant',
      amount: 'KSh 75,000',
      deadline: 'May 1, 2024',
      status: 'available',
      requirements: ['STEM major', 'Research project', 'GPA > 3.7'],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#228B22';
      case 'applied': return '#FFD700';
      case 'awarded': return '#BB0000';
      default: return '#666';
    }
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      {/* Balance Card */}
      <LinearGradient
        colors={['#228B22', '#32CD32']}
        style={styles.balanceCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.balanceContent}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>KSh {totalBalance.toLocaleString()}</Text>
          <Text style={styles.balanceSubtext}>+KSh 2,500 this month</Text>
        </View>
        <TouchableOpacity 
          style={styles.mpesaButton}
          onPress={() => setShowMpesaIntegration(true)}>
          <Ionicons name="phone-portrait" size={24} color="#fff" />
          <Text style={styles.mpesaText}>M-Pesa</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Budget Overview */}
      <View style={styles.budgetOverview}>
        <Text style={styles.sectionTitle}>Monthly Budget</Text>
        <View style={styles.budgetProgress}>
          <View style={styles.budgetBar}>
            <View 
              style={[
                styles.budgetFill, 
                { width: `${(monthlySpent / monthlyBudget) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.budgetText}>
            KSh {monthlySpent.toLocaleString()} / KSh {monthlyBudget.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.quickStats}>
        <View style={styles.statCard}>
          <Ionicons name="trending-up" size={24} color="#228B22" />
          <Text style={styles.statValue}>68%</Text>
          <Text style={styles.statLabel}>Budget Left</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="calendar" size={24} color="#FFD700" />
          <Text style={styles.statValue}>15</Text>
          <Text style={styles.statLabel}>Days Left</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="card" size={24} color="#BB0000" />
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Transactions</Text>
        </View>
      </View>

      {/* Recent Transactions */}
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      {transactions.slice(0, 3).map((transaction) => (
        <View key={transaction.id} style={styles.transactionCard}>
          <View style={[
            styles.transactionIcon,
            { backgroundColor: transaction.type === 'income' ? '#228B22' + '20' : '#BB0000' + '20' }
          ]}>
            <Ionicons 
              name={transaction.icon} 
              size={20} 
              color={transaction.type === 'income' ? '#228B22' : '#BB0000'} 
            />
          </View>
          <View style={styles.transactionContent}>
            <Text style={styles.transactionTitle}>{transaction.title}</Text>
            <Text style={styles.transactionCategory}>{transaction.category} • {transaction.date}</Text>
          </View>
          <Text style={[
            styles.transactionAmount,
            { color: transaction.type === 'income' ? '#228B22' : '#BB0000' }
          ]}>
            {transaction.type === 'income' ? '+' : ''}KSh {Math.abs(transaction.amount).toLocaleString()}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderBudget = () => (
    <View style={styles.tabContent}>
      <View style={styles.budgetHeader}>
        <Text style={styles.sectionTitle}>Budget Categories</Text>
        <TouchableOpacity style={styles.editBudgetButton}>
          <Ionicons name="create" size={20} color="#BB0000" />
        </TouchableOpacity>
      </View>

      {budgetCategories.map((category, index) => {
        const percentage = (category.spent / category.budget) * 100;
        return (
          <View key={index} style={styles.budgetCategoryCard}>
            <View style={styles.categoryHeader}>
              <View style={styles.categoryLeft}>
                <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                  <Ionicons name={category.icon} size={20} color={category.color} />
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryAmount}>
                    KSh {category.spent.toLocaleString()} / KSh {category.budget.toLocaleString()}
                  </Text>
                </View>
              </View>
              <Text style={[
                styles.categoryPercentage,
                { color: percentage > 80 ? '#BB0000' : '#666' }
              ]}>
                {percentage.toFixed(0)}%
              </Text>
            </View>
            <View style={styles.categoryProgress}>
              <View 
                style={[
                  styles.categoryProgressFill, 
                  { 
                    width: `${Math.min(percentage, 100)}%`,
                    backgroundColor: percentage > 80 ? '#BB0000' : category.color
                  }
                ]} 
              />
            </View>
          </View>
        );
      })}

      {/* Spending Insights */}
      <View style={styles.spendingInsights}>
        <Text style={styles.sectionTitle}>Spending Insights</Text>
        <View style={styles.insightCard}>
          <Ionicons name="trending-down" size={24} color="#228B22" />
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Great job!</Text>
            <Text style={styles.insightDesc}>You're spending 20% less on food this month</Text>
          </View>
        </View>
        <View style={styles.insightCard}>
          <Ionicons name="warning" size={24} color="#FFD700" />
          <View style={styles.insightContent}>
            <Text style={styles.insightTitle}>Watch out</Text>
            <Text style={styles.insightDesc}>Transport costs are higher than usual</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderScholarships = () => (
    <View style={styles.tabContent}>
      <View style={styles.scholarshipHeader}>
        <Text style={styles.sectionTitle}>Available Scholarships</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {scholarships.map((scholarship) => (
        <View key={scholarship.id} style={styles.scholarshipCard}>
          <View style={styles.scholarshipHeader}>
            <View style={styles.scholarshipInfo}>
              <Text style={styles.scholarshipTitle}>{scholarship.title}</Text>
              <Text style={styles.scholarshipAmount}>{scholarship.amount}</Text>
            </View>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(scholarship.status) + '20' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: getStatusColor(scholarship.status) }
              ]}>
                {scholarship.status.toUpperCase()}
              </Text>
            </View>
          </View>
          
          <Text style={styles.scholarshipDeadline}>
            Deadline: {scholarship.deadline}
          </Text>
          
          <View style={styles.requirementsList}>
            <Text style={styles.requirementsTitle}>Requirements:</Text>
            {scholarship.requirements.map((req, index) => (
              <Text key={index} style={styles.requirementItem}>• {req}</Text>
            ))}
          </View>
          
          <TouchableOpacity 
            style={[
              styles.applyButton,
              scholarship.status === 'applied' && styles.appliedButton
            ]}
            disabled={scholarship.status === 'applied'}>
            <Text style={[
              styles.applyButtonText,
              scholarship.status === 'applied' && styles.appliedButtonText
            ]}>
              {scholarship.status === 'applied' ? 'Applied' : 'Apply Now'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Scholarship Tips */}
      <View style={styles.scholarshipTips}>
        <Text style={styles.sectionTitle}>Application Tips</Text>
        <View style={styles.tipCard}>
          <Ionicons name="bulb" size={20} color="#FFD700" />
          <Text style={styles.tipText}>
            Start your applications early - most scholarships require detailed essays and documentation.
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Ionicons name="checkmark-circle" size={20} color="#228B22" />
          <Text style={styles.tipText}>
            Keep your academic transcripts and recommendation letters updated and ready.
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Finances</Text>
        <TouchableOpacity 
          style={styles.addTransactionButton}
          onPress={() => setShowAddTransaction(true)}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}>
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'budget' && styles.activeTab]}
          onPress={() => setActiveTab('budget')}>
          <Text style={[styles.tabText, activeTab === 'budget' && styles.activeTabText]}>
            Budget
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'scholarships' && styles.activeTab]}
          onPress={() => setActiveTab('scholarships')}>
          <Text style={[styles.tabText, activeTab === 'scholarships' && styles.activeTabText]}>
            Scholarships
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'budget' && renderBudget()}
        {activeTab === 'scholarships' && renderScholarships()}
      </ScrollView>

      {/* Add Transaction Modal */}
      <Modal
        visible={showAddTransaction}
        animationType="slide"
        presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddTransaction(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add Transaction</Text>
            <TouchableOpacity>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Amount</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0"
                keyboardType="numeric"
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={styles.textInput}
                placeholder="What was this for?"
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Category</Text>
              <View style={styles.categoryOptions}>
                <TouchableOpacity style={[styles.categoryOption, styles.activeCategoryOption]}>
                  <Ionicons name="restaurant" size={20} color="#fff" />
                  <Text style={styles.activeCategoryOptionText}>Food</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryOption}>
                  <Ionicons name="bus" size={20} color="#666" />
                  <Text style={styles.categoryOptionText}>Transport</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryOption}>
                  <Ionicons name="book" size={20} color="#666" />
                  <Text style={styles.categoryOptionText}>Education</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* M-Pesa Integration Modal */}
      <Modal
        visible={showMpesaIntegration}
        animationType="slide"
        presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowMpesaIntegration(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>M-Pesa Integration</Text>
            <TouchableOpacity>
              <Text style={styles.saveButton}>Connect</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.mpesaContent}>
            <View style={styles.mpesaIcon}>
              <Ionicons name="phone-portrait" size={60} color="#228B22" />
            </View>
            <Text style={styles.mpesaTitle}>Connect Your M-Pesa</Text>
            <Text style={styles.mpesaDescription}>
              Automatically track your M-Pesa transactions and get better insights into your spending.
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.textInput}
                placeholder="+254 7XX XXX XXX"
                keyboardType="phone-pad"
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.mpesaFeatures}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#228B22" />
                <Text style={styles.featureText}>Automatic transaction import</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#228B22" />
                <Text style={styles.featureText}>Real-time balance updates</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#228B22" />
                <Text style={styles.featureText}>Spending categorization</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#36454F',
  },
  addTransactionButton: {
    backgroundColor: '#BB0000',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabNavigation: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#BB0000',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#BB0000',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  balanceCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceContent: {
    flex: 1,
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
    marginVertical: 5,
  },
  balanceSubtext: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  mpesaButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  mpesaText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
  budgetOverview: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 15,
  },
  budgetProgress: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  budgetBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 10,
  },
  budgetFill: {
    height: '100%',
    backgroundColor: '#228B22',
    borderRadius: 4,
  },
  budgetText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#36454F',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  transactionCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  transactionContent: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 2,
  },
  transactionCategory: {
    fontSize: 12,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  editBudgetButton: {
    padding: 8,
  },
  budgetCategoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 2,
  },
  categoryAmount: {
    fontSize: 14,
    color: '#666',
  },
  categoryPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryProgress: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
  },
  categoryProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  spendingInsights: {
    marginTop: 20,
  },
  insightCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  insightContent: {
    flex: 1,
    marginLeft: 15,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 2,
  },
  insightDesc: {
    fontSize: 14,
    color: '#666',
  },
  scholarshipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  filterButton: {
    padding: 8,
  },
  scholarshipCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scholarshipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  scholarshipInfo: {
    flex: 1,
    marginRight: 15,
  },
  scholarshipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 5,
  },
  scholarshipAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#228B22',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  scholarshipDeadline: {
    fontSize: 14,
    color: '#BB0000',
    marginBottom: 15,
  },
  requirementsList: {
    marginBottom: 15,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 5,
  },
  requirementItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  applyButton: {
    backgroundColor: '#BB0000',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  appliedButton: {
    backgroundColor: '#e0e0e0',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  appliedButtonText: {
    color: '#666',
  },
  scholarshipTips: {
    marginTop: 20,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  modal: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F',
  },
  cancelButton: {
    fontSize: 16,
    color: '#666',
  },
  saveButton: {
    fontSize: 16,
    color: '#BB0000',
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  amountInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeCategoryOption: {
    backgroundColor: '#BB0000',
    borderColor: '#BB0000',
  },
  categoryOptionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginLeft: 8,
  },
  activeCategoryOptionText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  mpesaContent: {
    flex: 1,
    padding: 40,
    alignItems: 'center',
  },
  mpesaIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#228B22' + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  mpesaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 10,
    textAlign: 'center',
  },
  mpesaDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  mpesaFeatures: {
    width: '100%',
    marginTop: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureText: {
    fontSize: 16,
    color: '#36454F',
    marginLeft: 10,
  },
});