import React, {createContext, useEffect, useState} from "react";
import { MyMocks } from "../../Services";
import { restaurantRequest, restaurantTransformData, locationMaterial } from "./Restaurant.Services";
import { locations } from "../../Services"


export const RestaurantContext = createContext();


export const RestaurantContextProvider = ({children}) => {

    const[restaurants, setRestaurants] = useState();
    const[isLoading, setIsLoading] = useState(true);
    const[error, setError] = useState(null);
    const[keyWord, setKeyWord] = useState('Chicago');
    const[loc, setLoc] = useState(null);
    const[isLoadingLoc, setIsLoadingLoc] = useState(true);
 
    const RetrieveRestaurants = (location='') =>{
        
        setKeyWord(location)
    }
    const setLocation = (name) => {
        const city = locations[name]
        const {geometry} =city.results[0]
        const {lat , lng} = geometry.location
        const {viewport} = geometry
        setLoc({lat, lng, viewport})
    }
  
    useEffect(() => {
        setIsLoading(true);
        setIsLoadingLoc(true)
        setError(null)
        setIsLoadingLoc(true);

        let key =  MyMocks[keyWord.toLowerCase()];

        if(key){
            setTimeout(()=> {
                restaurantRequest(key)
                .then(restaurantTransformData)
                .then((results) => {
                    setRestaurants(results);
                    setIsLoading(false);
                })
                .then(setLocation(keyWord.toLowerCase()))
                .then(()=>{
                    setIsLoadingLoc(false);
                })
                .catch((err)=> {
                    setError(err)
                    setIsLoading(false);
                    setIsLoadingLoc(false);
                });
            }, 1000);
        }
        else{
            setError("Not Found")
            setIsLoading(false)
        }
    },[keyWord])

    return(
    <RestaurantContext.Provider 
        value={{
            restaurants,
            isLoading,
            isLoadingLoc,
            error,
            keyWord,
            loc,
            Search: RetrieveRestaurants,
            }}
    >{children}</RestaurantContext.Provider>)
}