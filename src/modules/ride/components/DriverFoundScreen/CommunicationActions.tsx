import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import type { ThemeColors } from '../../../../core/theme/theme.types';
import type { createStyles } from '../../styles/driver.styles';

import PhoneNumberIcon from '../../../../assets/svg/contact/call.svg';
import MessageIcon from '../../../../assets/svg/contact/chat.svg';
import { Linking } from 'react-native';

type CommunicationActionsProps = {
  styles: ReturnType<typeof createStyles>;
  colors: ThemeColors;
  driver_number: string;
};

const callDriver = async (phoneNumber: string) => {
  const url = `tel:${phoneNumber}`;

  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  }
};

const messageDriver = async (phoneNumber: string) => {
  const url = `sms:${phoneNumber}`;

  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  }
};

export default function CommunicationActions({ styles, colors }: CommunicationActionsProps) {
  return (
    <View style={styles.communicationRow}>
      <TouchableOpacity style={styles.iconButton} onPress={() => callDriver}>
        <PhoneNumberIcon fill={colors.textPrimary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton}>
        <MessageIcon fill={colors.textPrimary} />
      </TouchableOpacity>

    </View>
  );
}