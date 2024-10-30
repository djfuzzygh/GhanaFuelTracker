import { StyleSheet } from 'react-native';

const colors = {
  primary: '#4a90e2',
  secondary: '#f2c94c',
  background: '#f5f6fa',
  text: '#333',
  textLight: '#666',
  border: '#e1e4e8',
  error: '#e74c3c',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseList: {
    flex: 1,
  },
  expenseItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  expenseDate: {
    color: colors.textLight,
    fontSize: 14,
  },
  expenseAmount: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  expenseLocation: {
    color: colors.text,
    fontSize: 14,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkButtonText: {
    color: colors.primary,
    fontSize: 14,
  },
  subscriptionInfo: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  providerList: {
    marginBottom: 20,
  },
  providerButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedProvider: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  providerButtonText: {
    fontSize: 16,
    color: colors.text,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingsLabel: {
    fontSize: 16,
    color: colors.textLight,
  },
  settingsValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: 'bold',
  },
  settingsButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingsButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: colors.error,
    borderColor: colors.error,
    marginTop: 30,
  },
  logoutButtonText: {
    color: '#fff',
  },
});