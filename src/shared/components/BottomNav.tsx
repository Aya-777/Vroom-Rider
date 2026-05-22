import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HistoryIcon from '../../assets/svg/history.svg';
import ProfileIcon from '../../assets/svg/profile.svg';
import HomeIcon from '../../assets/svg/home.svg';
import { Colors, Typography, Spacing, Radius, Shadows } from '../../core/theme';

type BottomNavTab = 'HOME' | 'ACTIVITY' | 'PROFILE';

type BottomNavProps = {
  currentTab: BottomNavTab;
  onTabChange: (tabId: BottomNavTab) => void;
};

function BottomNav({ currentTab, onTabChange }: BottomNavProps) {
  const navigation = useNavigation<any>();

  const tabs = [
    { id: 'HOME' as const, label: 'Home', Icon: HomeIcon, route: 'Home' as const },
    { id: 'ACTIVITY' as const, label: 'Activity', Icon: HistoryIcon, route: 'Activity' as const },
    { id: 'PROFILE' as const, label: 'Profile', Icon: ProfileIcon, route: 'Profile' as const },
  ];

  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => {
        // Check if this specific tab is selected
        const isActive = currentTab === tab.id;

        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.navItem, isActive && styles.activeNavItem]}
            onPress={() => {
              onTabChange(tab.id);
              navigation.navigate(tab.route);
            }}
          >
            <tab.Icon fill={isActive ? Colors.primary : Colors.textMuted} />
            
            <Text 
              style={[
                styles.navLabel, 
                isActive && styles.activeNavLabel
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
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