import React from 'react';

export enum ClientStatus {
  Active = 'Active',
  Pending = 'Pending',
  Inactive = 'Inactive',
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  status: ClientStatus;
  revenue: number;
  lastContact: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number; // Secondary value for comparison charts
  [key: string]: any;
}

export interface ExpenseCategory {
  name: string;
  value: number;
  color: string;
  [key: string]: any;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
}

export interface FinancialSummary {
  balance: number;
  income: number;
  expense: number;
  balanceGrowth: number;
  incomeGrowth: number;
  expenseGrowth: number;
}

// New Types
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  payee: string;
  category: string;
  amount: number;
  type: TransactionType;
  accountId: string;
  status: 'cleared' | 'pending';
}

export type AccountType = 'Cash' | 'Debit' | 'Credit' | 'Investment' | 'Savings' | 'Loan';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  institution: string;
  lastUpdated: string;
  // Visual helpers
  accountNumber?: string;
  expiry?: string;
  colorTheme?: string;
  investmentCategory?: string;
  iconBgClass?: string;
  iconTextColorClass?: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string; // ISO Date
  icon: string;
  color: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  limit: number;
  spent: number;
  color: string;
  icon: React.ComponentType<any>;
}

export interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface UserSettings {
  notifications: boolean;
  emailAlerts: boolean;
  currency: string;
  language: string;
  twoFactor: boolean;
}