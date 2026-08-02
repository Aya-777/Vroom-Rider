import { StyleSheet } from 'react-native';
import { Shadows, Typography } from '../../../core/theme/tokens';
import { ThemeColors } from '../../../core/theme/theme.types';


export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
    width: '100%',
    marginBottom: 20,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundSoft,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  selectedButton: {
    backgroundColor: colors.surface,
    borderColor: colors.primary,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    color: colors.textMuted,
    fontSize: 14,
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(11, 16, 29, 0.7)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  dropdownList: {
    backgroundColor: colors.background,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: colors.border,
  },
  optionSelected: {
    backgroundColor: colors.surface,
  },
  optionText: {
    color: colors.textPrimary,
    ...Typography.body,
  },
  optionTextSelected: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  optionPrice: {
    color: colors.success,
    ...Typography.caption,
  },
  activeFilter: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.primary + '80',
    marginBottom: 2,
  },
  activeFilterText: {
    color: colors.primary,
  },
});