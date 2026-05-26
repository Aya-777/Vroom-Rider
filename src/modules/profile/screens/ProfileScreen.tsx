import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Colors , Typography, Spacing, Radius, Shadows} from '../../../core/theme';
import HistoryIcon from '../../../assets/svg/history.svg';
import NotificationsIcon from '../../../assets/svg/notifications.svg';
import ArrowIcon from '../../../assets/svg/arrows/arrow.svg';
import EditIcon from '../../../assets/svg/edit.svg';
import CallIcon from '../../../assets/svg/call.svg'
import MailIcon from '../../../assets/svg/mail.svg';
import PinIcon from '../../../assets/svg/pin.svg';
import StarIcon from '../../../assets/svg/star.svg';
import EmergencyContactIcon from '../../../assets/svg/emergencyContact.svg';
import SettingsIcon from '../../../assets/svg/settings.svg';
import PrivacyIcon from '../../../assets/svg/privacy.svg';
import SafetyIcon from '../../../assets/svg/safety.svg';
import HelpIcon from '../../../assets/svg/questionMark.svg';
import InfoIcon from '../../../assets/svg/info.svg'
import LogoutIcon from '../../../assets/svg/logout.svg';
import LinearBg from '../../../shared/components/LinearBg';
import { useAuthActions } from '../../auth/authStore';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const { logout } = useAuthActions();
  
  return (
    
      <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            
            {/* --- Header Profile Card --- */}
            <View style={styles.profileCard}>
              {/* Edit Icon Minimalist Placeholder */}
              <TouchableOpacity style={styles.editButton}>
                <EditIcon />
              </TouchableOpacity>
              
              <View style={styles.avatarContainer}>
                <View style={styles.avatarPlaceholder}>
                  {/* Pure CSS User Icon Shape */}
                  <View style={styles.avatarHead} />
                  <View style={styles.avatarBody} />
                </View>
              </View>

              <View style={styles.verticalDivider} >
              <View style={styles.dotIndicator} />
              </View>

              <View style={styles.profileInfo}>
                <Text style={styles.userName}>Alex Driver</Text>
                <View style={styles.iconText}>
                  <CallIcon style={styles.profileIcon} width={18} height={18}/>
                  <Text style={styles.infoText}>
                    +1 (555) 012-3456
                  </Text>
                </View>
                <View style={styles.iconText}>
                  <MailIcon width={18} height={18} style={styles.profileIcon} />
                  <Text style={styles.infoText}>
                    alex.driver@vroom.io
                  </Text>
                </View>
                <View style={styles.iconText}>
                  <PinIcon width={18} height={18} style={styles.profileIcon} />
                  <Text style={styles.infoText}>
                    Damascus, Jaramana
                  </Text>
                </View>
              </View>
            </View>

            {/* --- Grid Menu Cards --- */}
            <View style={styles.gridContainer}>
              <LinearBg 
                colors={[Colors.light, Colors.surface]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.gridCard}>
                <TouchableOpacity >
                  <View style={styles.iconCircle}>
                    <HistoryIcon width={30} height={30} fill="#10B981" />
                  </View>
                  <Text style={styles.gridText}>Ride History</Text>
                </TouchableOpacity>
              </LinearBg>

              <LinearBg 
                colors={[Colors.light, Colors.surface]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.gridCard}>
                <TouchableOpacity>
                  <View style={styles.iconCircle}>
                    <NotificationsIcon width={30} height={30} fill="#F97316" />
                  </View>
                  <Text style={styles.gridText}>Notifications</Text>
                </TouchableOpacity>
                </LinearBg>

              <LinearBg 
                colors={[Colors.light, Colors.surface]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.gridCard}>
                <TouchableOpacity>
                  <View style={styles.iconCircle}>
                    <StarIcon fill={"#FB923C"} width={30} height={30}/>
                  </View>
                  <Text style={styles.gridText}>Favorite Drivers</Text>
                </TouchableOpacity>
              </LinearBg>

              <LinearBg 
                colors={[Colors.light, Colors.surface]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.gridCard}>
                <TouchableOpacity>
                  <View style={styles.iconCircle}>
                    <SafetyIcon width={30} height={30} fill={"#EF4444"} />
                  </View>
                  <Text style={styles.gridText}>Safety</Text>
                </TouchableOpacity>
              </LinearBg>
            </View>

            {/* --- Become a Driver Promo Banner --- */}
            <TouchableOpacity style={styles.promoBanner}>
              <View style={styles.promoLeft}>
                <Text style={styles.promoTitle}>Become a Driver</Text>
                <Text style={styles.promoSubtitle}>Earn on your own schedule</Text>
                <Text style={styles.promoLink}>Learn more</Text>
              </View>
              <View style={styles.promoRight}>
                {/* Pure Component Car Shape */} 
                <View style={styles.carBodyTop} />
                <View style={styles.carBodyBottom}>
                  <View style={styles.carWheel} />
                  <View style={styles.carWheel} />
                </View>
                
              </View>
            </TouchableOpacity>

            {/* --- List Options --- */}
            <View style={styles.listContainer}>
              <ListItem icon={<SettingsIcon fill={'#312E81'}/>} title="Settings" isLast={false} />
              <ListItem icon={<PrivacyIcon fill={'#312E81'}/>} title="Privacy & Security" isLast={false} />
              <ListItem icon={<EmergencyContactIcon fill={'#312E81'}/>} title="Emergency Contact" isLast={false} />
              <ListItem icon={<HelpIcon fill={'#312E81'}/>} title="Help Center" isLast={false} />
              <ListItem icon={<StarIcon fill={'#312E81'}/>} title="Favorite Locations" isLast={false} />
              <ListItem icon={<InfoIcon fill={'#312E81'}/>} title="About Us" isLast={false} />
              <ListItem icon={<MailIcon fill={'#312E81'}/>} title="Contact Us" isLast={true} />
            </View>

            {/* --- Logout Button --- */}
            <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
                <LogoutIcon fill={Colors.error}/>
              <Text style={styles.logoutText}>
                Logout
              </Text>
            </TouchableOpacity>
          </ScrollView>
      </SafeAreaView>
  );
}

