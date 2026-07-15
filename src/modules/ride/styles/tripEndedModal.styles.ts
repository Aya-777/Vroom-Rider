import { StyleSheet } from 'react-native';
import { Typography } from '../../../core/theme/tokens';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    width: '94%',
    backgroundColor: '#111522',
    borderRadius: 28,
    paddingHorizontal: 26,
    paddingVertical: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#E7DFFF',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 13,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 6,
  },

  divider: {
    height: 1,
    backgroundColor: '#343746',
    marginVertical: 12,
  },

  total: {
    ...Typography.h1,
    color: '#E7DFFF',
    textAlign: 'center',
  },

  content: {
    flexDirection: 'row',
    minHeight: 175,
    marginBottom: 16,
  },

  metricsColumn: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 12,
  },

  paymentColumn: {
    flex: 1,
    justifyContent: 'center',
    gap: 18,
    paddingLeft: 12,
  },

  verticalDivider: {
    width: 2,
    backgroundColor: '#E7DFFF',
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  metricLabel: {
    ...Typography.mediumCaption,
    color: '#E7DFFF',
  },
  
  label: {
    ...Typography.mediumCaption,
    color: '#E7DFFF',
  },
  
  metricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    minWidth: 60,
    height: 30,
    // paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#222D63',
    marginBottom: 15,
  },

  valueText: {
    fontSize: 12,
    color: '#E7DFFF',
  },

  tipInput: {
  width: 60,
  height: 30,
  borderRadius: 20,
  backgroundColor: '#273469',
  paddingHorizontal: 10,
  justifyContent: 'center',
  marginBottom: -22,
},

tipText: {
  color: '#E7DFFF',
  fontSize: 12,
  textAlign: 'center',
  paddingVertical: -20,
},
});