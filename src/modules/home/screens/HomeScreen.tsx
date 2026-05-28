import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';

import LinearBg from '../../../shared/components/LinearBg';
import SearchBar from '../../../shared/components/SearchBar';
import Header from '../../../shared/components/Header';

import ServiceCard from '../components/ServiceCard';
import DestinationCard from '../components/DestinationCard';
import SectionHeader from '../components/SectionHeader';

import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/home.styles';
import { useHomeViewModel } from '../viewmodels/useHomeViewModel';

import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';

export default function HomeScreen({
  navigation,
}: HomeStackScreenProps<'HomeScreen'>) {

  const { colors } = useTheme();

  const styles = createStyles();

  const {
    services,
    recentDestinations,
  } = useHomeViewModel(navigation);

  return (
    <LinearBg
      colors={[colors.backgroundSoft, colors.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>

        <Header />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          <SearchBar />

          <SectionHeader title="For you" />

          <View style={styles.gridContainer}>
            {services.map(service => (
              <ServiceCard
                key={service.id}
                {...service}
              />
            ))}
          </View>

          <SectionHeader
            title="Recent destinations"
            actionText="See all"
          />

          <View style={styles.destinationList}>
            {recentDestinations.map(destination => {
              const DestinationIcon = destination.icon;

              return (
                <DestinationCard
                  key={destination.id}
                  {...destination}
                  icon={<DestinationIcon />}
                />
              );
            })}
          </View>

        </ScrollView>

      </SafeAreaView>
    </LinearBg>
  );
}