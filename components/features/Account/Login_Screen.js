import React, { createContext, useContext, useEffect, useState } from 'react';
import { View, Text, ImageBackground ,SafeAreaView,ScrollView, Button, TouchableOpacity, StyleSheet, ActivityIndicator, StatusBar} from 'react-native';
import { TextInput } from 'react-native-paper';
import { fonts, fontSizes } from '../../utils/Fonts';
import MyColors from '../../utils/MyColors';
import { AuthContext } from '../Firebase/Authentication.Context';
import LottieView from "lottie-react-native";

export const LoginScreen =({navigation})=> {
    const {isError,login}= useContext(AuthContext)

    const [isPassError, setIsPassError]= useState(null);
    const [isEmailError, setEmailError]= useState(null);

    const [emailText, setEmailText]= useState('nk4945462@gmail.com');
    const [passText, setPassText]= useState('rafay.123');

    const [isLoad, setIsLoad] = useState(false)
    const [showPass, setShowPass] = useState(false)

    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;


    const OnLoadView = () =>{
        return(
            <View style={styles.containerLoad}>
                {isError? (<View style={styles.containerInsideLoad}>
                    <Text style={{color: MyColors.red, fontSize: fontSizes.xLarge, padding:0 , fontFamily:fonts.heading3 }}
                        >Error</Text>
                    <Text style={{fontSize: fontSizes.medium, padding:2, fontFamily:fonts.body }}
                        >{isError}</Text>
                    <TouchableOpacity onPress={()=>ok()} activeOpacity={0.7} 
                        style={{backgroundColor: MyColors.dodgerblue, justifyContent: 'center', alignItems: 'center', 
                        borderRadius:5,alignSelf:'center',padding: 8, marginTop:20}}>
                        <Text style={styles.textButton}>Ok</Text>
                    </TouchableOpacity>
                </View>): (
                    
                    <LottieView
                    style={styles.potatoLottie}
                    // https://lottiefiles.com/122031-potato
                    source={require("../../assets/Lottie/potato.json")}
                    autoPlay={true}
                    loop={true}
                    />
                    
                    )}
            </View>
        )
    }
    function ok(){
        setIsLoad(false)
        // <ActivityIndicator color={MyColors.dodgerblue} size={60}/>
 
    }
    function checkEmail(){
        if(emailText.length>0){
            if(regEmail.test(emailText)){
                setEmailError(null)
                return true
            }
            setEmailError('Invalid email')
            return false
        }
        setEmailError('Enter a email')
        return false
    }

    function checkPassword(){
        if(passText.length==0){
            setIsPassError('Enter a password')
            return false
        }
        setIsPassError(null)
        return true
    }

    function onLogin(){
        let s=1
        if(!checkEmail()){
            s-=1
        }
        if(!checkPassword()){
            s-=1
        }
        if(s==1){
            setIsLoad(true)
            login(emailText, passText)
        }
    }

    return(
        <ImageBackground style={styles.backImageContainer} source={require('../../assets/Images/ttp.jpg')}>
            <View style={styles.lighting}/>
            {isLoad &&(<OnLoadView />)}
            <ScrollView style={{  zIndex: 2, marginBottom: 10}}>
            <SafeAreaView style={styles.container}>
                <LottieView
                    style={styles.burgerLottie}
                  
                     // https://lottiefiles.com/102780-cateringfork-knife
                     source={require("../../assets/Lottie/cateringfork.json")}
                    autoPlay={true}
                    loop={true}
                    duration={4000}
                />
                <View style={styles.accountContainer}>
                    <TextInput  error={isEmailError} mode='outlined' outlineStyle={{borderRadius: 5}} 
                    theme={{colors: {primary: MyColors.dodgerblue}}}
                    onChangeText={(value)=>setEmailText(value)}
                    value={emailText}
                    autoCapitalize='none'
                    onResponderStart={()=>setEmailError(null)}
                    label={'Email'} 
                    />
                    {isEmailError && <Text style={{color: MyColors.black, fontSize: 12}}>Error: {isEmailError}</Text>}

                    <View style={{paddingVertical :5}}/>

                    <TextInput 
                        error={isPassError} mode='outlined' outlineStyle={{borderRadius: 5}} 
                        theme={{colors: {primary: MyColors.dodgerblue}}}
                        onChangeText={(value)=>setPassText(value)}
                        value={passText}
                        autoCapitalize='none'
                        onResponderStart={()=>setIsPassError(null)}
                        label={'Password'}
                        secureTextEntry={!showPass}
                        right={<TextInput.Icon size={20} icon={'eye'} onTouchEnd={()=>setShowPass(false)} onTouchStart={()=>setShowPass(true)}/>} 
                        />
                        {isPassError && <Text style={{color: MyColors.black, fontSize: 12}}>Error: {isPassError}</Text>}


                    <View style={{paddingTop: 15,flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity onPress={()=>navigation.goBack()} activeOpacity={0.7} style={styles.button}>
                            <Text style={styles.textButton}>Back</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>onLogin()} activeOpacity={0.7} style={styles.button}>
                            <Text style={styles.textButton}>Login</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
            </ScrollView>
            
            
        </ImageBackground>   
    )
}

const styles= StyleSheet.create({
    backImageContainer: {
        flex: 1
    },

    container:{
        flex: 1,
        paddingTop: Platform.OS=='android'? StatusBar.currentHeight: 0,
        alignItems:'center',
    },

    containerLoad:{
        width: '100%', height: '100%', position: 'absolute', zIndex: 5, 
        backgroundColor: 'transparent',  justifyContent: 'center', 
        alignItems: 'center'
    },

    containerInsideLoad:{
        width: '85%', backgroundColor: MyColors.lightWhite, padding: 15, 
        borderRadius: 10, elevation:10
    },

    lighting:{
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.35)',
    },

    accountContainer: {
   
        width: '90%',
        padding: 35,
        backgroundColor:  'rgba(203, 240, 247, 0.4)',
        borderRadius: 15
    },

    button:{
       padding: 12, backgroundColor: MyColors.dodgerblue, justifyContent: 'center', alignItems: 'center', borderRadius:7
    },

    textButton:{
        paddingHorizontal: 10,color: MyColors.white, fontSize: fontSizes.medium, fontFamily: fonts.heading3
    },
    burgerLottie:{
        width: 250,
        height: 250,
        paddingTop: 20
    },
    potatoLottie:{
        width: 200,
        height: 200,
    }
    
})