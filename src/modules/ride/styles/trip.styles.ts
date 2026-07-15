import { StyleSheet } from 'react-native';
import { Radius, Spacing, Typography } from '../../../core/theme/tokens';

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  tripStartedMessage:{
    ...Typography.h3,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.mmd,
  },
  // DriverInfoCard Styles
  driverCard: {
    backgroundColor: colors.surface,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: Spacing.mmd,
  },
  driverInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: Radius.lg,
  },
  driverTextContainer: {
    flex: 1,
    marginLeft: Spacing.smm,
  },
  driverName: {
    ...Typography.boldBody,
    color: colors.textPrimary,
  },
  driverDetails: {
    ...Typography.caption,
    color: colors.textSecondary,
  },
  driverCar: {
    ...Typography.caption,
    color: colors.textSecondary,
    marginTop: Spacing.xxs,
  },
  callButton: {
    padding: Spacing.smm,
    backgroundColor: colors.surfaceVariant,
    borderRadius: Radius.lg,
  },

  // TripSummaryGrid Styles
  summaryTitle: {
    ...Typography.h3,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.smd,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.mmd,
  },
  column: {
    width: '48%',
  },
  metricCard: {
    backgroundColor: colors.surface,
    padding: Spacing.smm,
    borderRadius: Radius.md,
    marginBottom: Spacing.smm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  metricLabel: {
    ...Typography.smallCaption,
    color: colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  metricValue: {
    ...Typography.caption,
    color: colors.textPrimary,
  },
  tipLabel: {
    ...Typography.mediumCaption,
    color: colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  tipInput: {
    backgroundColor: colors.surface,
    padding: Spacing.smd,
    borderRadius: Radius.md,
    marginBottom: Spacing.smd,
    alignItems: 'center',
  },
  tipValue: {
    ...Typography.boldBody,
    color: colors.textPrimary,
  },
  delayLabel: {
    ...Typography.mediumCaption,
    color: colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  delayBox: {
    backgroundColor: colors.surface,
    padding: Spacing.smm,
    borderRadius: Radius.md,
  },
  delayValue: {
    ...Typography.boldCaption,
    color: colors.note,
  },

verticalDivider: {
  width: 1,
  backgroundColor: colors.border,
  marginHorizontal: Spacing.md,
},

  // Footer Styles
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.smm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: Spacing.smd,
  },
  subtotalLabel: {
    ...Typography.caption,
    color: colors.textSecondary,
  },
  subtotalValue: {
    ...Typography.h2,
    color: colors.textPrimary,
  },
  paymentMethod: {
    backgroundColor: colors.surface,
    paddingHorizontal: Spacing.smd,
    paddingVertical: Spacing.smm,
    borderRadius: Radius.sm,
  },
  disclaimerContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginTop: Spacing.smm,
  },
  disclaimerText: {
    textAlign: 'center',
    color: colors.textMuted,
    ...Typography.smallCaption,
    marginBottom: Spacing.smm,
  },
});