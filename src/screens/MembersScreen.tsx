import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { boxShadow, buttons, colors, defaultTexts, flexBox, FontSizes, inputFeilds, InputFieldIcon, Margins, Padding, widthStyles } from '../styles/Global'
import { Calender, CragLogo, SearchIcon } from '../assets/images'
import { useNavigation } from '@react-navigation/native'
import { useRef, useState } from 'react'
import { USERS } from '../data'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import CustomBottomSheetModal from '../components/CustomBottomSheetModal'
import { Dropdown } from 'react-native-element-dropdown'
import DateTimePicker from '@react-native-community/datetimepicker';
import ToggleSwitch from 'toggle-switch-react-native'


type ItemProps = {
    mId: string,
    onPress: () => void,
    name: string,
    gender: string,
    phoneNumber: string,
    isSelected: boolean,
    onSelect: () => void,
    bottomButtons: () => void,
    onLogSheetChange: () => void,
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

    const bottomSheetModalRef = useRef(null);

    const handleSheetChanges = (index: any) => {
        console.log('Sheet index changed to', index);
    };


    const snapPoints = ['65%', '65%'];
    const openBottomSheet = () => {
        bottomSheetModalRef.current?.present();
    };

    const closeBottomSheet = () => {
        bottomSheetModalRef.current?.dismiss();
    };


    const timeLogModalRef = useRef(null);

    const onLogSheetChange = (index) => {
        console.log('Log time sheet index changed to', index);
    };

    const logSheetSnapPoints = ['62%', '62%'];

    const openLogTimeSheet = () => {
        timeLogModalRef.current?.present();
    };

    const closeLogTimeSheet = () => {
        timeLogModalRef.current?.dismiss();
    };

    const filteredData = USERS.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const Item = ({ name, gender, phoneNumber, mId, onPress, onLogSheetChange }: ItemProps) => (
        <View style={[{ paddingHorizontal: Padding.p_l, }]}>
            <View style={[styles.card, { padding: Padding.p_l }]}>
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
                    <TouchableOpacity style={[buttons.CheckInbtn, flexBox.center]} onPress={onPress}>
                        <Text style={buttons.CheckInbtntxt}>Check-In</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[{ backgroundColor: colors.light }, flexBox.rowBetween, styles.logtime]}>
                <TouchableOpacity style={[flexBox.center, { width: "50%", padding: Padding.p_l }]}>
                    <Text style={[{ fontSize: FontSizes.SecondSmall, color: colors.primary }]}>
                        View Attendance
                    </Text>
                </TouchableOpacity>
                <View style={{ width: 1, backgroundColor: colors.InActive, height: '100%' }} />
                <TouchableOpacity style={[flexBox.center, { width: "50%", padding: Padding.p_l }]} onPress={onLogSheetChange}>
                    <Text style={[{ fontSize: FontSizes.SecondSmall, color: colors.primary }]}>
                        Log Time
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    );


    function handlePlanSelect(id: string): void {
        throw new Error('Function not implemented.')
    }


    const data = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];
    const [date, setDate] = useState<Date>(new Date());
    const [show, setShow] = useState<boolean>(false);
    const [selectedMembers, setSelectedMembers] = useState(new Set());
    const showDatePicker = () => {
        setShow(true);
    };
    const formatDate = (date: Date): string => {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day < 10 ? `0${day}` : day} ${month} ${year}`;
    };

    const formattedDate = formatDate(date);

    const onChange = (event: Event, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    const [isOn, setIsOn] = useState(false);
    const handleToggle = () => {
        setIsOn(!isOn);
        console.log("changed to: ", !isOn);
    }

    return (
        <>
            <GestureHandlerRootView style={[styles.container]}>
                <BottomSheetModalProvider>
                    <View>
                        <View style={[flexBox.rowBetween, { padding: Padding.p_l }]}>
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
                        <View style={[{ paddingHorizontal: Padding.p_l }]}>
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
                                    onPress={() => openBottomSheet()}
                                    onLogSheetChange={() => openLogTimeSheet()}
                                    mId={item.id} />
                            )}
                            keyExtractor={item => item.id}
                        />
                    </View>

                    <CustomBottomSheetModal
                        ref={bottomSheetModalRef}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}
                    >
                        <View style={[styles.container, { padding: Padding.p_l, }]}>
                            <View style={[flexBox.rowBetween]}>
                                <Text style={[{ fontSize: FontSizes.normal, fontWeight: "bold", color: colors.DarkText }]}>Check-In</Text>
                                <TouchableOpacity onPress={closeBottomSheet}>
                                    <Text style={[{ fontSize: FontSizes.normal, fontWeight: "500", color: colors.DarkText }]}>X</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={[{ marginTop: Margins.m_xxl }]}>
                                <Text style={[defaultTexts.memberName]}>
                                    Harish Marella
                                </Text>
                                <View style={[flexBox.rowBetween]}>
                                    <Text style={[defaultTexts.checkinCardsubText, { width: "auto", fontSize: FontSizes.SecondSmall }]}>
                                        Male, 9848173866, MID: 21
                                    </Text>
                                    <Text style={[defaultTexts.checkinCardsubText, { width: "auto", fontSize: FontSizes.SecondSmall }]}>
                                        Plan Expires: 17 Day(s)
                                    </Text>
                                </View>

                                <View style={[{ marginTop: Margins.m_xxl }]}>
                                    <View style={[flexBox.rowBetween]}>
                                        <Text style={[defaultTexts.normalLabels]}>
                                            Plan/Addon:
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
                                    <View style={[flexBox.rowBetween, { marginTop: Margins.m_l }]}>
                                        <Text style={[defaultTexts.normalLabels]}>
                                            Select Date:
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
                                    <View style={[flexBox.rowBetween, { marginTop: Margins.m_l }]}>
                                        <Text style={[defaultTexts.normalLabels]}>
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
                                    <View style={[flexBox.rowBetween, { marginTop: Margins.m_l }]}>
                                        <Text style={[defaultTexts.normalLabels]}>
                                            Check-In:
                                        </Text>
                                        <TouchableOpacity onPress={showDatePicker} style={[flexBox.rowBetween, styles.dropdown]}>
                                            <Text>{formattedDate}</Text>
                                            <Image style={[{ marginStart: Margins.m_m }]} source={Calender} />
                                        </TouchableOpacity>
                                        {show && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={date}
                                                mode="date"
                                                display="default"
                                                onChange={onChange}
                                            />
                                        )}
                                    </View>
                                    <View style={[flexBox.rowBetween, { marginTop: Margins.m_l }]}>
                                        <Text style={[defaultTexts.normalLabels]}>
                                            Auto Check-Out:
                                        </Text>
                                        <ToggleSwitch
                                            isOn={isOn}
                                            onColor="#193B8B"
                                            offColor="#C6DFE6"
                                            size="small"
                                            onToggle={handleToggle}
                                        />
                                    </View>
                                    <View style={[InputFieldIcon.iconHolder, flexBox.end, { marginTop: Margins.m_l }]}>
                                        <TextInput style={styles.dropdown} />
                                        <Text style={[InputFieldIcon.icon, { top: "25%", right: 10 }]}>Hours</Text>
                                    </View>

                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.InActive }]} >
                                            <Text style={[styles.buttonText, { color: colors.primary }]}>Clear</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.actionButton]}>
                                            <Text style={[styles.buttonText]}>Check-In</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </CustomBottomSheetModal>



                    <CustomBottomSheetModal
                        ref={timeLogModalRef}
                        snapPoints={logSheetSnapPoints}
                        onChange={onLogSheetChange}
                    >

                        <View style={[styles.container, { padding: Padding.p_l, }]}>
                            <View style={[flexBox.rowBetween]}>
                                <Text style={[{ fontSize: FontSizes.normal, fontWeight: "bold", color: colors.DarkText }]}>Log Time</Text>
                                <TouchableOpacity onPress={closeBottomSheet}>
                                    <Text style={[{ fontSize: FontSizes.normal, fontWeight: "500", color: colors.DarkText }]}>X</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={[{ marginTop: Margins.m_xxl }]}>
                                <Text style={[defaultTexts.memberName]}>
                                    Harish Marella
                                </Text>
                                <View style={[flexBox.rowBetween]}>
                                    <Text style={[defaultTexts.checkinCardsubText, { width: "auto", fontSize: FontSizes.SecondSmall }]}>
                                        Male, 9848173866, MID: 21
                                    </Text>
                                    <Text style={[defaultTexts.checkinCardsubText, { width: "auto", fontSize: FontSizes.SecondSmall }]}>
                                        Plan Expires: 17 Day(s)
                                    </Text>
                                </View>

                                <View style={[{ marginTop: Margins.m_xxl }]}>
                                    <View style={[flexBox.rowBetween]}>
                                        <Text style={[defaultTexts.normalLabels]}>
                                            Plan/Addon:
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
                                    <View style={[flexBox.rowBetween, { marginTop: Margins.m_l }]}>
                                        <Text style={[defaultTexts.normalLabels]}>
                                            Select Date:
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
                                    <View style={[flexBox.rowBetween, { marginTop: Margins.m_l }]}>
                                        <Text style={[defaultTexts.normalLabels]}>
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
                                    <View style={[flexBox.rowBetween, { marginTop: Margins.m_l }]}>
                                        <Text style={[defaultTexts.normalLabels]}>
                                            From:
                                        </Text>
                                        <TouchableOpacity onPress={showDatePicker} style={[flexBox.rowBetween, styles.dropdown]}>
                                            <Text>{formattedDate}</Text>
                                            <Image style={[{ marginStart: Margins.m_m }]} source={Calender} />
                                        </TouchableOpacity>
                                        {show && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={date}
                                                mode="date"
                                                display="default"
                                                onChange={onChange}
                                            />
                                        )}
                                    </View>
                                    <View style={[flexBox.rowBetween, { marginTop: Margins.m_l }]}>
                                        <Text style={[defaultTexts.normalLabels]}>
                                            To:
                                        </Text>
                                        <TouchableOpacity onPress={showDatePicker} style={[flexBox.rowBetween, styles.dropdown]}>
                                            <Text>{formattedDate}</Text>
                                            <Image style={[{ marginStart: Margins.m_m }]} source={Calender} />
                                        </TouchableOpacity>
                                        {show && (
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={date}
                                                mode="date"
                                                display="default"
                                                onChange={onChange}
                                            />
                                        )}
                                    </View>



                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.InActive }]} >
                                            <Text style={[styles.buttonText, { color: colors.primary }]}>Clear</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.actionButton]}>
                                            <Text style={[styles.buttonText]}>Check-In</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </CustomBottomSheetModal>

                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </>
    )
}
export default MembersScreen
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BgColor,
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
        borderTopEndRadius: 8,
        borderTopLeftRadius: 8,
        marginTop: Margins.m_l,
        backgroundColor: colors.BgColor
    },
    logtime: {
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8,
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
    addButton: {
        backgroundColor: colors.success,
        padding: 15,
        alignItems: 'center',
    },
    addButtonText: {
        color: colors.LightText,
        fontWeight: 'bold',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        textTransform: "uppercase",
        fontWeight: "500"
    },
    actionButton: {
        padding: 10,
        backgroundColor: colors.success,
        borderRadius: 10,
        width: "48%"
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Margins.m_xl
    },
})