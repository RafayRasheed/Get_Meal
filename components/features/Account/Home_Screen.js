import React from 'react';
import { View, Text, ImageBackground , Button, TouchableOpacity, StyleSheet, Platform, SafeAreaView, StatusBar, ScrollView} from 'react-native';
import { fonts, fontSizes } from '../../utils/Fonts';
import MyColors from '../../utils/MyColors';
import {Ionicons} from '@expo/vector-icons/'
import LottieView from "lottie-react-native";

export const HomeScreen= ({navigation}) =>{
    return(
        <ImageBackground style={styles.backImageContainer} source={require('../../assets/Images/ttp.jpg')}>
            <View style={styles.lighting}/>
            <ScrollView style={{  zIndex: 2, marginBottom: 10}}>
                <SafeAreaView style={styles.container}>
                    <LottieView
                        style={styles.burgerLottie}
                        // https://lottiefiles.com/18067-delicious-burger
                        // source={require("../../assets/Lottie/delicious.json")}
                        // https://lottiefiles.com/102780-cateringfork-knife
                        source={require("../../assets/Lottie/cateringfork.json")}
                        autoPlay={true}
                        loop={true}
                        duration={4000}
                    />
                    <Text style={{color: MyColors.darkblue,zIndex: 2,fontFamily: fonts.heading3,
                            fontSize:33 , marginBottom: 10}}
                        >Get  Meal</Text>
                    <View style = {styles.accountContainer}>
                        <TouchableOpacity onPress={()=>navigation.navigate('LoginScreen')} activeOpacity={0.7} style={styles.button}>
                            <Ionicons name='log-in-outline' color={MyColors.white} size={20}/>
                            <Text style={styles.textButton}>Login</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={()=>navigation.navigate('RegisterScreen')} activeOpacity={0.7} style={[styles.button,{marginTop: 10}]}>
                            <Ionicons name='mail-open-outline' color={MyColors.white} size={20}/>
                            <Text style={styles.textButton}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ScrollView>
            
            
        </ImageBackground>
    )
}


const styles =StyleSheet.create({
    backImageContainer: {
        flex: 1
    },

    container:{
        flex: 1,
        paddingTop: Platform.OS=='android'? StatusBar.currentHeight: 0,
        alignItems:'center',
    },

    lighting:{
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
    },

    accountContainer: {
        padding: 25,
        backgroundColor:  'rgba(203, 240, 247, 0.4)',
        borderRadius: 15
    },

    button:{
       flexDirection: 'row', padding: 15, backgroundColor: MyColors.dodgerblue, 
       alignItems: 'center', borderRadius:10
    },

    textButton:{
        paddingHorizontal: 10, color: MyColors.white, fontSize: fontSizes.medium, 
        fontFamily: fonts.heading3
    },

    burgerLottie:{
        width: 300,
        height: 300,
        paddingTop: 10
    }
})
   
