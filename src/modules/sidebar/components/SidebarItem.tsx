import React from 'react';
import {Pressable, Text} from 'react-native';

import {SidebarItem as SidebarItemType} from '../types/sidebar.types';
import {styles} from '../styles/sidebar.styles';

type Props = {
  item: SidebarItemType;
  onPress: () => void;
};

const SidebarItem = ({item, onPress}: Props) => {
  const Icon = item.icon;

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.menuItem,
        pressed && styles.menuItemPressed,
      ]}>
      <Icon width={18} height={18} style={styles.menuIcon as any} />

      <Text style={styles.menuLabel}>
        {item.label}
      </Text>
    </Pressable>
  );
};

export default SidebarItem;