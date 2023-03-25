import React, { useContext, useEffect, useRef, useState } from 'react';
import {AntDesign} from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity } from 'react-native';
import MyColors from '../../utils/MyColors';
import { FavoritesContext } from './Favorites.Context';
import LottieView from "lottie-react-native";

export const Favorite =({restaurant})=> {
    // const restaurant= res
    const {favorites, addFavorite, removeFavorite} = useContext(FavoritesContext)
    const isFavorite= favorites.find((x)=> x.place_id === restaurant.place_id)
    const [fav, setFav] = useState(null);
    const animation = useRef(null);
    const  [first, setFirst]  = useState(true);

  

    const handle=()=> {
        if(isFavorite){
            // setFav(false)
            removeFavorite(restaurant) 
        }
        else{
            // setFav(true)
            addFavorite(restaurant)
        }
    }


    useEffect(()=>{
        if(first){
            if(isFavorite!=null){
                animation.current.play(62, 62);
            } 
            else{
                animation.current.play(181, 181);
            }
            setFirst(false)  
        }
        else{
            if(isFavorite!=null){
                animation.current.play(16, 62);
            } 
            else{
          
                animation.current.play(110, 181);
            }
        }

    },[isFavorite])

    return(
        <TouchableOpacity style={styles.favorite} onPress={()=> handle()}>
        
            <LottieView
                ref={animation}
                style={styles.heartLottie}
                source={require("../../assets/Lottie/heart.json")}
                autoPlay={false}
                loop={false}
              />
           
            {/* <AntDesign name='heart' size={25} color={fav?MyColors.red:MyColors.white}/> */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    favorite: {
        padding: 10,
        position: 'absolute',
        top: -20,
        right: -15,
        zIndex: 10,
    },

    heartLottie:{
        height: 85,
        width: 85,
    }
})