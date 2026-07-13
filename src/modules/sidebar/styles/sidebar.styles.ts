import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../../core/theme/theme.types';
import { Typography } from '../../../core/theme/tokens';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

  header: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 14,
    backgroundColor: colors.surface,
  },

  avatarContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1.5,
    borderColor: colors.border,
    overflow: 'hidden',
  },

  avatar: {
    width: '100%',
    height: '100%',
  },

  avatarPlaceholder: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  userInfo: {
    justifyContent: 'center',
  },

  userName: {
    ...Typography.h3,
    color: colors.textPrimary,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
  },
  
  rating: {
    color: colors.textPrimary,
    ...Typography.caption,
  },

  content: {
    flex: 1,
  },

  menu: {
    paddingTop: 14,
    paddingHorizontal: 20,
  },

  menuItem: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRadius: 8,
    paddingHorizontal: 2,
  },

  menuItemPressed: {
    opacity: 0.6,
  },

  menuIcon: {
    color: colors.textMuted,
  },

  menuLabel: {
    ...Typography.caption,
    color: colors.textSecondary,
  },

  footer: {
    marginTop: 'auto',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  version: {
    ...Typography.smallCaption,
    color: colors.textMuted,
  },
});