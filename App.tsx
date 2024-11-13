import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SeekerMainPage from './src/components/Home/Main/SeekerMainPage';
import SetterMainPage from './src/components/Home/Main/SetterMainPage';
import MyPageTabView from './src/components/Home/MyPage/MyPageTabView';
import PortfolioPage from './src/components/Home/MyPage/PortfolioPage';
import Review from './src/components/Home/MyPage/Review';
import InitialLogin from './src/components/Auth/InitialLogin';
import ChooseUserType from './src/components/Auth/ChooseUserType';
import SeekerLogin from './src/components/Auth/Seeker/SeekerLogin';
import SeekerComplete from './src/components/Auth/Seeker/SeekerComplete';
import SetterLogin from './src/components/Auth/Setter/SetterLogin';
import SetterComplete from './src/components/Auth/Setter/SetterComplete';
import SeekerSignup from './src/components/Auth/SeekerSignup';
import SetterSignup from './src/components/Auth/SetterSignup';
import StyleSelection from './src/components/Auth/StyleSelection';
import StyleResult from './src/components/Auth/StyleResult';
import BodyType from './src/components/Auth/BodyType';
import Congratulations from './src/components/Auth/Congratulations';
import WeatherProvider from './src/contexts/WeatherProvider';
import WeatherPage from "./src/components/Weather/WeatherPage";
import RequestPage from './src/components/Home/Request/RequestPage';
import RequestApproval from './src/components/Home/Request/RequestApproval';
import RequestForm from './src/components/Home/Request/RequestForm';
import RequestAccepted from './src/components/Home/Request/RequestAccepted';

import { Colors } from 'react-native/Libraries/NewAppScreen';

// 네비게이터 생성
const Stack = createNativeStackNavigator();

function MyPageStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyPageTabView" component={MyPageTabView} />
      <Stack.Screen name="PortfolioPage" component={PortfolioPage} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="RequestApproval" component={RequestApproval} />
      <Stack.Screen name="RequestPage" component={RequestPage} />
      <Stack.Screen name="RequestAccepted" component={RequestAccepted} />
    </Stack.Navigator>
  );
}

// Seeker 전용 네비게이터
function SeekerNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SeekerMainPage" component={SeekerMainPage} />
      <Stack.Screen name="RequestForm" component={RequestForm} />
      <Stack.Screen name="WeatherPage" component={WeatherPage} />
      <Stack.Screen name="RequestApproval" component={RequestApproval} />
      <Stack.Screen name="RequestPage" component={RequestPage} />
      <Stack.Screen name="RequestAccepted" component={RequestAccepted} />
    </Stack.Navigator>
  );
}

// Setter 전용 네비게이터
function SetterNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SetterMainPage" component={SetterMainPage} />
      <Stack.Screen name="MyPageTabView" component={MyPageTabView} />
      <Stack.Screen name="PortfolioPage" component={PortfolioPage} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="RequestApproval" component={RequestApproval} />
      <Stack.Screen name="RequestPage" component={RequestPage} />
      <Stack.Screen name="RequestAccepted" component={RequestAccepted} />
    </Stack.Navigator>
  );
}

// (로그인 전) 네비게이터
function GuestNavigator({ setUserType }) {
  const InitialLoginScreen = (props) => <InitialLogin {...props} setUserType={setUserType} />;

  return (
    <Stack.Navigator initialRouteName="InitialLogin" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InitialLogin" component={InitialLoginScreen} />
      <Stack.Screen name="SeekerLogin" component={SeekerLogin} />
      <Stack.Screen name="SeekerComplete" component={SeekerComplete} />
      <Stack.Screen name="SetterLogin" component={SetterLogin} />
      <Stack.Screen name="SetterComplete" component={SetterComplete} />
      <Stack.Screen name="ChooseUserType" component={ChooseUserType} />
      <Stack.Screen name="SeekerSignup" component={SeekerSignup} />
      <Stack.Screen name="SetterSignup" component={SetterSignup} />
      <Stack.Screen name="StyleSelection" component={StyleSelection} />
      <Stack.Screen name="StyleResult" component={StyleResult} />
      <Stack.Screen name="BodyType" component={BodyType} />
      <Stack.Screen name="Congratulations" component={Congratulations} />
    </Stack.Navigator>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [userType, setUserType] = useState<'guest' | 'seeker' | 'setter'>('guest');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <WeatherProvider>
        <SafeAreaView style={[styles.container, backgroundStyle]}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          {
            userType === 'guest' ? <GuestNavigator setUserType={setUserType} /> :
            userType === 'seeker' ? <SeekerNavigator /> :
            <SetterNavigator />
          }
        </SafeAreaView>
      </WeatherProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
