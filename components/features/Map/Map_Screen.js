import React, { useContext, useEffect, useState } from "react"
import { ActivityIndicator, Platform, StatusBar, StyleSheet, Text, View } from "react-native"
import { Searchbar } from "react-native-paper"
import { RestaurantContext } from "../Restaurants/Restaurant.Context"


import MapView, { MapMarker, MapCallout } from 'react-native-maps';
import { SearchMap } from "./Search_Map";
import { RestaurantInfo } from "../Restaurants/Res_info";
import { MapResInfo } from "./Map_Res_Info";
import MyColors from "../../utils/MyColors";
import { fontSizes } from "../../utils/Fonts";
import LottieView from "lottie-react-native";



export const MapScreen = ({navigation, loca=null}) => {
    const {restaurants, keyWord,isLoadingLoc, Search, loc, error} = useContext(RestaurantContext)
    const [load, setLoad] = useState(true);

  
    // console.log(loc)
    const [key, setKey] = useState();
    const [latDelta, setLatDelta] = useState();
   
    

    useEffect(() =>{
        // console.log('-----------------')
       if(isLoadingLoc){
        setLoad(true)
       }
    }, [isLoadingLoc])

    //Location change last than the (keyWord, restaurants)
    useEffect(() => {
        const northeast = loc.viewport.northeast.lat
        const southwest = loc.viewport.southwest.lat
        setLatDelta(northeast-southwest)
        setKey(keyWord)
       
        // console.log('ider-----------------')
        
    }, [loc])


    return(
        <View style={styles.container}>
            {load && (<View style={{ position: 'absolute',left: 0,right: 0,top: 0,bottom: 0,zIndex: 2 ,alignItems: 'center',justifyContent: 'center'}}>
                <LottieView
                    style={styles.potatoLottie}
                    // https://lottiefiles.com/122031-potato
                    source={require("../../assets/Lottie/potato.json")}
                    autoPlay={true}
                    loop={true}
                    />
                    </View>
                )}
            <View style={styles.topBar}>
                {/* <SearchMap/> */}
                <Searchbar 
                    style={styles.searchBar} 
                    value = {key}
                    onChangeText= {(value)=> {setKey(value)}}
                    onSubmitEditing = {()=> {
                        if (key!= keyWord){
                            Search(key)
                            setLoad(true)
                        }
                        
                    }}
                />
            </View>
            

            {error && (<View style={{height:'100%',  width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: fontSizes.large, color: MyColors.danger}}>{error}</Text>
            </View>)}

            {!error && (
                <MapView
                style={{height: '100%', width: '100%'}}
                onRegionChangeComplete={()=>setLoad(false)}

                region = {{
                    latitude: loc.lat,
                    longitude: loc.lng,
                    latitudeDelta: latDelta,
                    longitudeDelta: 0.02
                }}>

                {restaurants.map((restaurant) => {
                    return(<MapMarker
                    
                    key={restaurant.place_id}
                    title= {restaurant.name}
                    coordinate={{
                        latitude: restaurant.geometry.location.lat,
                        longitude: restaurant.geometry.location.lng
                    }}
                    >
                    <MapCallout style={{maxWidth: '80%',backgroundColor: MyColors.azure}} onPress={() => {navigation.navigate('RestaurantDetails', {restaurant})}}>
                        <RestaurantInfo restaurant={restaurant} map={true} />
                    </MapCallout>
                    </MapMarker>
                    )
                })}

                </MapView> 
            )}
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        height: '100%'
        // paddingTop: Platform.OS =='ios'? 0: StatusBar.currentHeight,
    },
    topBar:{
        flex: 1,
        width: '100%',
        paddingTop: Platform.OS =='ios'? 50: StatusBar.currentHeight,
        paddingTop:  50,
        paddingHorizontal: 10,
        position: 'absolute',
        zIndex: 1
    },

    searchBar: {
        height: 50
    },
    potatoLottie:{
        width: 200,
        height: 200,
    },
   

})
