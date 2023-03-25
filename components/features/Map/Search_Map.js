import React, { useContext, useEffect, useState } from "react"
import { Platform, StatusBar, StyleSheet, View } from "react-native"
import { Searchbar } from "react-native-paper"
import { RestaurantContext } from "../Restaurants/Restaurant.Context"

export const SearchMap = () => {
    const {keyWord, Search} = useContext(RestaurantContext)
    const [key, setKey] = useState('San Francisco');
   
    useEffect(() => {
        setKey(keyWord)
    }, [keyWord])

    return(
        <View style={styles.topBar}>
            <Searchbar 
                style={styles.searchBar} 
                value = {key}
                onChangeText= {(value)=> {setKey(value)}}
                onSubmitEditing = {()=> {
                    Search(key)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    topBar:{
        flex: 1,
        width: '100%',
        paddingTop: Platform.OS =='ios'? 50: StatusBar.currentHeight,
        paddingHorizontal: 10,
        position: 'absolute',
        zIndex: 1
    },

    searchBar: {
        height: 50
    }
})