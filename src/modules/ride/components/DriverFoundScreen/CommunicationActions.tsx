import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import type { ThemeColors } from '../../../../core/theme/theme.types';
import type { createStyles } from '../../styles/driver.styles';

import PhoneNumberIcon from '../../../../assets/svg/contact/call.svg';
import MessageIcon from '../../../../assets/svg/contact/chat.svg';
import { Linking } from 'react-native';
import { callPhoneNumber, messagePhoneNumber } from '../../utils/conmmunications';

type CommunicationActionsProps = {
  styles: ReturnType<typeof createStyles>;
  colors: ThemeColors;
  driver_number: string;
};

export default function CommunicationActions({ styles, colors, driver_number }: CommunicationActionsProps) {
  return (
    <View style={styles.communicationRow}>
      <TouchableOpacity style={styles.iconButton} onPress={() => callPhoneNumber(driver_number)}>
        <PhoneNumberIcon fill={colors.textPrimary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton} onPress={() => messagePhoneNumber(driver_number)}>
        <MessageIcon fill={colors.textPrimary} />
      </TouchableOpacity>

    </View>
  );
}