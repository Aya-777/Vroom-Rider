import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { DriverCard } from '../components/DriverCard';
import Header from '../../../shared/components/SubHeader';
import { createStyles } from '../styles/favoriteDrivers.styles';
import { useTheme } from '../../../core/theme/useTheme';
import LinearBg from '../../../shared/components/LinearBg';
import { useFavoriteDriversViewModel } from '../viewmodels/useFavoriteDriversViewModels';
import { useTranslation } from 'react-i18next';
import { callPhoneNumber, messagePhoneNumber } from '../../ride/utils/conmmunications';

export const FavoriteDriversScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['favoriteDrivers']);

  const vm = useFavoriteDriversViewModel();

  return (

    <LinearBg
      colors={[colors.backgroundSoft, colors.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0.8 }}
      style={styles.container}
    >
      <Header title={t('favoriteDrivers.title')} onBackPress={vm.goBack} />
      <LinearBg
        colors={[colors.backgroundSoft, colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        {vm.drivers.length === 0 ? (
          <View style={styles.textContainer}>
            <Text style={styles.favoriteTitle}>{t('favoriteDrivers.noFavoriteDrivers')}</Text>
          </View>
        ) : (
          <FlatList
            data={vm.drivers}
            keyExtractor={item => item.driver_id.toString()}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <DriverCard
                driver={item}
                onMessagePress={() => messagePhoneNumber(item.phone_number)}
                onCallPress={() => {
                  callPhoneNumber(item.phone_number)}}
                onToggleFavorite={() => vm.toggleFavorite(item.driver_id)}
                isFavorite={true}
              />
            )}
          />
        )}
      </LinearBg>
    </>
  );
};
