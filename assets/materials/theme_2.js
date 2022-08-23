import { DefaultTheme } from 'react-native-paper';
import colors from './colors'

const theme_2 = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.blue,
        background: '#f5f5f5',
        error: colors.red
    },
};

export default theme_2;
