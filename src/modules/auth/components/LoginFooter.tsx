import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import { Typography } from '../../../core/theme/tokens/typography';
import { useTranslation } from 'react-i18next';

const LoginFooter = () => {
  const { colors } = useTheme();
  const { t } = useTranslation('auth');

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.textSecondary }]}>
        {t("dontHaveAccount")}
        <Text style={[styles.link, { color: colors.primary }]}>
          {t("register")}
        </Text>
      </Text>

      <Text style={[styles.link, { color: colors.primary }]}>
        {t("forgotPassword")}
      </Text>
    </View>
  );
};

export default LoginFooter;

const styles = StyleSheet.create({
  container: {
    marginTop: -20,
    alignItems: 'center',
  },

  text: {
    ...Typography.caption,
  },

  link: {
    ...Typography.boldCaption,
  },
});