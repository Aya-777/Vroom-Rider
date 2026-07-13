import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111F55',
  },

  header: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 14,
    backgroundColor: '#111F55',
  },

  avatarContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
  },

  avatar: {
    width: '100%',
    height: '100%',
  },

  avatarPlaceholder: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },

  userInfo: {
    justifyContent: 'center',
  },

  userName: {
    fontFamily: 'Lora-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
  },

  rating: {
    fontFamily: 'Lora-Regular',
    fontSize: 12,
    color: '#FFFFFF',
  },

  content: {
    flex: 1,
    backgroundColor: '#F2EDFF',
  },

  menu: {
    paddingTop: 14,
    paddingHorizontal: 20,
  },

  menuItem: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRadius: 8,
    paddingHorizontal: 2,
  },

  menuItemPressed: {
    opacity: 0.6,
  },

  menuIcon: {
    color: '#93A1BF',
  },

  menuLabel: {
    fontFamily: 'Lora-Regular',
    fontSize: 14,
    color: '#1E2749',
  },

  footer: {
    marginTop: 'auto',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  version: {
    fontFamily: 'Lora-Regular',
    fontSize: 10,
    color: '#9CA7C0',
  },
});