import React, { useEffect, useMemo, useState } from 'react';
import { View, StatusBar, Text } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import {BaseBottomSheet} from '../../../shared/components/BaseBottomSheet';
import Header from '../../../shared/components/SubHeader';
import { createStyles } from '../styles/trip.styles';
import { useTranslation } from 'react-i18next';
import { TripSummaryGrid } from '../components/TripStartedScreen/TripSummaryGrid';
import {DriverInfoCard} from '../components/TripStartedScreen/DriverInfoCard';
import { useTripStartedViewModel } from '../viewmodels/useTripStartedViewModel'; 

export default function TripStartedScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['rideStarted', 'common']);

  const vm = useTripStartedViewModel();

  const snapPoints = useMemo(() => ['30%', '70%'], []);  

  return (
    <View style={styles.container}>
      <Header title={t('trackYourTrip')} onBackPress={vm.handleBackPress} />

      <BaseBottomSheet 
        isVisible={true}
        snapPoints={snapPoints}
        index={1}
      >
        <StatusBar translucent backgroundColor="transparent" />
        <Text style={styles.tripStartedMessage}>{t('tripStarted')}</Text>
        {/* Driver Card */}
        <DriverInfoCard 
          name="David" 
          rating="4.9" 
          car="Black Toyota Camry" 
          plate="ABC-1234" 
          styles={styles} 
        />

        {/* Title */}
        <Text style={styles.summaryTitle}>{t('preTripSummary')}</Text>
        <Text style={styles.disclaimerText}>{t('common:date')}: {new Date().toLocaleDateString()}</Text>
        {/* Summary Grid */}
        <TripSummaryGrid />

        {/* Subtotal & Payment */}
        <View style={styles.footerRow}>
          <View>
            <Text style={styles.subtotalLabel}>{t('subtotal')}</Text>
            <Text style={styles.subtotalValue}>$24.50</Text>
          </View>
          <View style={styles.paymentMethod}>
            <Text style={styles.paymentText}>{t('common:cash')}</Text>
          </View>
        </View>
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>{t('finalPriceDisclaimer')}</Text>
        </View>
      </BaseBottomSheet>
    </View>
  );
}