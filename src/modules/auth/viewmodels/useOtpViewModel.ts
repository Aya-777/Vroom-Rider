import { useState, useRef } from 'react';
import { TextInput } from 'react-native';

export function useOtpViewModel(navigation: any, route: any) {
    const [code, setCode] = useState<string[]>(['', '', '', '', '', '']);
    const [activeCodeIndex, setActiveCodeIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const inputRefs = useRef<TextInput[]>([]);

    const rawPhoneNumber = (route?.params as any)?.phoneNumber || "09********";

    const getMaskedPhoneNumber = (): string => {
        if (!rawPhoneNumber || rawPhoneNumber.length < 5) return rawPhoneNumber;
        const firstTwo = rawPhoneNumber.slice(0, 2);
        const lastThree = rawPhoneNumber.slice(-3);
        const maskedLength = rawPhoneNumber.length - 5;
        const stars = '*'.repeat(maskedLength > 0 ? maskedLength : 5);
        return `${firstTwo}${stars}${lastThree}`;
    };

    const handleTextChange = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text.slice(-1);
        setCode(newCode);

        if (text && index < 5) {
            inputRefs.current[index + 1]?.focus();
            setActiveCodeIndex(index + 1);
        }
    };

    const handleKeyPress = (e: any, index: number) => {

        if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
            setActiveCodeIndex(index - 1);
        }
    };

    const handleVerifyCode = async () => {
        const fullCode = code.join('');
        if (fullCode.length < 6) return;

        try {
            setIsLoading(true);
            console.log("Verifying Code:", fullCode);

            await new Promise<void>((resolve) => {
                setTimeout(() => resolve(), 1000);
            });

            navigation.navigate('ResetPassword');
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = () => {
        console.log("Resending OTP code to:", rawPhoneNumber);

        setCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        setActiveCodeIndex(0);
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return {
        code,
        activeCodeIndex,
        isLoading,
        inputRefs,
        maskedPhoneNumber: getMaskedPhoneNumber(),
        handleTextChange,
        handleKeyPress,
        handleVerifyCode,
        handleResendCode,
        handleBack,
        setActiveCodeIndex,
    };
}