// Reusable List Row Component
type ListItemProps = {
  icon: any;
  title: string;
  isLast?: boolean;
};

const ListItem: React.FC<ListItemProps> = ({ icon, title, isLast }) => (
  <TouchableOpacity style={[styles.listItem, isLast && { borderBottomWidth: 0 }]}>
    <View style={styles.listLeft}>
      <Text style={styles.listIconText}>{icon}</Text>
      <Text style={styles.listTitle}>{title}</Text>
    </View>
    <ArrowIcon />
  </TouchableOpacity>
);

/* --- Styling --- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Spacing.xl,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: 150,
  },
  // Header Profile Card
  profileCard: {
    backgroundColor: '#0F1E52',
    opacity: 0.9,
    borderRadius: Radius.md,
    padding: Spacing.mmd,
    paddingBottom: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: Spacing.mmd,
    ...Shadows.medium,
    overflow: 'visible',
  },
  editButton: {
    position: 'absolute',
    top: 8,
    left: 10,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarPlaceholder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#E6E5FF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarHead: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#B4B2F0',
    marginBottom: 4,
  },
  avatarBody: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#B4B2F0',
  },
  dotIndicator: {
    position: 'absolute',
    left: -3,
    top: '45%',
    width: 8,
    height: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.background,
  },
  verticalDivider: {
    width: 1,
    height: '80%',
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginHorizontal: Spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    color: Colors.background,
    ...Typography.h2,
  },
  infoText: {
    color: '#FFF',
    ...Typography.caption,
    opacity: 0.9,
    marginLeft: 4,
  },
  iconText:{
    display: 'flex',
    flexDirection: 'row',
    alignContent :'center',
  },
  profileIcon:{
    marginTop:2
  },
  // Grid
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridCard: {
    backgroundColor: "#EBE9FE",
    width: (width - 44) / 2,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...Shadows.small,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.smm,
    position: 'relative',
  },
  emojiIcon: {
    fontSize: 18,
  },
  gridText: {
    color: Colors.textPrimary,
    ...Typography.boldBody
  },
  // Pure Styled Car Component Banner
  promoBanner: {
    backgroundColor: "#EBE9FE",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    ...Shadows.medium,
    height: "14%"
  },
  promoLeft: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2A3B7C',
    fontFamily: 'serif',
  },
  promoSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginVertical: 4,
  },
  promoLink: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2A3B7C',
    textDecorationLine: 'underline',
  },
  promoRight: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
    marginRight: 10,
  },
  carBodyTop: {
    width: 40,
    height: 26,
    backgroundColor: '#9F9DF3',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignSelf: 'center',
  },
  carBodyBottom: {
    width: 74,
    height: 22,
    backgroundColor: '#9F9DF3',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  carWheel: {
    width: 10,
    height: 10,
    borderRadius: Radius.sm,
    backgroundColor: Colors.primary,
    marginBottom: -3,
  },
  // List Group Styling
  listContainer: {
    // backgroundColor: 'red',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Shadows.small,
    padding: 14,
    marginBottom: Spacing.xs,
    marginLeft:-10,
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.sm,
    alignSelf: 'stretch',
  },
  listLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listIconText: {
    ...Typography.body,
    width: 24,
    textAlign: 'center',
  },
  listTitle: {
    ...Typography.body,
    marginLeft: 12,
    color: '#312E81',
  },
  arrowRight: {
    fontSize: 22,
    color: Colors.textPrimary,
    fontWeight: '300',
  },
  // Logout Button
  logoutButton: {
    backgroundColor: '#FFF1F1',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    flexDirection:'row',
  },
  logoutText: {
    color: Colors.error,
    ...Typography.boldBody,
  },
});
