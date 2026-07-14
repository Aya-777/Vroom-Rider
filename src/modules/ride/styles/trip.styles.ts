import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // DriverInfoCard Styles
  driverCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  driverInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 25,
  },
  driverTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  driverDetails: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  driverCar: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  callButton: {
    padding: 12,
    backgroundColor: colors.surfaceVariant,
    borderRadius: 25,
  },

  // TripSummaryGrid Styles
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column: {
    width: '48%',
  },
  metricCard: {
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  tipLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  tipInput: {
    backgroundColor: colors.surfaceVariant,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  tipValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  delayLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  delayBox: {
    backgroundColor: colors.surfaceVariant,
    padding: 12,
    borderRadius: 12,
  },
  delayValue: {
    color: '#FFB800', // Use a specific warning/alert color from your theme
    fontWeight: 'bold',
  },

  // Footer Styles
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 15,
  },
  subtotalLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  subtotalValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  paymentMethod: {
    backgroundColor: colors.surfaceVariant,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  }
});