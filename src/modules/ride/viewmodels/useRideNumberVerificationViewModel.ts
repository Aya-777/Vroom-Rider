import { useOtpFlow } from '../../../shared/hooks/useOtpFlow';
import { parseWaitSecondsError } from '../../../shared/utils/parseWaitSecondsError';
import { useRideRepository } from '../repositories/rideRepositories';
import { useRideStore } from '../store/useRideStore';

export const useRideNumberVerificationViewModel = (navigation: any, route: any) => {
    const phoneNumber = route.params?.phoneNumber || '';
    const {setRideOtpVerified} = useRideStore();

    const verifyMutation = useRideRepository.useVerifyRideOtp();
    const resendMutation = useRideRepository.useResendRideOtp();

    const maskedPhoneNumber = phoneNumber ? phoneNumber.replace(/.(?=.{3})/g, '*') : '';

    const otp = useOtpFlow({
        verifyOtp: async (code) => {
          const response = await verifyMutation.mutateAsync({ phone_number: phoneNumber, otp: code });
        },
        onSuccess: () => {
          setRideOtpVerified(true);
          navigation.goBack();
         },
    });

    const handleResend = async () => {
        try {
            await resendMutation.mutateAsync({ phone_number: phoneNumber });
            otp.resetCode();
        } catch (err: any) {
            const { message, waitSeconds } = parseWaitSecondsError(err);
            otp.setError(message);
            throw { ...err, waitSeconds };
        }
    };

    const handleBack = () => navigation.goBack();

    return {
        ...otp,
        maskedPhoneNumber,
        handleResend,
        handleBack,
    };
};