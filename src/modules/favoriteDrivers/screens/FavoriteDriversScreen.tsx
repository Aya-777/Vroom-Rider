import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { DriverSearchBar } from '../components/DriverSearchBar';
import { DriverCard } from '../components/DriverCard';
import { useFavoriteDriversStore } from '../store/useFavoriteDriversStore';
import Header from '../../../shared/components/SubHeader';
import { createStyles } from '../styles/favoriteDrivers.styles';
import { useTheme } from '../../../core/theme/useTheme';
import LinearBg from '../../../shared/components/LinearBg';

export const FavoriteDriversScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const { drivers, searchQuery, setSearchQuery, setSelectedFilter } =
    useFavoriteDriversStore();

  const filteredDrivers = drivers.filter(
    driver =>
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.plate.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <Header title="Favorite Drivers" onBackPress={() => {}} />
      <LinearBg
        colors={[colors.backgroundSoft, colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.container}
      >
        <FlatList
          data={filteredDrivers}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <DriverSearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
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
