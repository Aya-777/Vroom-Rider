import { useState } from 'react';
import { useAuthRepository } from '../repositories/authRepository';

export const useSignupViewModel = (onSuccess: (phone: string) => void) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [uiError, setUiError] = useState<string | null>(null);

  const signupMutation = useAuthRepository.useSignup();

  const firstNameError =
    firstName.length > 0 && firstName.length < 2 ? 'tooShort' : undefined;

  const lastNameError =
    lastName.length > 0 && lastName.length < 2 ? 'tooShort' : undefined;

  const confirmPasswordError =
    confirmPassword.length > 0 && confirmPassword !== password
      ? 'passwordMismatch'
      : undefined;

  const handleSignup = () => {
    setUiError(null);

    if (!firstName || !lastName || !phoneNumber || !password || !confirmPassword) {
      setUiError('Please fill in all required fields.');
      return;
    }

    if (firstNameError || lastNameError || confirmPasswordError) {
      return;
    }

    signupMutation.mutate(
      {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        password,
        confirm_password: confirmPassword,
        profile_image: profileImage,
      },
      {
        onSuccess: () => {
          onSuccess(phoneNumber);
        },
        onError: (err: any) => {
          console.log('Status:', err.response?.status);
          console.log('Data:', err.response?.data);
          console.log('Message:', err.message);

          setUiError(err.response?.data?.message || err.message);
        },
      }
    );
  };

  return {
    firstName, setFirstName,
    lastName, setLastName,
    phoneNumber, setPhoneNumber,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    profileImage, setProfileImage,
    error: uiError,
    firstNameError,
    lastNameError,
    confirmPasswordError,
    isLoading: signupMutation.isPending,
    handleSignup,
  };
};