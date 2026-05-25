import { useState } from 'react';

export const useLoginViewModel = (navigation: any) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const togglePassword = () => setVisible(v => !v);

  const onLogin = () => {
    // هنا لاحقاً API call
    console.log({ phone, password });

    navigation.navigate('Home');
  };

  return {
    phone,
    password,
    visible,
    setPhone,
    setPassword,
    togglePassword,
    onLogin,
  };
};