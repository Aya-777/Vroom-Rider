import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import HistoryIcon from '../../assets/svg/history.svg';
import ProfileIcon from '../../assets/svg/profile.svg';
import HomeIcon from '../../assets/svg/home.svg';
import { Colors, Typography, Spacing, Radius, Shadows } from '../../core/theme';

function BottomNav() {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
        <HomeIcon fill={Colors.primary} />
        <Text style={[styles.navLabel, styles.activeNavLabel]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <HistoryIcon fill={Colors.textMuted} />
        <Text style={styles.navLabel}>Activity</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem}>
        <ProfileIcon fill={Colors.textMuted} />
        <Text style={styles.navLabel}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    backgroundColor: Colors.surface,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingBottom: Spacing.sm,
  },

  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  activeNavItem: {
    borderTopWidth: 3,
    borderTopColor: Colors.primary,
    height: '100%',
    justifyContent: 'center',
    paddingTop: 4,
  },

  navLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },

  activeNavLabel: {
    color: Colors.primary,
    fontFamily: 'Lora-Bold',
  },
});

export default BottomNav;