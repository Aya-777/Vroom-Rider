// import { useState } from 'react';
// import { useAuthActions } from '../../../core/store/authStore';
// import { useAuthRepository } from '../repositories/authRepository';

// export function useLoginViewModel() {
//   const { login } = useAuthActions();
//   const { mutateAsync: loginMutate, isPending: isLoading } = useAuthRepository.useLogin();
//   const [uiError, setUiError] = useState<string | null>(null);

//   const handleLogin = async (phone: string, password: string) => {
//     setUiError(null);
//     try {
//       const response = await loginMutate({
//         phone_number: phone,
//         password: password,
//         expected_role: 'rider',
//       });

//       const token = response.data.access;
//       login(token);
//     } catch (error: any) {
//       console.error("Login failed", error);
//       setUiError(error.response?.data?.message || error.message);
//     }
//   };

//   return {
//     handleLogin,
//     isLoading,
//     error: uiError,
//   };
// }

import { useState } from 'react';
import { useAuthActions } from '../../../core/store/authStore';
import { useAuthRepository } from '../repositories/authRepository';

export function useLoginViewModel() {
  const { login } = useAuthActions();
  
  // 1. تعريف الـ States لقراءة الحقول وتحديثها فوراً أثناء الكتابة
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [uiError, setUiError] = useState<string | null>(null);

  // استخدام الريبوزيتوري
  const { mutateAsync: loginMutate, isPending: isLoading } = useAuthRepository.useLogin();

  // 2. تعديل دالة تسجيل الدخول بحيث تقرأ القيم مباشرة من الـ State المحلية دون الحاجة لتمريرها كبارامترات
  const handleLogin = async () => {
    setUiError(null);

    // التحقق الأولي من المدخلات
    if (!phone || !password) {
      setUiError('Please fill in all required fields.');
      return;
    }

    try {
      const response = await loginMutate({
        phone_number: phone, // تمرير القيمة من الـ State
        password: password,     // تمرير القيمة من الـ State
        expected_role: 'rider',
      });
      
      const token = response.data.access;
      login(token);
    } catch (error: any) {
      console.error("Login failed", error);
      setUiError(error.response?.data?.message || error.message || "حدث خطأ ما أثناء تسجيل الدخول");
    }
  };

  return {
    phone,        // مررت للـ LoginForm ليقرأ القيمة الحالية value={vm.phone}
    setPhone,     // مررت للـ LoginForm ليحدث القيمة onChangeText={vm.setPhone}
    password,     // value={vm.password}
    setPassword,  // onChangeText={vm.setPassword}
    handleLogin,
    isLoading,
    error: uiError,
    // إذا كان الـ Input يعرض رسائل خطأ مخصصة للحقل نفسه يمكنك تمرير الـ uiError هنا
    phoneError: null, 
    passwordError: null,
  };
}