import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import OTPScreen from "./screen/OTPScreens";
import VerifyOTPScreen from "./screen/VerifyOTPScreens";
import CategoryScreen from "./screen/CategoryScreens";
import UserProfileScreen from "./screen/UserProfileScreen"; 
import OfferScreen from "./screen/OfferScreen"; 
import DailyEarningPage from "./screen/DailyEarningScreen";
import SaveDailyEarningScreen from "./screen/SaveDailyEarningScreen";
import GetDailyEarningsScreen from "./screen/GetDailyEarningsScreen";
import ProfileDetailScreen from "./screen/ProfileDetailScreen";
import { createContext } from 'react';
 
const MyContext = createContext();
const Stack = createStackNavigator();

export default function App() {
  const [sharedValue, setSharedValue] = useState('Hello from context!');
  return (
    
    <NavigationContainer>
      <MyContext.Provider value={{ sharedValue, setSharedValue }}>
      <Stack.Navigator initialRouteName="OTPScreens">
        <Stack.Screen
          name="OTPScreens"
          component={OTPScreen}
          options={{ title: "Generate OTP" }}
        />
        <Stack.Screen
          name="VerifyOTPScreens"
          component={VerifyOTPScreen}
          options={{ title: "Verify OTP" }}
        />
        <Stack.Screen
          name="CategoryScreens"
          component={CategoryScreen}
          options={{ title: "Categories" }}
        />
        <Stack.Screen
          name="UserProfileScreens"
          component={UserProfileScreen}
          options={{ title: "User Profiles" }}
        />
        <Stack.Screen
          name="OfferScreen"
          component={OfferScreen}
          options={{ title: "Offers" }}
        />
        <Stack.Screen
          name="DailyEarnings"
          component={DailyEarningPage}
          options={{ title: "DailyEarnings" }}
        />
        <Stack.Screen
          name="SaveDailyEarning"
          component={SaveDailyEarningScreen}
          options={{ title: "Save Daily Earning" }}
        />
        <Stack.Screen 
          name="GetDailyEarnings" 
          component={GetDailyEarningsScreen} 
          options={{ title: "Daily Earnings" }}
        />
        <Stack.Screen name="ProfileDetailScreen" component={ProfileDetailScreen} />
      </Stack.Navigator>
      
    </MyContext.Provider>
    </NavigationContainer>

    
  );
}
