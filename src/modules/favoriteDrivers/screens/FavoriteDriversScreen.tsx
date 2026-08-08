import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
// import { useDriverStore } from '../store/useDriverStore';
import { DriverSearchBar } from '../components/DriverSearchBar';
import { DriverCard } from '../components/DriverCard';
import { Text } from 'react-native-svg';

export const FavoriteDriversScreen: React.FC = () => {
  // const { drivers, searchQuery, setSearchQuery, setSelectedFilter } = useDriverStore();

  // const filteredDrivers = drivers.filter((driver) =>
  //   driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   driver.plate.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  // const filteredDrivers=[];

  return (
    <View style={styles.container}>
      <Text>FAvoriteeeeeee</Text>
      {/* <FlatList
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
      /> */}
    </View>
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