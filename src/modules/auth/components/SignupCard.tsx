import React from 'react';
import { View } from 'react-native';
import SignupPinShape from '../../../assets/svg/pinContainerMainCard.svg';
import { createStyles } from '../styles/signup.styles';
import { useTheme } from '../../../core/theme/useTheme';

const SignupCard = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <View style={styles.signupWrapper}>
            <SignupPinShape
                width="110%"
                height="110%"
                style={[
                    styles.pinShape,
                ]}
            />

            <View style={styles.signupContent}>
                {children}
            </View>
        </View>
    );
};

export default SignupCard;