import React from 'react'
import { Image, StyleSheet, Text, View , } from 'react-native'
import { Svg, Image as ImageSvg } from 'react-native-svg'


export const MapResInfo =({IMAGE=''}) =>{
    console.log('--------------------------------------------------------------------')
    console.log(IMAGE)
    return(
        <View style={styles.container}>
            {/* <ImageSvg  preserveAspectRatio="xMidYMid slice" width={'100%'} height={'100%'} href={{uri: IMAGE}}/> */}
            <Text>
                <Image style={{width: 200, height: 150, padding: 5}} source= {{uri: IMAGE}}/>
            </Text>
        </View>
       
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1

    }
})
