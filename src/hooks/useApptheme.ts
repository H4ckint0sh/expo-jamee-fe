import {usePreferences} from './usePreferences';

export interface Theme {
  pageColor: string;
  textColor: string;
  linkColor: string;
  lineColor: string;
}

export const DarkTheme: Theme = {
  pageColor: '#000000',
  textColor: '#FAFAFA',
  linkColor: '#616161',
  lineColor: '#212121',
};

export const LightTheme: Theme = {
  pageColor: '#CFD8DC',
  textColor: '#263238',
  linkColor: '#546E7A',
  lineColor: '#90A4AE',
};

export const useAppTheme = () => {
  const {appTheme} = usePreferences();
  return appTheme === 'light' ? LightTheme : DarkTheme;
};
