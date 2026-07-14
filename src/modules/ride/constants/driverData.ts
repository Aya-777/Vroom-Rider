import { useTranslation } from "react-i18next";

const {t} = useTranslation('driverArrived');
export const driverMock = {
  id: '1',
  name: 'Alex Driver',
  avatar:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  onTheWayMessage: t("driverOnHisWay"),
  arrivedMessage: t("driverArrived"),
  pinMessage: t("enterPin"),
  car: {
    model: 'Mercedes-Benz S-Class',
    color: 'Silver',
    plate: 'NY-772-DX',
  },
};