import { StyleSheet, Dimensions, Platform, PixelRatio } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export const colors = {
    BgColor: "#FFFFFF",
    primary: "#193B8B",
    success: "#50C878",
    TextColor: "#202020",
    Secondary: "#807272",
    Dark: "#000000",
    InActive: "#C6DFE6",
    Danger: "FF6161",
    DarkText: "#000000",
    LightText: "#FFFFFF",
    placeholder: "#C6DFE6"
}


type WidthStylesType = {
    [key: string]: { width: number };
};
export const widthStyles: WidthStylesType = {};
for (let i = 5; i <= 100; i += 5) {
    widthStyles[`w_${i}`] = {
        width: windowWidth * (i / 100),
    };
}

export const width = StyleSheet.create(widthStyles);


const { width: SCREEN_WIDTH } = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;

export function normalize(size: number): number {
    const newSize = size * scale;

    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 8;
    }
}


export const FontSizes = {
    small: normalize(18),    // Small font size
    normal: normalize(20),  // Regular font size
    regular: normalize(24),  // Regular font size
    medium: normalize(28),   // Medium font size
    large: normalize(32),    // Large font size
    extraLarge: normalize(36), // Extra large font size
};

export const inputFeilds = StyleSheet.create({
    inputType_1: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        fontSize: FontSizes.normal,
    }
})


export const boxShadow = StyleSheet.create({
    basicShadow: {
        backgroundColor: '#fff',
        shadowColor: "#AAA",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
    whiteShadow: {
        shadowColor: "#FFF",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})


export const InputFieldIcon = StyleSheet.create({
    iconHolder: {
        position: "relative"
    },
    icon: {
        position: "absolute",
        top: "50%",
        right: 25,
        transform: [{ translateY: -0.5 }], // Adjust -12.5 to match half the icon's height for proper centering
    },
})


function normalizeMargins(size: number): number {
    return Math.round(size * scale);
}

export const Margins = {
    m_s: normalizeMargins(4),
    m_m: normalizeMargins(8),
    m_l: normalizeMargins(12),
    m_xl: normalizeMargins(16),
    m_xxl: normalizeMargins(20),
};

export const Padding = {
    p_s: normalizeMargins(4),   // Small
    p_m: normalizeMargins(8),   // Medium
    p_l: normalizeMargins(12),  // Large
    p_xl: normalizeMargins(16), // Extra Large
    p_xxl: normalizeMargins(20),// XX-Large 

}