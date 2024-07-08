import AsyncStorage from "@react-native-async-storage/async-storage";
import { extendTheme } from "native-base";
import { StyleSheet } from "react-native";

export const theme = extendTheme({
  fontConfig: {
    Roboto: {
      100: {
        normal: "Roboto-Light",
        italic: "Roboto-LightItalic",
        bold: "Roboto-Bold",
      },
      200: {
        normal: "Roboto-Light",
        italic: "Roboto-LightItalic",
        bold: "Roboto-Bold",
      },
      300: {
        normal: "Roboto-Light",
        italic: "Roboto-LightItalic",
        bold: "Roboto-Bold",
      },
      400: {
        normal: "Roboto-Regular",
        italic: "Roboto-Italic",
        bold: "Roboto-Bold",
      },
      500: {
        normal: "Roboto-Medium",
        italic: "Roboto-MediumItalic",
        bold: "Roboto-Bold",

      },
      600: {
        normal: "Roboto-Medium",
        italic: "Roboto-MediumItalic",
        bold: "Roboto-Bold",
      },
      // Add more variants
      700: {
        normal: 'Roboto-Bold',
      },
      800: {
        normal: 'Roboto-Bold',
        italic: 'Roboto-BoldItalic',
      },
      900: {
        normal: 'Roboto-Bold',
        italic: 'Roboto-BoldItalic',
      },
    },
    Inter: {
      100: {
        normal: "Inter-Light",
        bold: "Inter-Bold",
      },
      200: {
        normal: "Inter-Light",
        bold: "Inter-Bold",
      },
      300: {
        normal: "Inter-Light",
        bold: "Inter-Bold",
      },
      400: {
        normal: "Inter-Regular",
        bold: "Inter-Bold",
      },
      500: {
        normal: "Inter-Medium",
        bold: "Inter-Bold",

      },
      600: {
        normal: "Inter-Medium",
        bold: "Inter-Bold",
      },
      // Add more variants
      700: {
        normal: 'Inter-SemiBold',
      },
      800: {
        normal: 'Inter-Bold',
      },
      900: {
        normal: 'Inter-Bold',
      },
    },
  },
  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: "Roboto",
    body: "Roboto",
    mono: "Roboto",
  },
  colors: {
    // Add new color
    primary: {
      50: '#dcfce7',
      100: '#bbf7d0',
      200: '#86efac',
      300: '#4ade80',
      400: '#22c55e',
      500: '#16a34a',
      600: '#007B43',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    // .... other theme color
  },
})

export const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
  // dependencies: {
  //   'linear-gradient': LinearGradient
  // }
};

export const colorModeManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value) => {
    try {
      await AsyncStorage.setItem('color-mode', value);
    } catch (e) {
      console.log(e);
    }
  },
};

export const FontConfig = StyleSheet.create({
  bodyOne: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16
  },
  bodyTwo: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 20
  },
  bodyThree: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    letterSpacing: 0.4,
    lineHeight: 16
  },
  bodyFive: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    letterSpacing: 0.4,
    lineHeight: 16
  },
  body5: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    letterSpacing: 0.4,
    lineHeight: 16
  },
  bodyFour: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    letterSpacing: 0.4,
    lineHeight: 16
  },
  buttonZero: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
  },
  buttonOne: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    letterSpacing: 0.5
  },
  buttonZeroTwo: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  buttonZeroOne: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 24
  },
  buttonThree: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    letterSpacing: 0.4
  },
  buttonFour: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
  button5: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  button3: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  buttonSix: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
  },
  captionZero: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
  },
  captionMediumOne: {
    fontFamily: 'Inter-Medium',
    fontSize: 10
  },
  bodySix: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    letterSpacing: 0.4
  },
  captionOne: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
    lineHeight: 16
  },
  captionTwo: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12
  },
  captionThree: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 22
  },
  captionFour: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 22
  },
  captionFive: {
    fontFamily: 'Poppins-Regular',
    fontSize: 9,
  },
  captionUpperOne: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11
  },
  captionUpperTwo: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12
  },
  headingOne: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 28
  },
  headingTwo: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    lineHeight: 32,
  },
  headingThree: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    lineHeight: 22,
  },
  headingFour: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16
  },
  titleFour: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1
  },
  titleSemiBoldFour: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: 0.1
  },
  titleSeven: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  linkOne:{
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    letterSpacing: 0.25
  },
  titleOne: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    lineHeight: 28
  },
  title1: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    lineHeight: 28
  },
  titleTwo: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    letterSpacing: 0.1,
    lineHeight: 22
  },
  titleThree: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    letterSpacing: 0.1,
    lineHeight: 20
  },
  title3: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  titleFive: {
    fontFamily: 'Poppins-Bold',
    fontSize: 10,
  },
  title5: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
  titleSix: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    lineHeight: 30,
    width: '90%'
  },
});
/* font sizes */
export const FontSize = {
  linkButtonButtonThree_size: 12,
  bodyBodyTwo_size: 14,
  bodyBodyOne_size: 16,
  headingHeadingTwo_size: 24,
};
/* Colors */
export const Color = {
  danger:'#CB3A31',
  disable: '#BFBFBF',
  divider: '#F0F0F0',
  neutralZeroOne: "#ffff",
  neutralZeroTwo: '#f5f5f5',
  neutralZeroFour: '#E0E0E0',
  neutralZeroSeven: '#757575',
  neutralZeroFive: '#C2C2C2',
  neutralZeroSix: '#9E9E9E',
  neutralTen: '#0A0A0A',
  secondaryMain: "#4744D5",
  neutral70: '#757575',
  neutral40: '#E3E8EF',
  neutral100: '#121926',
  linear: '#E02638',
  primaryMain: "#27374D",
  primaryText: '#262626',
  neutralColorGrayThirteen: "#000",
  neutralColorGrayEight: "#595959",
  neutralColorGrayNine: "#434343",
  secondaryText: "#8c8c8c",
  secondaryMain: '#624FA1',
  lightBorder: '#d9d9d9',
  grayOne: '#FFFFFF',
  grayFour: '#F0F0F0',
  graySix: '#BFBFBF',
  graySeven: '#8c8c8c',
  grayNine: '#434343',
  grayEight: '#595959',
  grayTen: '#262626',
  grayThirteen: '#000000',
  grayTwelve: '#141414',
  redOne: '#FFF2F0',
  title: '#262626',
  warning: '#FAAD14',
  click: '#027FC2',
  surface: '#ECE9F3',
  warningSurface: '#FFFBE6',
  grayTwo: '#FAFAFA',
  focus: '#FB4141',
  border: '#D9D9D9',
  error: '#DC2626',
  successMain: '#22C55E',
  successPressed: '#087839',
  successSurface: '#F0FFF3',
  goldSix: '#FAAD14',
  neutralZeroThree: '#EDEDED',
  purple: '#4744D5',
  magenta: '#E0195E',
  hitam: '#000000',
  putih: '#FFFFFF',
  blue: '#3785C7',
  purpleSurface: '#F7F2FF',
  pink: '#E8519E'
};
/* Paddings */
export const Padding = {
  p_xs: 8,
  p_sm: 10,
  p_md: 20,
  p_lg: 24,
};
/* Margins */
export const Margin = {
  m_xs: 4,
  m_sm: 8,
  m_md: 12,
  m_lg: 20,
  m_xl: 24,
};
/* border radiuses */
export const Border = {
  br_sm: 4,
  br_md: 14,
  br_lg: 20,
};