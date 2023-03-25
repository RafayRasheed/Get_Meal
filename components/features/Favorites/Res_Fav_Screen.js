import React, { useContext, useEffect } from 'react';
import { ScrollView, View ,Text, StyleSheet, SafeAreaView, TouchableOpacity,Platform, StatusBar } from 'react-native';
import { fonts, fontSizes,  } from '../../utils/Fonts';
import MyColors from '../../utils/MyColors';
import { FavoritesContext } from './Favorites.Context';
import {RestaurantInfo} from '../Restaurants/Res_info';

export const FavoriteRestaurants = ({navigation}) => {
    const {favorites}= useContext(FavoritesContext)
    const isEmpty = favorites.length==0
    return(
        <SafeAreaView style={[styles.container, isEmpty &&{justifyContent: 'center', alignItems:'center'}]}>
            {favorites.length>0? 
                (<ScrollView style={styles.scrollMenu}>
                {favorites.map((restaurant)=>
                    <TouchableOpacity key={restaurant.place_id} onPress={()=> navigation.navigate('RestaurantDetails', {restaurant})} activeOpacity={0.8} style={{marginVertical: 5}}>
                        <RestaurantInfo key={restaurant.place_id} restaurant={restaurant}/>
                    </TouchableOpacity> 
                )}
            </ScrollView>): 
            (<Text style={{fontFamily: fonts.heading2, fontSize: fontSizes.large}}
                >No Favorites</Text>)}

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollMenu: {
        padding: 10,
        // borderWidth: 1,
        elevation: 1,
        // borderColor: MyColors.lightgray,
        marginBottom: 0
        
        // backgroundColor:MyColors.lightgray
    },
    scrollMenuContainer: {
        flexGrow: 0. ,
        justifyContent: 'center',

    },

})