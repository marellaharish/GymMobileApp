import { Dimensions, Image, KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import { boxShadow, colors, FontSizes, inputFeilds, InputFieldIcon, Padding, widthStyles } from '../styles/Global';
import React from 'react';
import ThemedText from '../styles/ThemedText';
import { Eye, Logo, User } from '../assets/images';
const windowHeight = Dimensions.get('window').height;

const Login = () => {

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
                        <TextInput placeholderTextColor={colors.placeholder} placeholder='Password' style={styles.input} />
                        <Image source={Eye} style={[InputFieldIcon.icon]} />
                    </View>
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
    }
})