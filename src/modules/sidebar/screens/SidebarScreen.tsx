import React from 'react';
import {SafeAreaView, View} from 'react-native';

import SidebarHeader from '../components/SidebarHeader';
import SidebarItem from '../components/SidebarItem';
import SidebarFooter from '../components/SidebarFooter';

import {useSidebarViewModel} from '../viewmodels/useSidebarViewModel';
import {styles} from '../styles/sidebar.styles';

const SidebarScreen = () => {
  const {
    user,
    items,
    version,
    handleItemPress,
  } = useSidebarViewModel();

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
              onPress={() => handleItemPress(item)}
            />
          ))}
        </View>

        <SidebarFooter version={version} />
      </View>
    </SafeAreaView>
  );
};

export default SidebarScreen;