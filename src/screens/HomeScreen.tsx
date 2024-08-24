import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCallback, useMemo, useRef, useState } from 'react';
import { AddMember, Calender, CragLogo, Minus, Plus, SearchIcon, SelectUser, SelectUserActive } from '../assets/images';
import { boxShadow, buttons, colors, defaultTexts, flexBox, FontSizes, inputFeilds, InputFieldIcon, Margins, Padding, windowHeight } from '../styles/Global';
import { PLAN_ADDON_DATA, USERS } from '../data';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { FlatList, GestureHandlerRootView, PanGestureHandler, ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import ToggleSwitch from 'toggle-switch-react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';



type ItemProps = {
    planName: string,
    itemType: string,
    validaty: string,
    price: string,
    onPress: () => void,
    name: string,
    gender: string,
    phoneNumber: string,
    isSelected: boolean,
    onSelect: () => void,
    bottomButtons: () => void,
};

const Item = ({ planName, itemType, validaty, price, onPress }: ItemProps) => (
    <TouchableOpacity onPress={onPress}>
        <View style={[flexBox.rowBetween, { marginBottom: Margins.m_l }]}>
            <View>
                <Text style={[defaultTexts.planMainText]}>
                    {planName}
                </Text>
                <Text style={[defaultTexts.checkinCardsubText, { width: "auto" }]}>
                    {itemType}, {validaty}
                </Text>
            </View>
            <Text style={[defaultTexts.planMainText]}>
                &#x20B9;{price}
            </Text>
        </View>
    </TouchableOpacity>
);

const Members = ({ name, gender, phoneNumber, isSelected, onSelect }) => (
    <>
        <TouchableOpacity onPress={onSelect}>

            <View style={[flexBox.rowBetween, { marginBottom: Margins.m_xl }]}>
                <View>
                    <Text style={[defaultTexts.memberName]}>
                        {name}
                    </Text>
                    <Text style={[{ fontSize: FontSizes.extraSmall }]}>
                        {gender}, {phoneNumber}
                    </Text>
                </View>
                <View>
                    <Image source={isSelected ? SelectUserActive : SelectUser} />
                </View>
            </View>
        </TouchableOpacity>
    </>
)

const SelectedPlanDetails = ({ planName, itemType, validaty, price, bottomButtons }: ItemProps) => {

    const [date, setDate] = useState<Date>(new Date());
    const [show, setShow] = useState<boolean>(false);
    const [selectedMembers, setSelectedMembers] = useState(new Set());

    const onChange = (event: Event, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

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

    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    // const snapPoints = useMemo(() => ['25%', '90%'], []);
    const snapPoints = useMemo(() => {
        if (USERS.length === 0) {
            return ['25%'];
        }
        return [`${Math.min(25 + USERS.length * 10, 50)}%`, '90%'];
    }, [USERS]);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Members have been added successfully 👋',
            position: 'top',
        });
    };
    function handleCloseModal() {
        showToast();
        bottomButtons();
        bottomSheetModalRef.current?.close();
    }
    const [searchQuery, setSearchQuery] = useState('');
    const filteredData = USERS.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleSearchFocus = () => {
        setSearchQuery('');
    };
    const handleMemberSelect = (id) => {
        setSelectedMembers(prevState => {
            const newSelection = new Set(prevState);
            if (newSelection.has(id)) {
                newSelection.delete(id);
            } else {
                newSelection.add(id);
            }
            return newSelection;
        });
    };
    const [isOn, setIsOn] = useState(false);
    const handleToggle = () => {
        setIsOn(!isOn);
        console.log("changed to: ", !isOn);
    };

    return (
        <>
            <View style={styles.selectedPlanContainer}>
                <View style={[{ marginBottom: Margins.m_l, padding: Padding.p_l, paddingBottom: 0 }]}>
                    <View style={[flexBox.rowBetween,]}>
                        <View>
                            <Text style={[defaultTexts.planMainText]}>
                                {planName}
                            </Text>
                            <Text style={[defaultTexts.checkinCardsubText, { width: "auto" }]}>
                                {itemType}, {validaty}
                            </Text>
                        </View>
                        <Text style={[defaultTexts.planMainText]}>
                            &#x20B9;{price}
                        </Text>
                    </View>
                    <View style={[flexBox.rowBetween, { width: "100%", marginTop: Margins.m_xl }]}>
                        <View style={[flexBox.center]}>
                            <Text style={[defaultTexts.normalLabels]}>
                                Quantity
                            </Text>
                            <View style={[flexBox.rowBetween, { marginTop: Margins.m_s }]}>
                                <Image source={Minus} />
                                <Text style={[defaultTexts.normalLabels, { paddingHorizontal: 10 }]}>02</Text>
                                <Image source={Plus} />
                            </View>
                        </View>
                        <View style={[flexBox.center]}>
                            <Text style={[defaultTexts.normalLabels]}>
                                Start Date
                            </Text>
                            <TouchableOpacity onPress={showDatePicker} style={[flexBox.rowBetween, { marginTop: Margins.m_s }]}>
                                <Text style={[defaultTexts.normalLabels]}>{formattedDate}</Text>
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
                    </View>
                </View>
                {Array.from(selectedMembers).length > 0 ? (
                    <>
                        <View style={[{ padding: Padding.p_l }]}>
                            <TouchableOpacity onPress={handlePresentModalPress}>
                                <Text style={[{ color: colors.primary, fontWeight: "500", marginBottom: Margins.m_m }]}>
                                    Add Members
                                </Text>
                            </TouchableOpacity>
                            <FlatList
                                data={USERS.filter(user => selectedMembers.has(user.id))}
                                renderItem={({ item }) => (
                                    <View style={[flexBox.rowBetween, { marginBottom: Margins.m_s }]}>
                                        <View>
                                            <Text style={[defaultTexts.memberName]}>{item.name}</Text>
                                            <Text style={[{ fontSize: FontSizes.extraSmall }]}>{item.gender}, {item.phoneNumber}</Text>
                                        </View>
                                    </View>
                                )}
                                keyExtractor={item => item.id}
                            />
                            <View style={[flexBox.rowBetween]}>
                                <View style={[flexBox.row]}>
                                    <Text style={[defaultTexts.normalLabels]}>
                                        Discount
                                    </Text>
                                    <Text style={[{ marginStart: Margins.m_l, textDecorationLine: 'line-through', color: "#FF6161" }]}>
                                        &#x20B9;150
                                    </Text>
                                    <Text style={[{ marginStart: Margins.m_s, color: colors.success, fontSize: FontSizes.normal, fontWeight: "500" }]}>
                                        &#x20B9;1350
                                    </Text>
                                </View>
                                <View style={[flexBox.row]}>
                                    <TextInput value='10' style={[inputFeilds.inputType_2, { marginEnd: Margins.m_m }]} />
                                    <TextInput value='%' style={[inputFeilds.inputType_2]} />
                                </View>
                            </View>
                            <View style={[flexBox.rowBetween, { marginTop: Margins.m_l }]}>
                                <Text style={[defaultTexts.normalLabels]}>
                                    Start Simultaneously
                                </Text>
                                <ToggleSwitch
                                    isOn={isOn}
                                    onColor="#50C878"
                                    offColor="#C6DFE6"
                                    size="small"
                                    onToggle={handleToggle}
                                />
                            </View>
                        </View>
                        <View style={{ borderColor: colors.InActive, borderWidth: 0.5, marginVertical: Margins.m_m }}></View>
                        <View style={[{ padding: Padding.p_l, paddingTop: Padding.p_s }]}>
                            <View style={[flexBox.rowBetween]}>
                                <Text style={[defaultTexts.normalLabels]}>Total</Text>
                                <Text style={[defaultTexts.normalLabels]}>&#x20B9;1,500</Text>
                            </View>
                            <View style={[flexBox.rowBetween]}>
                                <Text style={[defaultTexts.normalLabels]}>Discount</Text>
                                <Text style={[defaultTexts.normalLabels]}>- &#x20B9;150</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={[styles.addButton, flexBox.rowBetween]}>
                            <Text style={[styles.addButtonText]}>Grand Total</Text>
                            <Text style={[styles.addButtonText]}>&#x20B9;1,350</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <TouchableOpacity style={[styles.addButton, flexBox.rowBetween]} onPress={handlePresentModalPress}>
                        <Text style={[styles.addButtonText]}>Add Members</Text>
                        <Image source={AddMember} />
                    </TouchableOpacity>
                )}

            </View>
            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enableContentPanningGesture={true}
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        {...props}
                        opacity={0.7}
                        appearsOnIndex={0}
                        disappearsOnIndex={-1}
                    />
                )}
            >
                <BottomSheetView>
                    <View style={[styles.container]}>
                        <View style={[flexBox.rowBetween]}>
                            <Text style={[{ fontSize: FontSizes.normal, fontWeight: "500", color: colors.DarkText }]}>Add Members</Text>
                            <Pressable onPress={handleCloseModal}>
                                <Text style={[{ fontSize: FontSizes.normal, fontWeight: "500", color: colors.DarkText }]}>X</Text>
                            </Pressable>
                        </View>

                        <View style={[InputFieldIcon.iconHolder]}>
                            <TextInput
                                placeholderTextColor={colors.TextColor}
                                placeholder='Search Plan/Addon'
                                style={styles.input}
                                value={searchQuery}
                                onChangeText={text => setSearchQuery(text)}
                                onFocus={handleSearchFocus}
                            />
                            <Image source={SearchIcon} style={[InputFieldIcon.icon]} />
                        </View>
                        <View style={[{ padding: Padding.p_m, flex: 1 }]}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                data={filteredData}
                                renderItem={({ item }) => (
                                    <Members name={item.name} gender={item.gender} phoneNumber={item.phoneNumber} isSelected={selectedMembers.has(item.id)}
                                        onSelect={() => handleMemberSelect(item.id)} />
                                )}
                                keyExtractor={item => item.id}
                            />
                        </View>
                        <TouchableOpacity style={[buttons.CheckInbtn]} onPress={handleCloseModal}>
                            <Text style={[buttons.CheckInbtntxt, { textAlign: "center" }]}>ADD MEMBERS</Text>
                        </TouchableOpacity>
                    </View>
                </BottomSheetView>
            </BottomSheetModal>

        </>
    )
};

const HomeScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const navigation = useNavigation();

    const filteredData = PLAN_ADDON_DATA.filter(item =>
        item.planName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlePlanSelect = (planId: string) => {
        if (!selectedPlans.includes(planId)) {
            setSelectedPlans(prevPlans => [...prevPlans, planId]);
            setIsSearchActive(false);
        }
    };

    const handleSearchFocus = () => {
        setSearchQuery('');
        setIsSearchActive(true);
    };

    const [isVisible, setIsVisible] = useState(false);
    const slideY = useSharedValue(300);
    const showSlidingView = useCallback(() => {
        setIsVisible(true);
        slideY.value = withSpring(0, { damping: 6, stiffness: 80 });
    }, [slideY]);
    const hideSlidingView = useCallback(() => {
        slideY.value = withSpring(300, { damping: 6, stiffness: 80 }, () => {
        });
    }, [slideY]);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: slideY.value }],
        };
    });

    const isNavigation = () => {
        navigation.navigate('Payments');
    }



    return (
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
                            placeholder='Search Plan/Addon'
                            style={styles.input}
                            value={searchQuery}
                            onChangeText={text => setSearchQuery(text)}
                            onFocus={handleSearchFocus}
                        />
                        <Image source={SearchIcon} style={[InputFieldIcon.icon]} />
                    </View>

                    {isSearchActive && (
                        <View style={[styles.searchResult]}>
                            {filteredData.length > 0 ? (
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    data={filteredData}
                                    renderItem={({ item }) => (
                                        <Item
                                            planName={item.planName}
                                            itemType={item.itemType}
                                            validaty={item.validaty}
                                            price={item.price}
                                            onPress={() => handlePlanSelect(item.id)}
                                        />
                                    )}
                                    keyExtractor={item => item.id}
                                />
                            ) : (
                                <Text style={styles.noResultText}>No matching plans or Addons</Text>
                            )}
                        </View>
                    )}
                    <ScrollView showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false} style={[{ backgroundColor: colors.BgColor, marginTop: Margins.m_l }]}>

                        {selectedPlans.map(planId => {
                            const selectedPlan = PLAN_ADDON_DATA.find(item => item.id === planId);
                            if (!selectedPlan) return null;
                            return (

                                <SelectedPlanDetails
                                    key={planId}
                                    planName={selectedPlan.planName}
                                    itemType={selectedPlan.itemType}
                                    validaty={selectedPlan.validaty}
                                    price={selectedPlan.price}
                                    onPress={() => { }}
                                    bottomButtons={showSlidingView}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
                {isVisible && (
                    <Animated.View style={[styles.slidingView, animatedStyle]}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.InActive }]} onPress={hideSlidingView}>
                                <Text style={[styles.buttonText, { color: colors.primary }]}>Clear</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.actionButton]} onPress={isNavigation}>
                                <Text style={[styles.buttonText]}>Proceed</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                )}
                <Toast />
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};

export default HomeScreen;

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
    searchResult: {
        ...boxShadow.basicShadow,
        ...inputFeilds.inputType_1,
        maxHeight: windowHeight - 300,
        marginBottom: 10,
    },
    noResultText: {
        textAlign: "center",
    },
    selectedPlanContainer: {
        backgroundColor: colors.BgColor,
        borderRadius: 8,
        ...boxShadow.basicShadow,
        marginBottom: Margins.m_l,
        overflow: "hidden",
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
    slidingView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 15,
        ...boxShadow.basicShadowreverse,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    actionButton: {
        padding: 10,
        backgroundColor: colors.primary,
        borderRadius: 10,
        width: "45%"
    },
});
