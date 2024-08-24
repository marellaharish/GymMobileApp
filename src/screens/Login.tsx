import { Dimensions, Image, KeyboardAvoidingView, Pressable, StatusBar, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { boxShadow, buttons, colors, FontSizes, inputFeilds, InputFieldIcon, Margins, Padding, widthStyles } from '../styles/Global';
import React, { useState } from 'react';
import ThemedText from '../styles/ThemedText';
import { Eye, Google, Logo, User } from '../assets/images';
const windowHeight = Dimensions.get('window').height;

const Login = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };
    return (
        <>
            <StatusBar backgroundColor={colors.BgColor} barStyle={'dark-content'} />
            <KeyboardAvoidingView style={styles.container}>
                <Image source={Logo} />
                <ThemedText style={styles.logoTxt}>Staff Application</ThemedText>
                <View style={[widthStyles.w_90, styles.inputsContainer]}>
                    <View style={[widthStyles.w_90, InputFieldIcon.iconHolder]}>
                        <TextInput placeholderTextColor={colors.placeholder} placeholder='Username' style={styles.input} />
                        <Image source={User} style={[InputFieldIcon.icon]} />
                    </View>
                    <View style={[widthStyles.w_90, InputFieldIcon.iconHolder]}>
                        <TextInput placeholderTextColor={colors.placeholder} secureTextEntry={!isPasswordVisible} placeholder='Password' style={styles.input} />
                        <Pressable onPress={togglePasswordVisibility} style={[InputFieldIcon.icon]}>
                            <Image source={Eye} />
                        </Pressable>
                    </View>

                    <Pressable style={[buttons.PrimaryButtom, { ...boxShadow.basicShadow }, styles.buttom]}>
                        <Text style={buttons.buttonsText}>Login</Text>
                    </Pressable >

                    <Pressable style={[buttons.whiteButtom, { ...boxShadow.basicShadow }, styles.googleButtom]}>
                        <Image source={Google} style={{ marginEnd: Margins.m_m }} />
                        <Text style={buttons.whiteButtonsText}>SIGNIN USING GOOGLE</Text>
                    </Pressable >
                </View>
            </KeyboardAvoidingView>
        </>
    )
}
export default Login;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BgColor,
        height: windowHeight,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 20
    },
    input: {
        ...inputFeilds.inputType_1,
        marginTop: 15,
        ...boxShadow.basicShadow,
    },
    logoTxt: {
        color: colors.primary,
        fontSize: FontSizes.regular,
        marginTop: 10,
        fontWeight: "500"
    },
    inputsContainer: {
        paddingTop: Padding.p_xxl
    },
    buttom: {
        marginTop: Margins.m_2xxl
    },
    googleButtom: {
        marginTop: Margins.m_xxl
    }
})