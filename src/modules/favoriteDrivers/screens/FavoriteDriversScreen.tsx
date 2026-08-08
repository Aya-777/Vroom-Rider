import React from 'react';
import { View, FlatList, StyleSheet} from 'react-native';
import { DriverSearchBar } from '../components/DriverSearchBar';
import { DriverCard } from '../components/DriverCard';
import { useFavoriteDriversStore } from '../store/useFavoriteDriversStore';
import Header from '../../../shared/components/SubHeader';

export const FavoriteDriversScreen: React.FC = () => {

  const { drivers, searchQuery, setSearchQuery, setSelectedFilter } = useFavoriteDriversStore();

  const filteredDrivers = drivers.filter((driver) =>
    driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.plate.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <Header title='Favorite Drivers' onBackPress={() => {}}/>
    <View style={styles.container}>
      <FlatList
        data={filteredDrivers}
        keyExtractor={(item) => item.id}
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
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContainer: {
    padding: 16,
  },
});