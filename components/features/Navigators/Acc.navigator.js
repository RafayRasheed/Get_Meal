import React from 'react';
import {Text, View} from 'react-native'
import MyColors from '../../utils/MyColors';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { RegisterScreen } from '../Account/Register_Screen';
import { LoginScreen } from '../Account/Login_Screen';
import { HomeScreen } from '../Account/Home_Screen';

const Acc = () => (
    <View style={{flex: 1,justifyContent: 'center', alignItems:'center', backgroundColor: MyColors.rebeccapurple}}>
        <Text>ok</Text>
    </View>
)
export const AccountNavigator =()=> {
    const AccNavStackScreen = createStackNavigator()
    return( 
        <AccNavStackScreen.Navigator
        initialRouteName='HomeScreen'
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS
            }}>
            <AccNavStackScreen.Screen name='HomeScreen' component={HomeScreen}/>
            <AccNavStackScreen.Screen name='RegisterScreen' component={RegisterScreen}/>
            <AccNavStackScreen.Screen name='LoginScreen' component={LoginScreen}/>

        </AccNavStackScreen.Navigator>

    )
}