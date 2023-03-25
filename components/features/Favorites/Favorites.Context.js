import React , {createContext, useState, useEffect, useContext }from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../Firebase/Authentication.Context';

export const FavoritesContext= createContext();

export const FavoritesContextProvider = ({children}) =>{
    const {user} = useContext(AuthContext)
    const [favorites, setFavorites] = useState([]);

    const add=(restaurant)=> {
        setFavorites([...favorites, restaurant])
    }
    const remove= (restaurant) => {
        const newFav = favorites.filter((x)=> x.place_id !== restaurant.place_id);
        setFavorites(newFav)
    }
    const SaveFavorites = async (favorites, uid) => {
        try {
          const jsonValue = JSON.stringify(favorites)
          await AsyncStorage.setItem(uid, jsonValue)

        } catch (e) {
            console.log('error SaveFavorites',e)
        }
    }
    const getFavorite = async (uid) => {
        try {
          const jsonValue = await AsyncStorage.getItem(uid)
          if( jsonValue != null){
            setFavorites(JSON.parse(jsonValue))

        }
        } catch(e) {
            console.log('error getFavorite',e)

        }
      }

    useEffect(()=>{
        const uid = user.uid
        if(uid){
            SaveFavorites(favorites, uid)
        }
        
    },[favorites, user])

    useEffect(()=>{
        const uid = user.uid
        if(uid){
         getFavorite(uid)
        }
        
    },[user])

    return(
        <FavoritesContext.Provider value={{
            favorites, 
            addFavorite: add,
            removeFavorite: remove
        }}>

        {children}</FavoritesContext.Provider>
    )
};