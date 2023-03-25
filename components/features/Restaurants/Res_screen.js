import React, {useContext, useEffect, useState} from 'react';
import {StatusBar,FlatList, Platform,SafeAreaView, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';

import { Searchbar } from 'react-native-paper';
import { fonts, fontSizes } from '../../utils/Fonts';
import MyColors from '../../utils/MyColors';
import { RestaurantContext } from './Restaurant.Context';
import { FavoriteRestaurants } from '../Favorites/Res_Fav_Screen';
import { RestaurantInfo } from './Res_info';
import LottieView from "lottie-react-native";
import {Ionicons} from '@expo/vector-icons'

// import { Search } from './Search';

//navigation is a prop provided by resScreenStack.Screen from Res_screen.js
export const RestaurantScreen = ({navigation}) =>{
    const {restaurants, isLoading, error, Search, keyWord} = useContext(RestaurantContext);
    const [key, setKey] = useState();
    const [isFavOn, setIsFavOn] = useState(false)
    
    //Use only when KeyWord changes
    useEffect(() => {
      setKey(keyWord)
    }, [keyWord])

    return(
      <SafeAreaView style={styles.container}>
          <View style={styles.topBar}>
              <Searchbar 
                icon= {()=><Ionicons name='check' size={40}/>}
                // onIconPress={()=> setIsFavOn(!isFavOn)}
                style={styles.searchBar} 
                value = {key}
                onChangeText= {(value)=> {setKey(value)}}
                onSubmitEditing = {()=> {
                  if(key!=keyWord) {
                    Search(key);
                  }
                }}
              /> 
          </View>

          {isLoading && (<View style={{height: '95%', justifyContent: 'center', alignItems: 'center'}}>
          <LottieView
                    style={styles.potatoLottie}
                    // https://lottiefiles.com/122031-potato
                    source={require("../../assets/Lottie/fries.json")}
                    autoPlay={true}
                    loop={true}
                    />
                    </View>)
              }

          {error && (<View style={{height: '95%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: fontSizes.large, color: MyColors.danger}}>{error}</Text>
          </View>)}

          <View style={styles.homeBar}>
              <FlatList  
                data={restaurants}
                renderItem={(item) => {
                  // console.log('===================================');
                  // console.log(item.place_id);
                  const restaurant = item.item
                  return(
                    <TouchableOpacity activeOpacity={0.85} onPress={()=> navigation.navigate('RestaurantDetails', {restaurant}) }>
                      <View style={{paddingHorizontal: 10, paddingVertical: 5 }}>
                        <RestaurantInfo restaurant={restaurant}/>            
                      </View>  
                    </TouchableOpacity>
                  
                  ) 
                }}
                keyExtractor= {(item)=> item.place_id }
                contentContainerStyle={null}
              />
          </View>
          
          
      </SafeAreaView>
    )}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: MyColors.info,
      paddingTop: Platform.OS==='android'? StatusBar.currentHeight: 0,
    },

    searchBar: {
      marginHorizontal: 5,
      backgroundColor: MyColors.white,
      borderColor: MyColors.lightgray,
      borderWidth: 0.5,
      height: 50
    
    },
  
    topBar: {
      // backgroundColor: MyColors.white,
      padding: 4,
    },
  
    textBar:{
      fontSize: 26,
      fontFamily: fonts.content,
    },
  
    homeBar: {
      flex:1,
      padding: 0, 
      
    },
    potatoLottie:{
      width: 200,
      height: 200,
  }
    
  
  });
  