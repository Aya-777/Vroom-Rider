import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MenuIcon from '../../assets/svg/menu.svg';
import NotificationsIcon from '../../assets/svg/notifications.svg';
import { Colors, Typography, Spacing, Radius, Shadows } from '../../core/theme';

function Header() {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconButton}>
        <MenuIcon fill={Colors.primary} />
      </TouchableOpacity>

      <Text style={styles.logoText}>VROOM</Text>

      <TouchableOpacity style={styles.iconButton}>
        <NotificationsIcon fill={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },

  iconButton: {
    backgroundColor: Colors.surface,
    padding: Spacing.sm,
    borderRadius: Radius.full,
    ...Shadows.small,
  },

  logoText: {
    ...Typography.h2,
    color: Colors.secondary,
    letterSpacing: 1,
    flex: 1,
    textAlign: 'center',
  },
});

export default Header;