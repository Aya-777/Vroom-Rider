import { useState } from 'react';

export const useSignupViewModel = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const togglePassword = () =>
    setShowPassword(prev => !prev);

  const toggleConfirmPassword = () =>
    setShowConfirmPassword(prev => !prev);

  const handleSignup = async () => {
    console.log('Signup');
  };

  return {
    firstName,
    setFirstName,

    lastName,
    setLastName,

    phone,
    setPhone,

    password,
    setPassword,

    confirmPassword,
    setConfirmPassword,

    showPassword,
    togglePassword,

    showConfirmPassword,
    toggleConfirmPassword,

    handleSignup,
  };
};