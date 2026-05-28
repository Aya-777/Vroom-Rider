import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import PhoneNumberIcon from '../../../assets/svg/phoneNumber.svg';
import MessageIcon from '../../../assets/svg/chat.svg';
import WhatsAppIcon from '../../../assets/svg/whatsapp.svg';

export default function CommunicationActions({ styles, colors }: any) {
  return (
    <View style={styles.communicationRow}>
      <TouchableOpacity style={styles.iconButton}>
        <PhoneNumberIcon fill={colors.textPrimary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton}>
        <MessageIcon fill={colors.textPrimary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton}>
        <WhatsAppIcon fill={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}