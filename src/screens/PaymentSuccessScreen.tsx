import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ArrowBack, ArrowRight, CragLogo, QR, SuccessIcon } from '../assets/images'
import { boxShadow, buttons, colors, defaultTexts, flexBox, FontSizes, Margins, Padding } from '../styles/Global'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Dropdown } from 'react-native-element-dropdown';

const PaymentSuccessScreen = () => {
    const navigation = useNavigation(); // Get the navigation prop

    const handlePress = () => {
        navigation.goBack(); // Navigate to the previous screen
    };

    const cardStyles = {
        backgroundColor: colors.BgColor,
        width: "100%",
        height: 50,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#CCC",
        paddingHorizontal: Padding.p_xl,
        paddingRight: Padding.p_2xxl,
        fontSize: FontSizes.normal,
    };

    const data = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];
    return (
        <GestureHandlerRootView style={[styles.container]}>
            <View style={[flexBox.rowBetween]}>
                <View style={[flexBox.row]}>
                    <TouchableOpacity onPress={handlePress}>
                        <Image source={ArrowBack} />
                    </TouchableOpacity>
                    <Text style={[defaultTexts.navigationMainText, { marginStart: Margins.m_l }]}>
                        Success
                    </Text>
                </View>
                <Image source={CragLogo} />
            </View>
            <View style={[styles.card]}>
                <View style={[{ paddingHorizontal: Padding.p_xl }]}>
                    <View style={[flexBox.center, { paddingTop: Padding.p_2xxl }]}>
                        <Image source={SuccessIcon} />
                        <Text style={[defaultTexts.planMainText, { marginTop: Margins.m_xl }]}>
                            Payment Successful
                        </Text>
                        <Text style={[defaultTexts.SuccessText]}>
                            Transaction ID:
                            <Text style={[{ fontWeight: "bold", marginStart: Margins.m_m }]}>
                                307693
                            </Text>
                        </Text>
                        <Text style={[defaultTexts.SuccessText]}>
                            Amount:
                            <Text style={[{ fontWeight: "bold", marginStart: Margins.m_m }]}>
                                1398.00
                            </Text>
                        </Text>
                    </View>
                    <View style={{ borderColor: colors.InActive, borderWidth: 0.5, marginVertical: Margins.m_xxl }}></View>
                    <View style={[flexBox.rowBetween, { marginBottom: Margins.m_l }]}>
                        <Text style={[defaultTexts.normalLabels]}>Plan</Text>
                        <Text style={[defaultTexts.normalLabels, { fontWeight: "bold" }]}>Starter Plan</Text>
                    </View>
                    <View style={[flexBox.rowBetween, { marginBottom: Margins.m_l }]}>
                        <Text style={[defaultTexts.normalLabels]}>Quantity</Text>
                        <Text style={[defaultTexts.normalLabels, { fontWeight: "bold" }]}>1</Text>
                    </View>
                    <View style={[flexBox.rowBetween, { marginBottom: Margins.m_l }]}>
                        <Text style={[defaultTexts.normalLabels]}>Start Date</Text>
                        <Text style={[defaultTexts.normalLabels, { fontWeight: "bold" }]}>27/05/2024</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.card, { padding: Padding.p_xl }]}>
                <View style={[flexBox.center, flexBox.rowBetween]}>
                    <View>
                        <Text style={[defaultTexts.memberName]}>Abdullah</Text>
                        <Text style={[defaultTexts.SuccessText, { fontSize: FontSizes.SecondSmall }]}>Male, 1234567890, MID: 2</Text>
                        <Text style={[defaultTexts.SuccessText, { fontSize: FontSizes.SecondSmall }]}>Plan Expires: 17 Day(s)</Text>
                    </View>
                    <View style={[flexBox.center]}>
                        <TouchableOpacity style={[buttons.CheckOutbtn]}>
                            <Text style={buttons.CheckInbtntxt}>Check-Out</Text>
                        </TouchableOpacity>
                        <Text style={[{ marginTop: Margins.m_m, color: colors.Danger, textAlign: "center" }]}>0h 2m 30s</Text>
                    </View>
                </View>
                <View style={[flexBox.center, flexBox.rowBetween, { marginTop: Margins.m_s }]}>
                    <Text style={[defaultTexts.memberName]}>
                        Trainer:
                    </Text>
                    <Dropdown
                        style={styles.dropdown}
                        data={data}
                        maxHeight={300}
                        placeholder="Select"
                        labelField="label"
                        valueField="value"
                        searchPlaceholder="Search..."
                        itemTextStyle={{ color: '#000' }}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        iconStyle={styles.iconStyle}
                        containerStyle={styles.containerStyle}
                        onChange={() => console.log("Presed")}
                    />
                </View>
            </View>

        </GestureHandlerRootView>
    )
}
export default PaymentSuccessScreen
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
    dropdown: {
        height: 40,
        borderColor: '#B0A8A8', // light gray border
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        width: "45%"
    },
    placeholderStyle: {
        fontSize: FontSizes.small,
        color: '#948A8A',
    },
    selectedTextStyle: {
        fontSize: FontSizes.small,
        color: '#000', // black color for selected text
    },
    iconStyle: {
        width: 20,
        height: 20,
        tintColor: '#948A8A', // gray color for the dropdown icon
    },
    containerStyle: {
        borderRadius: 8,
    },
})