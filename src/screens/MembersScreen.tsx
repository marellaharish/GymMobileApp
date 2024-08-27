import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { boxShadow, buttons, colors, defaultTexts, flexBox, FontSizes, inputFeilds, InputFieldIcon, Margins, Padding } from '../styles/Global'
import { CragLogo, SearchIcon } from '../assets/images'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { USERS } from '../data'

type ItemProps = {
    name: string,
    gender: string,
    phoneNumber: string,
    mId: string,
    onPress: () => void,
    name: string,
    gender: string,
    phoneNumber: string,
    isSelected: boolean,
    onSelect: () => void,
    bottomButtons: () => void,
};


const MembersScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const navigation = useNavigation();

    const handleSearchFocus = () => {
        setSearchQuery('');
        setIsSearchActive(true);
    };

    const filteredData = USERS.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const Item = ({ name, gender, phoneNumber, mId, onPress }: ItemProps) => (
        <View style={[styles.card, { padding: Padding.p_xl }]}>
            <View style={[flexBox.rowBetween]}>
                <View>
                    <Text style={[defaultTexts.memberName]}>
                        {name}
                    </Text>
                    <Text style={[defaultTexts.checkinCardsubText, { width: "auto", fontSize: FontSizes.SecondSmall }]}>
                        {gender}, {phoneNumber}, MID: {mId}
                    </Text>
                    <Text style={[defaultTexts.checkinCardsubText, { width: "auto", fontSize: FontSizes.SecondSmall }]}>
                        Plan Expires: 17 Day(s)
                    </Text>

                </View>
                <TouchableOpacity style={[buttons.CheckInbtn, flexBox.center]}>
                    <Text style={buttons.CheckInbtntxt}>Check-In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );


    return (
        <>
            <GestureHandlerRootView style={[styles.container]}>

                <BottomSheetModalProvider>
                    <View>
                        <View style={[flexBox.rowBetween]}>
                            <View>
                                <Text style={[defaultTexts.navigationSubtitle]}>
                                    Hey,
                                </Text>
                                <Text style={[defaultTexts.navigationMainText]}>
                                    Harish
                                </Text>
                            </View>
                            <Image source={CragLogo} />
                        </View>
                        <View style={[InputFieldIcon.iconHolder]}>
                            <TextInput
                                placeholderTextColor={colors.TextColor}
                                placeholder='Search Member'
                                style={styles.input}
                                value={searchQuery}
                                onChangeText={text => setSearchQuery(text)}
                                onFocus={handleSearchFocus}
                            />
                            <Image source={SearchIcon} style={[InputFieldIcon.icon]} />
                        </View>



                        <FlatList
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={filteredData}
                            renderItem={({ item }) => (
                                <Item
                                    name={item.name}
                                    gender={item.gender}
                                    phoneNumber={item.phoneNumber}
                                    mId={item.id}
                                    onPress={() => handlePlanSelect(item.id)}
                                />
                            )}
                            keyExtractor={item => item.id}
                        />





                    </View>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </>
    )
}
export default MembersScreen
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BgColor,
        padding: Padding.p_l,
        height: "100%",
    },
    input: {
        ...inputFeilds.inputType_1,
        marginTop: 15,
        ...boxShadow.basicShadow,
    },
    card: {
        width: "100%",
        ...boxShadow.basicShadow,
        borderRadius: 8,
        marginTop: Margins.m_xl,
        backgroundColor: colors.BgColor
    },
})