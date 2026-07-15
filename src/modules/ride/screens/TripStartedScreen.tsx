import React, { useEffect, useMemo, useState } from 'react';
import { View, StatusBar, Text } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import {BaseBottomSheet} from '../../../shared/components/BaseBottomSheet';
import Header from '../../../shared/components/SubHeader';
import { createStyles } from '../styles/trip.styles';
import { useTranslation } from 'react-i18next';
import { TripSummaryGrid } from '../components/TripStartedScreen/TripSummaryGrid';
import {DriverInfoCard} from '../components/TripStartedScreen/DriverInfoCard';

export default function TripStartedScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['trip', 'common']);

  const snapPoints = useMemo(() => ['30%', '70%'], []);  

  return (
    <View style={styles.container}>
      <Header title={t('trackYourTrip')} onBackPress={() => {}} />

      <BaseBottomSheet 
        isVisible={true}
        snapPoints={snapPoints}
        index={1}
      >
        <StatusBar translucent backgroundColor="transparent" />
        <Text style={styles.tripStartedMessage}>Your trip has started!</Text>
        {/* Driver Card */}
        <DriverInfoCard 
          name="David" 
          rating="4.9" 
          car="Black Toyota Camry" 
          plate="ABC-1234" 
          styles={styles} 
        />

        {/* Title */}
        <Text style={styles.summaryTitle}>Pre-trip Summary</Text>
        <Text style={styles.disclaimerText}>Date: {new Date().toLocaleDateString()}</Text>
        {/* Summary Grid */}
        <TripSummaryGrid styles={styles} />

        {/* Subtotal & Payment */}
        <View style={styles.footerRow}>
          <View>
            <Text style={styles.subtotalLabel}>Subtotal</Text>
            <Text style={styles.subtotalValue}>$24.50</Text>
          </View>
          <View style={styles.paymentMethod}>
            <Text>**** 4242</Text>
          </View>
        </View>
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>Final price may vary based on actual route and traffic conditions.</Text>
        </View>
      </BaseBottomSheet>
    </View>
  );
}