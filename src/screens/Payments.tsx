import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { boxShadow, colors, defaultTexts, flexBox, Margins, Padding } from '../styles/Global'
import { ArrowBack, ArrowRight, ArrowRightWhite, CragLogo, QR } from '../assets/images'
import { useNavigation } from '@react-navigation/native'
const Payments = () => {
    const navigation = useNavigation(); // Get the navigation prop

    const handlePress = () => {
        navigation.goBack(); // Navigate to the previous screen
    };

    return (
        <>
            <GestureHandlerRootView style={[styles.container]}>
                <View style={[flexBox.rowBetween]}>
                    <View style={[flexBox.row]}>
                        <TouchableOpacity onPress={handlePress}>
                            <Image source={ArrowBack} />
                        </TouchableOpacity>
                        <Text style={[defaultTexts.navigationMainText, { marginStart: Margins.m_l }]}>
                            Payment
                        </Text>
                    </View>
                    <Image source={CragLogo} />
                </View>


                <View style={[styles.card]}>
                    <View style={[{ paddingHorizontal: Padding.p_xl }]}>
                        <View style={[flexBox.center, { paddingTop: Padding.p_2xxl }]}>
                            <Image source={QR} />
                            <Text style={[defaultTexts.planMainText, { marginTop: Margins.m_xl }]}>
                                Scan QR Code for Payment
                            </Text>
                            <Text>Gpay, PhonePe, UPI, etc.</Text>
                        </View>
                        <View style={{ borderColor: colors.InActive, borderWidth: 0.5, marginVertical: Margins.m_xxl }}></View>
                        <View style={[flexBox.rowBetween]}>
                            <Text style={[defaultTexts.planMainText, { marginBottom: Margins.m_xl }]}>
                                Credit / Debit Card
                            </Text>
                            <Image source={ArrowRight} />
                        </View>
                        <View style={[flexBox.rowBetween]}>
                            <Text style={[defaultTexts.planMainText, { marginBottom: Margins.m_xl }]}>
                                UPI
                            </Text>
                            <Image source={ArrowRight} />
                        </View>
                        <View style={[flexBox.rowBetween]}>
                            <Text style={[defaultTexts.planMainText]}>
                                Wallets
                            </Text>
                            <Image source={ArrowRight} />
                        </View>
                    </View>
                    <View style={{ borderColor: colors.InActive, borderWidth: 0.5, marginVertical: Margins.m_xxl }}></View>


                    <View style={[{ padding: Padding.p_l, paddingTop: Padding.p_s }]}>
                        <View style={[flexBox.rowBetween, { marginBottom: Margins.m_l }]}>
                            <Text style={[defaultTexts.normalLabels]}>Total</Text>
                            <Text style={[defaultTexts.normalLabels]}>&#x20B9;1,500</Text>
                        </View>
                        <View style={[flexBox.rowBetween]}>
                            <Text style={[defaultTexts.normalLabels]}>Discount</Text>
                            <Text style={[defaultTexts.normalLabels]}>- &#x20B9;150</Text>
                        </View>
                    </View>
                    <View style={[styles.addButton, flexBox.rowBetween]}>
                        <Text style={[styles.addButtonText]}>Grand Total</Text>
                        <Text style={[styles.addButtonText]}>&#x20B9;1,350</Text>
                    </View>
                </View>


                <TouchableOpacity style={[styles.cashButton, flexBox.rowBetween]} onPress={() => navigation.navigate("PaymentSuccess")}>
                    <Text style={[styles.addButtonText]}>Paid Through Cash</Text>
                    <Image source={ArrowRightWhite} />
                </TouchableOpacity>
            </GestureHandlerRootView>

        </>
    )
}
export default Payments
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BgColor,
        padding: Padding.p_l,
        height: "100%",
    },
    card: {
        width: "100%",
        ...boxShadow.basicShadow,
        borderRadius: 8,
        marginTop: Margins.m_xl,
        backgroundColor: colors.BgColor
    },
    addButton: {
        backgroundColor: colors.success,
        padding: 15,
        alignItems: 'center',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },

    cashButton: {
        backgroundColor: colors.success,
        padding: 25,
        alignItems: 'center',
        borderRadius: 8,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        margin: Margins.m_l,
    },

    addButtonText: {
        color: colors.LightText,
        fontWeight: 'bold',
    },
})