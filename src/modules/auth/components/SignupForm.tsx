import React from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
} from 'react-native';

import Logo from '../../../shared/components/logo';
import LinearBg from '../../../shared/components/LinearBg';

import Profile from '../../../assets/svg/profile.svg';
import PhoneNumberIcon from '../../../assets/svg/phoneNumber.svg';
import PasswordIcon from '../../../assets/svg/password.svg';
import VisibilityOnIcon from '../../../assets/svg/visibilityOn.svg';
import VisibilityOffIcon from '../../../assets/svg/visibilityOff.svg';

import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/signup.styles';

const SignupForm = ({ vm }: any) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <>
            {/* LOGO */}
            <View style={styles.top}>
                <Logo />
            </View>

            {/* FORM */}
            <View style={styles.middle}>
                {/* First + Last Name */}
                <View style={styles.row}>
                    <View
                        style={[
                            styles.halfInput,
                            { backgroundColor: colors.surface },
                        ]}
                    >
                        <Profile width={18} height={18} />

                        <TextInput
                            placeholder="First Name"
                            placeholderTextColor={colors.textMuted}
                            value={vm.firstName}
                            onChangeText={vm.setFirstName}
                            style={[
                                styles.halfInputText,
                                { color: colors.textPrimary },
                            ]}
                        />
                    </View>

                    <View
                        style={[
                            styles.halfInput,
                            { backgroundColor: colors.surface },
                        ]}
                    >
                        <Profile width={18} height={18} />

                        <TextInput
                            placeholder="Last Name"
                            placeholderTextColor={colors.textMuted}
                            value={vm.lastName}
                            onChangeText={vm.setLastName}
                            style={[
                                styles.halfInputText,
                                { color: colors.textPrimary },
                            ]}
                        />
                    </View>
                </View>

                {/* Phone */}
                <View
                    style={[
                        styles.inputBox,
                        { backgroundColor: colors.surface },
                    ]}
                >
                    <PhoneNumberIcon width={20} height={20} />

                    <TextInput
                        placeholder="Phone Number"
                        placeholderTextColor={colors.textMuted}
                        keyboardType="phone-pad"
                        value={vm.phone}
                        onChangeText={vm.setPhone}
                        style={[
                            styles.input,
                            { color: colors.textPrimary },
                        ]}
                    />
                </View>

                {/* Password */}
                <View
                    style={[
                        styles.inputBox,
                        { backgroundColor: colors.surface },
                    ]}
                >
                    <PasswordIcon width={20} height={20} />

                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={colors.textMuted}
                        secureTextEntry={!vm.showPassword}
                        value={vm.password}
                        onChangeText={vm.setPassword}
                        style={[
                            styles.input,
                            { color: colors.textPrimary },
                        ]}
                    />

                    <TouchableOpacity
                        onPress={vm.togglePassword}
                    >
                        {vm.showPassword ? (
                            <VisibilityOnIcon
                                width={20}
                                height={20}
                            />
                        ) : (
                            <VisibilityOffIcon
                                width={20}
                                height={20}
                            />
                        )}
                    </TouchableOpacity>
                </View>

                {/* Confirm Password */}
                <View
                    style={[
                        styles.inputBox,
                        { backgroundColor: colors.surface },
                    ]}
                >
                    <PasswordIcon width={20} height={20} />

                    <TextInput
                        placeholder="Confirm Password"
                        placeholderTextColor={colors.textMuted}
                        secureTextEntry={
                            !vm.showConfirmPassword
                        }
                        value={vm.confirmPassword}
                        onChangeText={vm.setConfirmPassword}
                        style={[
                            styles.input,
                            { color: colors.textPrimary },
                        ]}
                    />

                    <TouchableOpacity
                        onPress={vm.toggleConfirmPassword}
                    >
                        {vm.showConfirmPassword ? (
                            <VisibilityOnIcon
                                width={20}
                                height={20}
                            />
                        ) : (
                            <VisibilityOffIcon
                                width={20}
                                height={20}
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* BUTTON */}
            <View style={styles.bottom}>
                <TouchableOpacity onPress={vm.handleLogin}>
                    <LinearBg
                        style={styles.button}
                        colors={[colors.textPrimary, colors.surface]}
                    >
                        <Text style={[styles.btnText, { color: colors.backgroundSoft }]}>
                            SignUp
                        </Text>
                    </LinearBg>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default SignupForm;