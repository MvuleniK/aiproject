import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Onboard from './screens/Onboard'
import Landing from './screens/Landing'
import Login from './screens/Login'
import Register from './screens/Register.js'
import ForgotPassword from './screens/ForgotPassword';
import HomeTab from './screens/HomeTab';
import learnMoreDetails from './screens/learnMoreDetails'
import tutorialDetails from './screens/tutorialDetails'
import Search from './screens/Search';
import Info from './screens/Info';
import UpdateName from './screens/UpdateName';
import UpdateEmail from './screens/UpdateEmail';
import ChangePassword from './screens/ChangePassword';
import Reauthenticate from './screens/Reauthenticate';
import PatientProfile from './screens/PatientProfile';
import PatientResult from './screens/PatientResult';

const AppStack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'Nunito-Semibold': require('./assets/fonts/Nunito-SemiBold.ttf'),
    'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf')
  });
  const [showOnboard, setshowOnboard] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value != null) {
        setshowOnboard(false);
      }
    });
  }, [])
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  else {
    return (
      <NavigationContainer>
        <AppStack.Navigator>
          {showOnboard && <AppStack.Screen component={Onboard} name="Onboard" options={{ headerShown: false }} />}
          <AppStack.Screen component={Landing} name="Landing" options={{ headerShown: false }} />
          <AppStack.Screen component={Register} name="Register" />
          <AppStack.Screen component={Login} name="Login" />
          <AppStack.Screen component={ForgotPassword} name="Forgot Password" />
          <AppStack.Screen component={HomeTab} name="HomeTab" options={{ headerShown: false }} />
          <AppStack.Screen component={Search} name="Search" />
          <AppStack.Screen component={Info} name="Info" />
          <AppStack.Screen component={learnMoreDetails} name="Learn More" />
          <AppStack.Screen component={tutorialDetails} name="Tutorial" />
          <AppStack.Screen component={UpdateName} name="Update Name" />
          <AppStack.Screen component={UpdateEmail} name="Update Email" />
          <AppStack.Screen component={ChangePassword} name="Change Password" />
          <AppStack.Screen component={Reauthenticate} name="Reauthenticate" />
          <AppStack.Screen component={PatientProfile} name="Patient Profile" />
          <AppStack.Screen component={PatientResult} name="Patient Result" />
        </AppStack.Navigator>
      </NavigationContainer>
    )
  }
}

