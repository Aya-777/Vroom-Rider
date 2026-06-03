// import React from 'react';
// import { View, Text } from 'react-native';

// import { useTheme } from '../../../core/theme/useTheme';
// import { createStyles } from '../styles/profile.styles';

// export default function PromoBanner() {
//   const { colors } = useTheme();
//   const styles = createStyles(colors);

//   return (
//     <View
//       style={[
//         styles.promoBanner,
//         { borderColor: colors.primary },
//       ]}
//     >
//       <Text
//         style={[
//           styles.promoTitle,
//           { color: colors.textPrimary },
//         ]}
//       >
//         Become a Driver
//       </Text>

//       <Text
//         style={[
//           styles.promoSubtitle,
//           { color: colors.textMuted },
//         ]}
//       >
//         Earn on your own schedule
//       </Text>

//       <Text
//         style={[
//           styles.promoLink,
//           { color: colors.primary },
//         ]}
//       >
//         Learn more
//       </Text>
//     </View>
//   );
// }

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/profile.styles';

export default function PromoBanner() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <TouchableOpacity
      style={[
        styles.promoBanner,
        {
          borderColor: colors.primary,
        },
      ]}
    >
      {/* Left Side */}
      <View style={styles.promoLeft}>
        <Text style={styles.promoTitle}>
          Become a Driver
        </Text>

        <Text style={styles.promoSubtitle}>
          Earn on your own schedule
        </Text>

        <Text style={styles.promoLink}>
          Learn more
        </Text>
      </View>

      {/* Right Side Car */}
      <View style={styles.promoRight}>
        <View style={styles.carBodyTop} />

        <View style={styles.carBodyBottom}>
          <View style={styles.carWheel} />
          <View style={styles.carWheel} />
        </View>
      </View>
    </TouchableOpacity>
  );
}