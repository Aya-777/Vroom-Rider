import React from 'react';
import {FlatList} from 'react-native';
import { DriverSearchBar } from '../components/DriverSearchBar';
import { DriverCard } from '../components/DriverCard';
import Header from '../../../shared/components/SubHeader';
import { createStyles } from '../styles/favoriteDrivers.styles';
import { useTheme } from '../../../core/theme/useTheme';
import LinearBg from '../../../shared/components/LinearBg';
import { useFavoriteDriversViewModel } from '../viewmodels/useFavoriteDriversViewModels';
import { useTranslation } from 'react-i18next';

export const FavoriteDriversScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['favoriteDrivers']);

  const vm = useFavoriteDriversViewModel();

  return (
    <>
      <Header title={t('favoriteDrivers.title')} onBackPress={vm.goBack} />
      <LinearBg
        colors={[colors.backgroundSoft, colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <FlatList
          data={vm.filteredDrivers}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <DriverSearchBar
              placeholder={t('favoriteDrivers.searchPlaceholder')}
              value={vm.searchQuery}
              onChangeText={vm.setSearchQuery}
              onFilterPress={() => {}}
            />
          }
          renderItem={({ item }) => (
            <DriverCard
              driver={item}
              onActionPress={() => {}}
              onMessagePress={() => {}}
            />
          )}
        />
      </LinearBg>
    </>
  );
};
