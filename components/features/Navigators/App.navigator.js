
import React, { useContext } from 'react'
import MyColors from '../../utils/MyColors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { FavoriteRestaurants } from '../Favorites/Res_Fav_Screen';
import { MapScreen } from '../Map/Map_Screen';
import { ResScreen } from '../Restaurants/Res_Nav_Screen';
import { AuthContext } from '../Firebase/Authentication.Context';
import { RestaurantContextProvider } from '../Restaurants/Restaurant.Context';
import { FavoritesContextProvider } from '../Favorites/Favorites.Context';
import { SettingsScreen } from '../Setting/Settings';



const Icons={
    Restaurants: 'md-restaurant-sharp',
    Map: 'md-map',
    Settings: 'md-settings',
    Favorites: 'md-heart'
  }
  
  const screenOptions =({route}) => {
    const iconName=Icons[route.name]
    return{
      tabBarIcon: ({color, size }) =>  
      <Ionicons name={iconName} size={size} color={color} />
    }
  }

  function fav() {
    
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
 
  
const Tab = createBottomTabNavigator();

export const AppNavigator = () => (
    
    <FavoritesContextProvider>
      <RestaurantContextProvider>
      <Tab.Navigator
          tabBarActiveTintColor={MyColors.darkcyan}
          tabBarInactiveTintColor= {MyColors.silver}
          screenOptions={screenOptions}
          >
          <Tab.Screen name="Restaurants" component={ResScreen} options={{headerShown: false}}/>
          <Tab.Screen name="Favorites" component={FavoriteRestaurants} />
          <Tab.Screen name="Map" component={MapScreen} options={{headerShown: false}}/>
          <Tab.Screen name="Settings" component={SettingsScreen} />

        </Tab.Navigator>
      </RestaurantContextProvider>
    </FavoritesContextProvider>

        
)
