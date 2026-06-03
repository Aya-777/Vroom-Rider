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
                width="100%"
                height="100%"
                style={[
                    styles.pinShape,
                ]}
            />

            {/* <SignupPinShape
                width="100%"
                height="100%"
                style={[
                    styles.pinShape, {
                        opacity: 0.15,
                        transform: [{ scale: 1.03 }],
                    }
                ]}
            /> */}

            <View style={styles.signupContent}>
                {children}
            </View>
        </View>
    );
};

export default SignupCard;