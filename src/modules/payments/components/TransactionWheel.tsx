import React, { useMemo, useRef, useState } from 'react';
import { Animated, PanResponder, Text, View } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import LinearBg from '../../../shared/components/LinearBg';
import { WalletTransaction } from '../types/payments.types';
import { createStyles } from '../styles/wallet.styles';

type Props = { transactions: WalletTransaction[] };

export default function TransactionWheel({ transactions }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [activeIndex, setActiveIndex] = useState(0);
  const offset = useRef(new Animated.Value(0)).current;
  const ordered = useMemo(() => transactions ?? [], [transactions]);
  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 8,
    onPanResponderMove: (_, gesture) => offset.setValue(gesture.dy),
    onPanResponderRelease: (_, gesture) => {
      if (Math.abs(gesture.dy) < 35 || ordered.length < 2) {
        Animated.spring(offset, { toValue: 0, useNativeDriver: true }).start();
        return;
      }
      const next = gesture.dy < 0
        ? (activeIndex + 1) % ordered.length
        : (activeIndex - 1 + ordered.length) % ordered.length;
      Animated.timing(offset, { toValue: gesture.dy < 0 ? -90 : 90, duration: 140, useNativeDriver: true }).start(() => {
        setActiveIndex(next);
        offset.setValue(0);
      });
    },
  })).current;

  if (!ordered.length) return null;
  const visible = [0, 1, 2].map((position) => ordered[(activeIndex + position) % ordered.length]).filter(Boolean);
  return (
    <View style={styles.wheel} {...panResponder.panHandlers}>
      {visible.map((item, position) => {
        const translateY = offset.interpolate({ inputRange: [-90, 0, 90], outputRange: [position * 18 - 12, position * 18, position * 18 + 12], extrapolate: 'clamp' });
        const scale = 1 - position * 0.045;
        const opacity = 1 - position * 0.18;
        const positive = item.type === 'topup' || item.type === 'refund';
        return (
          <Animated.View key={`${item.id}-${position}`} style={[styles.transactionCard, { transform: [{ translateY }, { scale }], opacity, zIndex: 3 - position }]}>
            <LinearBg colors={[colors.surfaceAccent, colors.surface]} style={styles.transactionGradient}>
              <View style={styles.transactionTopRow}>
                <Text style={styles.transactionType}>{item.type.replace('_', ' ')}</Text>
                <Text style={[styles.transactionAmount, positive ? styles.credit : styles.debit]}>{positive ? '+' : '-'}{Math.abs(item.amount).toFixed(2)}</Text>
              </View>
              <Text numberOfLines={1} style={styles.transactionDescription}>{item.description || 'â€”'}</Text>
              <Text style={styles.transactionDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
            </LinearBg>
          </Animated.View>
        );
      })}
    </View>
  );
}