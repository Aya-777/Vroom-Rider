import { useMemo, useRef, useState } from 'react';
import { Animated, PanResponder, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../core/theme/useTheme';
import LinearBg from '../../../shared/components/LinearBg';
import { WalletTransaction } from '../types/payments.types';
import { createStyles } from '../styles/wallet.styles';

type Props = { transactions: WalletTransaction[] };

const normalizeType = (type: string): WalletTransaction['type'] => {
  if (type === 'top_up') return 'topup';
  if (type === 'trip-payment') return 'trip_payment';
  return type as WalletTransaction['type'];
};

const cleanText = (value?: string) => {
  if (!value) return '';
  return value.replace(/Ã¢(?:â€šÂ¬|â‚¬|[\x80-\xBF])?/g, '').replace(/ï¿½/g, '').trim();
};

export default function TransactionWheel({ transactions }: Props) {
  const { t } = useTranslation('payments');
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [activeIndex, setActiveIndex] = useState(0);
  const offset = useRef(new Animated.Value(0)).current;
  const activeIndexRef = useRef(0);
  const ordered = useMemo(() => transactions ?? [], [transactions]);

  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 8 && Math.abs(gesture.dy) > Math.abs(gesture.dx),
    onMoveShouldSetPanResponderCapture: (_, gesture) => Math.abs(gesture.dy) > 8 && Math.abs(gesture.dy) > Math.abs(gesture.dx),
    onPanResponderMove: (_, gesture) => offset.setValue(gesture.dy),
    onPanResponderTerminationRequest: () => false,
    onShouldBlockNativeResponder: () => true,
    onPanResponderRelease: (_, gesture) => {
      if (Math.abs(gesture.dy) < 35 || ordered.length < 2) {
        Animated.spring(offset, { toValue: 0, useNativeDriver: true, tension: 70, friction: 9 }).start();
        return;
      }
      const current = activeIndexRef.current;
      const next = gesture.dy < 0
        ? (current + 1) % ordered.length
        : (current - 1 + ordered.length) % ordered.length;
      Animated.timing(offset, {
        toValue: gesture.dy < 0 ? -90 : 90,
        duration: 260,
        useNativeDriver: true,
      }).start(() => {
        activeIndexRef.current = next;
        setActiveIndex(next);
        offset.setValue(0);
      });
    },
  })).current;

  if (!ordered.length) return null;
  const visible = [0, 1, 2]
    .map((position) => ordered[(activeIndex + position) % ordered.length])
    .filter(Boolean);

  return (
    <View style={styles.wheel} {...panResponder.panHandlers}>
      {visible.map((item, position) => {
        const type = normalizeType(String(item.type));
        const positive = type === 'topup' || type === 'refund';
        const description = cleanText(item.description) || t(positive ? 'wallet.types.topup' : 'wallet.types.trip_payment');
        const baseY = position * 34;
        const translateY = offset.interpolate({
          inputRange: [-90, 0, 90],
          outputRange: [position === 0 ? -180 : baseY - 34, baseY, position === 0 ? 180 : baseY + 34],
          extrapolate: 'clamp',
        });
        const scale = offset.interpolate({
          inputRange: [-90, 0, 90],
          outputRange: position === 0 ? [0.88, 1, 0.88] : position === 1 ? [1, 0.95, 0.9] : [0.95, 0.9, 0.86],
          extrapolate: 'clamp',
        });
        const opacity = offset.interpolate({
          inputRange: [-90, 0, 90],
          outputRange: position === 0 ? [0, 1, 0] : position === 1 ? [1, 0.82, 0.55] : [0.82, 0.62, 0.38],
          extrapolate: 'clamp',
        });
        const rotateX = offset.interpolate({
          inputRange: [-90, 0, 90],
          outputRange: position === 0 ? ['-14deg', '0deg', '14deg'] : ['0deg', '0deg', '0deg'],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`${item.id}-${position}`}
            style={[styles.transactionCard, { transform: [{ perspective: 700 }, { translateY }, { rotateX }, { scale }], opacity, zIndex: 3 - position }]}
          >
            <LinearBg colors={[colors.surfaceAccent, colors.surface]} style={styles.transactionGradient}>
              <View style={styles.transactionTopRow}>
                <Text style={styles.transactionType}>{t(`wallet.types.${type}`)}</Text>
                <Text style={[styles.transactionAmount, positive ? styles.credit : styles.debit]}>{positive ? '+' : '-'}{Math.abs(item.amount).toFixed(2)}</Text>
              </View>
              <Text numberOfLines={1} style={styles.transactionDescription}>{description}</Text>
              <Text style={styles.transactionDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
            </LinearBg>
          </Animated.View>
        );
      })}
    </View>
  );
}