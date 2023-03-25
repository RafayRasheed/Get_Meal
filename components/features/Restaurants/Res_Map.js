import React, { useContext,useState, useEffect } from "react"
import { ActivityIndicator, Platform, StatusBar, StyleSheet, Text, View } from "react-native"


import MapView, { MapMarker, MapCallout } from 'react-native-maps';
// import { MapResInfo } from "./Map_Res_Info";
import MyColors from "../../utils/MyColors";
import { fontSizes } from "../../utils/Fonts";
import { RestaurantInfo } from "./Res_info";
import { RestaurantContext } from "./Restaurant.Context";

export const ResMap = ({navigation, route}) => {
    const {loc} = useContext(RestaurantContext)
    const [load, setLoad] = useState(true);
    const {restaurant} = route.params
    const [latDelta, setLatDelta] = useState();
    const lat=restaurant.geometry.location.lat
    const lng=restaurant.geometry.location.lng

  
    useEffect(() =>{
        const northeast = loc.viewport.northeast.lat
        const southwest = loc.viewport.southwest.lat
        setLatDelta(northeast-southwest)
    }, [loc])

    return(
        <View style={styles.container}>
            {!load && (<View style={{ position: 'absolute',left: 0,right: 0,top: 0,bottom: 0,zIndex: 2 ,alignItems: 'center',justifyContent: 'center'}}>
              <ActivityIndicator size= {70} color={MyColors.primary} animating={true}/></View>)}

            {/* {error && (<View style={{height:'100%',  width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: fontSizes.large, color: MyColors.danger}}>{error}</Text>
            </View>)} */}

           
            <MapView
                style={{height: '100%', width: '100%'}}
                region = {{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: latDelta,
                    longitudeDelta: 0.02
                }}>

                <MapMarker
                    key={restaurant.place_id}
                    title= {restaurant.name}
                    coordinate={{
                        latitude: lat,
                        longitude: lng
                    }}>

                    <MapCallout style={{maxWidth: '80%',backgroundColor: MyColors.azure}} onPress={() => {navigation.navigate('RestaurantDetails', {restaurant})}}>
                        <RestaurantInfo  restaurant={restaurant} map={true} />
                    </MapCallout>
                </MapMarker>
            </MapView> 
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
        paddingTop: 50,
        paddingHorizontal: 10,
        position: 'absolute',
        zIndex: 1
    },

    searchBar: {
        height: 50
    }
   

})
