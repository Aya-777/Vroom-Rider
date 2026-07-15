import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Input from '../../../../shared/components/Input';
import {styles} from '../../styles/tripEndedModal.styles'


export default function PaymentSummary() {
  
  const [tip, setTip] = useState('0');
  
  return (
    <View style={styles.paymentColumn}>

        <View style={styles.metricRow}>
          <Text style={styles.label} adjustsFontSizeToFit={true}>Add a tip?</Text>
          <View>
            <Input
              value={tip}
              inputBoxStyle={styles.tipInput}
              inputStyle={styles.tipText}
              keyboardType="decimal-pad"
              onChangeText={setTip}
            />
          </View>
        </View>


        <View style={styles.metricRow}>
          <Text style={styles.label} adjustsFontSizeToFit={true}>Delay:</Text>
          <Text style={styles.valueText} adjustsFontSizeToFit={true}>$2.50</Text>
        </View>
    </View>
  );
}