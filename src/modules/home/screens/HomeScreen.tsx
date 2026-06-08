import React from 'react';
import {
  ScrollView,
  View,
} from 'react-native';

import LinearBg from '../../../shared/components/LinearBg';
import SearchBar from '../../../shared/components/SearchBar';
import ForYouStar from '../../../assets/svg/home/ForYouStar.svg';

import ServiceCard from '../components/ServiceCard';
import DestinationCard from '../components/DestinationCard';
import SectionHeader from '../components/SectionHeader';

import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/home.styles';
import { useHomeViewModel } from '../viewmodels/useHomeViewModel';

import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';
import HeaderTopAppBar from '../components/HomeHeader';

export default function HomeScreen({
  navigation,
}: HomeStackScreenProps<'HomeScreen'>) {

  const { colors } = useTheme();

  const styles = createStyles(colors);

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
      <View style={styles.container}>

        <HeaderTopAppBar />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          <SearchBar />
          <SectionHeader title="For you"
            icon={<ForYouStar width={20} height={20} />}
          />

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

      </View>
    </LinearBg >
  );
}