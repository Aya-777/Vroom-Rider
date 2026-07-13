import React from 'react';
import {Text, View} from 'react-native';

import {styles} from '../styles/sidebar.styles';

type Props = {
  version: string;
};

const SidebarFooter = ({version}: Props) => {
  return (
    <View style={styles.footer}>
      <Text style={styles.version}>
        VROOM v{version}
      </Text>
    </View>
  );
};

export default SidebarFooter;