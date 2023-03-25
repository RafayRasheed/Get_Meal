import { useState } from "react"
import { mockImages, mocks } from "../../Services"


export const restaurantRequest=(location = '') =>{
    return new Promise((resolve, reject)=> {
        const mock = mocks[location]
   
        if (!mock){
            reject('Not Found')
        }
        resolve(mock)
    })
}

export const restaurantTransformData = ({results = []}) => {
    const mapData = results.map((restaurant) => {
        restaurant.photos = restaurant.photos.map((p)=> {
            return mockImages[Math.ceil(Math.random() * (mockImages.length-1))]
        });
        return {
            ...restaurant,
            open: restaurant.opening_hours && restaurant.opening_hours.open_now,
            address: restaurant.vicinity
        };
    })
    return mapData;
}

export const locationMaterial = (name) => {
    const city = locations[name]
    const {geometry} =city.results[0]
    const {lat , lng} = geometry.location
    const {viewport} = geometry
    return {lat, lng, viewport};
}


