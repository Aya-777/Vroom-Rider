// Arrows
import ArrowIcon from '../../../assets/svg/arrows/arrow.svg';
import ArrowLeftIcon from '../../../assets/svg/arrows/arrowLeft.svg';
import ArrowUpIcon from '../../../assets/svg/arrows/arrowUp.svg';
import DropdownArrowIcon from '../../../assets/svg/arrows/dropdownArrow.svg';

// Common
import CameraIcon from '../../../assets/svg/common/camera.svg';
import CheckIcon from '../../../assets/svg/common/check.svg';
import EditIcon from '../../../assets/svg/common/edit.svg';
import HistoryIcon from '../../../assets/svg/common/history.svg';
import HomeIcon from '../../../assets/svg/common/home.svg';
import InfoIcon from '../../../assets/svg/common/info.svg';
import MenuIcon from '../../../assets/svg/common/menu.svg';
import MyLocationIcon from '../../../assets/svg/common/myLocation.svg';
import NotificationsIcon from '../../../assets/svg/common/notifications.svg';
import PasswordIcon from '../../../assets/svg/common/password.svg';
import PinIcon from '../../../assets/svg/common/pin.svg';
import RideIcon from '../../../assets/svg/common/ride.svg';
import ScheduleIcon from '../../../assets/svg/common/schedule.svg';
import SearchIcon from '../../../assets/svg/common/search.svg';
import StarIcon from '../../../assets/svg/common/star.svg';
import TrashIcon from '../../../assets/svg/common/trash.svg';
import VisibilityOffIcon from '../../../assets/svg/common/visibilityOff.svg';
import VisibilityOnIcon from '../../../assets/svg/common/visibilityOn.svg';
import WorkIcon from '../../../assets/svg/common/work.svg';
import SaveIcon from '../../../assets/svg/common/save.svg'

// Contact
import CallIcon from '../../../assets/svg/contact/call.svg';
import ChatIcon from '../../../assets/svg/contact/chat.svg';
import EmergencyContactIcon from '../../../assets/svg/contact/emergencyContact.svg';
import MailIcon from '../../../assets/svg/contact/mail.svg';
import WhatsappIcon from '../../../assets/svg/contact/whatsapp.svg';

// Home
import ForYouStarIcon from '../../../assets/svg/home/ForYouStar.svg';
import ReserveIcon from '../../../assets/svg/home/reserve.svg';

// Payment
import CashIcon from '../../../assets/svg/payment/cash.svg';
import CreditCardIcon from '../../../assets/svg/payment/creditcard.svg';
import PriceIcon from '../../../assets/svg/payment/price.svg';

// Profile
import HelpIcon from '../../../assets/svg/profile/help.svg';
import LogoutIcon from '../../../assets/svg/profile/logout.svg';
import PrivacyIcon from '../../../assets/svg/profile/privacy.svg';
import ProfileIcon from '../../../assets/svg/profile/profile.svg';
import SafetyIcon from '../../../assets/svg/profile/safety.svg';
import SettingsIcon from '../../../assets/svg/profile/settings.svg';

// Ride
import FiltersIcon from '../../../assets/svg/ride/filters.svg';

export const ICON_MAP = {
  // Arrows
  arrow: ArrowIcon,
  arrowLeft: ArrowLeftIcon,
  arrowUp: ArrowUpIcon,
  dropdownArrow: DropdownArrowIcon,

  // Common
  camera: CameraIcon,
  check: CheckIcon,
  edit: EditIcon,
  history: HistoryIcon,
  home: HomeIcon,
  info: InfoIcon,
  menu: MenuIcon,
  myLocation: MyLocationIcon,
  notifications: NotificationsIcon,
  password: PasswordIcon,
  pin: PinIcon,
  ride: RideIcon,
  schedule: ScheduleIcon,
  search: SearchIcon,
  star: StarIcon,
  trash: TrashIcon,
  visibilityOff: VisibilityOffIcon,
  visibilityOn: VisibilityOnIcon,
  work: WorkIcon,
  save: SaveIcon,

  // Contact
  call: CallIcon,
  chat: ChatIcon,
  emergencyContact: EmergencyContactIcon,
  mail: MailIcon,
  whatsapp: WhatsappIcon,

  // Home
  forYouStar: ForYouStarIcon,
  reserve: ReserveIcon,

  // Payment
  cash: CashIcon,
  creditCard: CreditCardIcon,
  price: PriceIcon,

  // Profile
  help: HelpIcon,
  logout: LogoutIcon,
  privacy: PrivacyIcon,
  profile: ProfileIcon,
  safety: SafetyIcon,
  settings: SettingsIcon,

  // Ride
  filters: FiltersIcon,
} as const;

export type IconId = keyof typeof ICON_MAP;

export const AVAILABLE_ICONS: { id: IconId }[] = Object.keys(
  ICON_MAP,
).map(id => ({ id: id as IconId }));