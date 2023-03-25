import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { View, Text, ImageBackground , Button, TouchableOpacity,SafeAreaView, StyleSheet, ActivityIndicator, ScrollView, StatusBar} from 'react-native';
import { TextInput } from 'react-native-paper';
import { fonts, fontSizes } from '../../utils/Fonts';
import MyColors from '../../utils/MyColors';
import { AuthContext } from '../Firebase/Authentication.Context';
import {Ionicons} from '@expo/vector-icons/'
import LottieView from "lottie-react-native";

export const RegisterScreen =({navigation})=> {
    const {isSignUpSuccessful,setIsSignUpSuccessful,signUp, isError}= useContext(AuthContext)

    const [isPassError, setIsPassError]= useState(null);
    const [isConPassError, setIsConPassError]= useState(null);
    const [isEmailError, setEmailError]= useState(null);
    const [isNameError, setNameError]= useState(null);

    const [nameText, setNameText]= useState('name');
    const [emailText, setEmailText]= useState('nk4945462@gmail.com');
    const [passText, setPassText]= useState('rafay.123');
    const [conPassText, setConPassText]= useState('rafay.123');

    const [isLoad, setIsLoad] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [showConPass, setConShowPass] = useState(false)

    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const regPassword = /^(?=\w)(?=.*\d)(?=.*\.)/;

    const animation = useRef(null);
    
    const OnLoadView = () =>{
        return(
            <View style={styles.containerOnLoad}>
            {isError? (
                <View style={styles.containerInsideOnLoad}>
                    <Text style={{color: MyColors.red, fontSize: fontSizes.xLarge, padding:0 , fontFamily:fonts.heading3 }}
                        >Error</Text>
                    <Text style={{fontSize: fontSizes.medium, padding:2, fontFamily:fonts.body }}
                        >{isError}</Text>
                    <TouchableOpacity onPress={()=>okError()} activeOpacity={0.7} 
                        style={{backgroundColor: MyColors.dodgerblue, justifyContent: 'center', alignItems: 'center', 
                        borderRadius:5,alignSelf:'center',padding: 8, marginTop:20}}>
                        <Text style={styles.textButton}>Ok</Text>
                    </TouchableOpacity>
                </View>
                ): 
                (<LottieView
                    style={styles.potatoLottie}
                    // https://lottiefiles.com/122031-potato
                    source={require("../../assets/Lottie/potato.json")}
                    autoPlay={true}
                    loop={true}
                    />)}
            </View>
        )
    }

    const OnSignUpSuccessful = () =>{
        return(
            <View style={styles.containerOnSignUp}>
   
                <View style={styles.containerInsideOnSignUp}>

                    {/* <Ionicons name='checkmark' size={20} style={{paddingVertical: 9,paddingHorizontal: 10,borderRadius: 100,marginBottom:10, backgroundColor:MyColors.lightgreen}}/> */}
                    <LottieView
                        ref={animation}
                        style={styles.heartLottie}
                        source={require("../../assets/Lottie/check.json")}
                        autoPlay={false}
                        loop={false}
                    />
                  

                    <Text style={{color: MyColors.green, fontSize: fontSizes.medium, fontFamily:fonts.heading3 }}
                            >Account Created Successfully</Text>

                    <TouchableOpacity onPress={()=> okSuccessful()} activeOpacity={0.7} 
                        style={{backgroundColor: MyColors.dodgerblue, justifyContent: 'center', alignItems: 'center', 
                            borderRadius:5,alignSelf:'center',padding: 8, marginTop:20}}>
                        <Text style={styles.textButton}>Ok</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    useEffect(()=>{
        if(isSignUpSuccessful){
            setTimeout(()=>{animation.current.play(0, 60)},100)
        }
    }, [isSignUpSuccessful])


    function okError(){
        setIsLoad(false) 
    }

    function okSuccessful(){
        setIsSignUpSuccessful(false)
        navigation.replace('LoginScreen')
    }

    function checkName(){
        if(nameText.length>0){
            if(nameText.length>3){
                setNameError(null)
                return true
            }
            setNameError('username is too short')
            return false
        }
        setNameError('Enter a username')
        return false
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
        if(passText.length>0){
            if(passText.length>=6){
                if(regPassword.test(passText)){
                    setIsPassError(null)
                    return true
                }
                setIsPassError('Password should contains letter, number & .')
                return false
            }
            setIsPassError('Password length must be greater than 6')
            return false
        }
        setIsPassError('Enter a Password')
        return false
    }

    function checkConPassword(){
        if(conPassText.length> 0){
            if(checkPassword()){
                if(passText===conPassText){
                    setIsConPassError(null)
                    return true
                }
                setIsConPassError('Password not matched')
                return false
            }
            setIsConPassError('First enter a password')
            return false
        }
        setIsConPassError('Enter password again')
        return false
    }


    function onSignUp(){
        let s=1
        if(!checkName()){
            s-=1
        }
        if(!checkEmail()){
            s-=1
        }
        if(!checkPassword()){
            s-=1
        }
        if(!checkConPassword()){
            s-=1  
        }
        if(s==1){
            setIsLoad(true)
            signUp(nameText,emailText, passText)
        }
    }

    return(
        <ImageBackground style={styles.backImageContainer} source={require('../../assets/Images/ttp.jpg')}>
            
            <View style={styles.lighting}/>

            {isLoad && (<OnLoadView />)}
            {/* <OnSignUpSuccessful/> */}
            {isSignUpSuccessful && (<OnSignUpSuccessful/>)}
            
                <SafeAreaView style={styles.container}>
                    <View style={styles.accountContainer}>
                        <TextInput  error={isNameError} mode='outlined' outlineStyle={{borderRadius: 5}} 
                            theme={{colors: {primary: MyColors.dodgerblue}}}
                            onChangeText={(value)=>setNameText(value)}
                            value={nameText}
                            onResponderStart={()=>setNameError(null)}
                            label={'Username'} 
                            />

                        {isNameError && <Text style={{color: MyColors.black, fontSize: 12}}>Error: {isNameError}</Text>}

                        <View style={{paddingVertical :5}}/>

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
                        
                        <View style={{paddingVertical :5}}/>

                        <TextInput 
                            error={isConPassError} mode='outlined' outlineStyle={{borderRadius: 5}} 
                            theme={{colors: {primary: MyColors.dodgerblue}}}
                            onChangeText={(value)=>setConPassText(value)}
                            value={conPassText}
                            autoCapitalize='none'
                            onResponderStart={()=>setIsConPassError(null)}
                            label={'Confirm Password'}
                            secureTextEntry={!showConPass}
                            right={<TextInput.Icon size={20} icon={'eye'} onTouchEnd={()=>setConShowPass(false)} onTouchStart={()=>setConShowPass(true)}/>} 
                            />
                        
                        {isConPassError && <Text style={{color: MyColors.black, fontSize: 12}}>Error: {isConPassError}</Text>}

                        <View style={{paddingTop: 15,flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TouchableOpacity onPress={()=>navigation.goBack()} activeOpacity={0.7} style={styles.button}>
                                <Text style={styles.textButton}>Back</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>onSignUp()} activeOpacity={0.7} style={styles.button}>
                                <Text style={styles.textButton}>Sign-Up</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </SafeAreaView>
                
         
            
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
        justifyContent: 'center',
        alignItems:'center',
        zIndex: 2
    },
    containerOnLoad:{
        width: '100%', height: '100%', position: 'absolute', zIndex: 5, 
        backgroundColor: 'transparent',  justifyContent: 'center', alignItems: 'center'
    },

    containerInsideOnLoad:{
        width: '85%', backgroundColor: MyColors.lightWhite, padding: 15, 
        borderRadius: 15, elevation:10
    },

    containerOnSignUp:{
        width: '100%', height: '100%', position: 'absolute', 
        zIndex: 5, backgroundColor: 'transparent',  justifyContent: 'center', 
        alignItems: 'center'
    },

    containerInsideOnSignUp:{
        width: '85%', borderColor: MyColors.green,backgroundColor: MyColors.lightWhite, 
        padding: 15, borderRadius: 15,justifyContent: 'center', 
        alignItems: 'center', elevation: 10
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
    heartLottie:{
        height: 85,
        width: 85,
      
    },
    
    button:{
        padding: 12, backgroundColor: MyColors.dodgerblue,
        justifyContent: 'center', alignItems: 'center', borderRadius:7
    },

    textButton:{
        paddingHorizontal: 10,color: MyColors.white, fontSize: fontSizes.medium, fontFamily: fonts.heading3
    },
    potatoLottie:{
        width: 200,
        height: 200,
    },
})