import { Dimensions, ImageBackground, KeyboardAvoidingView, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { boxShadow, buttons, colors, defaultTexts, flexBox, Margins } from '../styles/Global';
import { HomeBg } from '../assets/images';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;

const WelcomeScreen = () => {
    const navigation = useNavigation();
    const animatedValue1 = useSharedValue(0);
    const animatedValue2 = useSharedValue(0);
    const animatedValue3 = useSharedValue(0);
    const animatedValue4 = useSharedValue(0);

    useEffect(() => {
        animatedValue1.value = withTiming(1, { duration: 1000 });
        setTimeout(() => {
            animatedValue2.value = withTiming(1, { duration: 1000 });
        }, 300);

        setTimeout(() => {
            animatedValue3.value = withTiming(1, { duration: 1000 });
        }, 400);

        setTimeout(() => {
            animatedValue4.value = withTiming(1, { duration: 1000 });
        }, 500);
    }, []);


    const animatedStyle1 = useAnimatedStyle(() => ({
        transform: [{ translateY: animatedValue1.value * -50 }],
        opacity: animatedValue1.value,
    }));

    const animatedStyle2 = useAnimatedStyle(() => ({
        transform: [{ translateY: animatedValue2.value * -50 }],
        opacity: animatedValue2.value,
    }));

    const animatedStyle3 = useAnimatedStyle(() => ({
        transform: [{ translateY: animatedValue3.value * -50 }],
        opacity: animatedValue3.value,
    }));

    const animatedStyle4 = useAnimatedStyle(() => ({
        transform: [{ translateY: animatedValue4.value * -50 }],
        opacity: animatedValue4.value,
    }));

    return (
        <>
            <StatusBar backgroundColor={colors.BgColor} barStyle={'dark-content'} />
            <View style={styles.container}>
                <ImageBackground source={HomeBg} resizeMode="cover" style={styles.image}>
                    <View style={[styles.innerContent]}>
                        <View style={[styles.textContainer]}>
                            <View>
                                <Animated.Text style={[defaultTexts.homeSubtitle, animatedStyle1]}>
                                    Hey,
                                </Animated.Text>
                                <Animated.Text style={[defaultTexts.homeMainText, animatedStyle2]}>
                                    Harish
                                </Animated.Text>
                            </View>
                            <View style={[styles.welcomeText]}>
                                <Animated.Text style={[defaultTexts.homeSubtitle, animatedStyle3]}>
                                    Welcome to
                                </Animated.Text>
                                <Animated.Text style={[defaultTexts.homeMainText, animatedStyle4]}>
                                    Crag Studio
                                </Animated.Text>
                            </View>
                        </View>

                        <View style={[styles.checkinCardPosition]}>
                            <View style={[styles.checkinCard, flexBox.rowBetween]}>
                                <View>
                                    <Text style={[defaultTexts.checkinCardMainText]}>
                                        Check-in
                                    </Text>
                                    <Text style={[defaultTexts.checkinCardsubText]} numberOfLines={1} ellipsizeMode='tail'>
                                        mharish@pandorarndlabs.com
                                    </Text>
                                </View>
                                <Pressable style={[buttons.CheckInbtn, flexBox.center]}>
                                    <Text style={buttons.CheckInbtntxt}>Check-In</Text>
                                </Pressable>
                            </View>
                            <TouchableOpacity onPress={() => { navigation.navigate('HomeScreenNavigation') }}>
                                <Text style={[defaultTexts.skipText]}>
                                    SKIP TO CONTINUE &gt;&gt;
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BgColor,
        height: windowHeight,
        position: "relative",
    },
    image: {
        flex: 1,
    },
    innerContent: {
        padding: 25,
        flex: 1,
    },
    checkinCard: {
        backgroundColor: colors.BgColor,
        ...boxShadow.basicShadow,
        padding: 25,
        borderRadius: 8,
    },
    checkinCardPosition: {
        width: "100%",
        position: "absolute",
        bottom: 60,
        marginHorizontal: 25,
    },
    textContainer: {
        marginTop: 110,
    },
    welcomeText: {
        marginTop: Margins.m_xxl,
    },
});
