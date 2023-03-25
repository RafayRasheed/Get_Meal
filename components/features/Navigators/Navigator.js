
import React from 'react'
import { AppNavigator } from "./App.navigator"
import { NavigationContainer } from '@react-navigation/native';
import { useContext } from "react";
import { AuthContext } from "../Firebase/Authentication.Context";
import { AccountNavigator } from './Acc.navigator';

export const Navigator=()=>{
    const {isAuthentication} = useContext(AuthContext)
    return (
      <NavigationContainer>
        {isAuthentication? <AppNavigator/>: <AccountNavigator/>}
      </NavigationContainer>
    )
    
}
