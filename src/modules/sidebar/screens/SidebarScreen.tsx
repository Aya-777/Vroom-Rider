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
import { useTranslation } from 'react-i18next';
import { SavedPlacesModal } from '../../ride/components/SavedPlaces/SavedPlacesModal';

const SidebarScreen = ({
  navigation,
}: DrawerContentComponentProps) => {
  const vm = useSidebarViewModel(navigation);

  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { logout } = useProfileActions();
  const {t} = useTranslation('sidebar');
  

  return (
    <>
    <View
      style={styles.container}
    >
      <SidebarHeader
        name={vm.user.name}
        rating={vm.user.rating}
        avatar={vm.user.avatar}
        mode={vm.mode}
        onToggleTheme={vm.toggleTheme}
      />

      <LinearBg
        colors={[colors.backgroundSoft, colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.content}>
        <View style={styles.menu}>
          {vm.items.map(item => (
            <SidebarItem
              key={item.id}
              item={item}
              onPress={() => vm.handleItemPress(item)}
            />
          ))}
        </View>


        <View style={styles.footerContainer}>
        <ActionButton
            onPress={logout}
            title={t('logout')}
            icon={<LogoutIcon fill={colors.error} />}
            style={styles.logoutButton}
            textStyle={styles.logoutText}
          />
          <SidebarFooter version={vm.version} />
        </View>

      </LinearBg>
    </View>
    {vm.isSavedPlacesOpen && 
      <SavedPlacesModal 
      visible={vm.isSavedPlacesOpen}
      loading={vm.savedPlacesLoading}
      onAddPress={vm.onAddPlace}
      onDeletePlace={vm.onDeleteSavedPlace}
      onClose={() => vm.setIsSavedPlacesOpen(!vm.isSavedPlacesOpen)}
      onSelectPlace={()=>{}}
      places={vm.savedPlaces}
      />
    }
    </>
  );
};

export default SidebarScreen;