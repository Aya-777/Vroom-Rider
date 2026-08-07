import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

import SidebarHeader from '../components/SidebarHeader';
import SidebarItem from '../components/SidebarItem';
import SidebarFooter from '../components/SidebarFooter';

import { useSidebarViewModel } from '../viewmodels/useSidebarViewModel';
import { createStyles } from '../styles/sidebar.styles';
import { useTheme } from '../../../core/theme/useTheme';
import LinearBg from '../../../shared/components/LinearBg';
import ActionButton from '../../../shared/components/ActionButton';
import LogoutIcon from '../../../assets/svg/profile/logout.svg';
import { useProfileActions } from '../../profile/hooks/useProfileActions';

const SidebarScreen = ({
  navigation,
}: DrawerContentComponentProps) => {
  const {
    user,
    items,
    version,
    handleItemPress,
    mode,
    toggleTheme,
  } = useSidebarViewModel(navigation);

  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { logout } = useProfileActions();
  

  return (
    <View
      style={styles.container}
    >
      <SidebarHeader
        name={user.name}
        rating={user.rating}
        avatar={user.avatar}
        mode={mode}
        onToggleTheme={toggleTheme}
      />

      <LinearBg
        colors={[colors.backgroundSoft, colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.content}>
        <View style={styles.menu}>
          {items.map(item => (
            <SidebarItem
              key={item.id}
              item={item}
              onPress={() => handleItemPress(item)}
            />
          ))}
        </View>


        <View style={styles.footerContainer}>
        <ActionButton
            onPress={()=>{}}
            title={'Logout'}
            icon={<LogoutIcon fill={colors.error} />}
            style={styles.logoutButton}
            textStyle={styles.logoutText}
          />
          <SidebarFooter version={version} />
        </View>

      </LinearBg>
    </View>
  );
};

export default SidebarScreen;