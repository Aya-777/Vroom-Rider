import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';

import SidebarHeader from '../components/SidebarHeader';
import SidebarItem from '../components/SidebarItem';
import SidebarFooter from '../components/SidebarFooter';

import {useSidebarViewModel} from '../viewmodels/useSidebarViewModel';
import {styles} from '../styles/sidebar.styles';

const SidebarScreen = ({
  navigation,
}: DrawerContentComponentProps) => {
  const {
    user,
    items,
    version,
  } = useSidebarViewModel();

  const handleItemPress = (route?: string) => {
    if (!route) {
      return;
    }

    // We'll configure individual routes next.
    console.log('Navigate to:', route);

    navigation.closeDrawer();
  };

  return (
    <SafeAreaView style={styles.container}>
      <SidebarHeader
        name={user.name}
        rating={user.rating}
        avatar={user.avatar}
      />

      <View style={styles.content}>
        <View style={styles.menu}>
          {items.map(item => (
            <SidebarItem
              key={item.id}
              item={item}
              onPress={() => handleItemPress(item.route)}
            />
          ))}
        </View>

        <SidebarFooter version={version} />
      </View>
    </SafeAreaView>
  );
};

export default SidebarScreen;