export const useHomeActions = (navigation: any) => {

  const handleRidePress = () => {
    navigation.navigate('SelectRide');
  };

  return {
    handleRidePress,
  };
};