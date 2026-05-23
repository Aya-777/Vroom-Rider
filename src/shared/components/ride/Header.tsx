import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../../core/theme';

import ArrowLeft from '../../../assets/svg/arrows/arrowLeft.svg';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBackPress }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <ArrowLeft fill={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 30,
    backgroundColor: Colors.light,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1C29',
    marginLeft: 24,
  },
});

export default Header;