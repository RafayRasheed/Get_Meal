import React, {useContext, useEffect, useState} from 'react'
import { View,TouchableOpacity,Text, StyleSheet } from 'react-native';
import { AuthContext } from '../Firebase/Authentication.Context';
import MyColors from '../../utils/MyColors';
import { fonts, fontSizes} from '../../utils/Fonts';
import {Ionicons, AntDesign, Feather} from '@expo/vector-icons'
import firebase from 'firebase/compat';
import { TextInput } from 'react-native-paper';
import LottieView from "lottie-react-native";


export const SettingsScreen=()=>{
  const {logout, user, userPassword, setUserPassword} = useContext(AuthContext)
  const [name, setName] = useState(user.displayName) 
  const [email, setEmail] =useState(user.email)
  
  const [isLoadBox, setIsLoadBox] = useState(false)
  const [typeBox, setTypeBox] = useState(false)
  const [isLoad, setIsLoad] = useState(false)

  const [firebaseError, setFirebaseError] = useState(null)
  
  const cUsernameText= 'Change Username'
  const cPasswordText = 'Change Password'
  const logoutText = 'Logout'

  useEffect(()=>{
    setName(user.displayName)
    setEmail(user.email)
    setName(user.displayName)
    setEmail(user.email)
  },[user])

  const Divider = ()=>(
    <View style={styles.divider}/>
  )
  const BoxHeading=({text=''})=>(
    <View style={{alignItems:'center', paddingBottom:7}}><Text style={[styles.textName,{color: MyColors.darkcyan}]}>{text}</Text></View>
    
  )
  const FirebaseLoadAndError=()=>(
    
    <View style={styles.containerLoad}>
      {firebaseError?(
        <View style={styles.containerInsideLoad}>
        <Text style={{color: MyColors.red, fontSize: fontSizes.xLarge, padding:0 , fontFamily:fonts.heading3 }}
            >Error</Text>
        <Text style={{fontSize: fontSizes.medium, padding:2, fontFamily:fonts.body }}
            >{firebaseError}</Text>
        <TouchableOpacity 
        onPress={()=>{
          setFirebaseError(null)
          setIsLoad(false)

          }} activeOpacity={0.7} 
            style={{backgroundColor: MyColors.dodgerblue, justifyContent: 'center', alignItems: 'center', 
            borderRadius:5,alignSelf:'center',padding: 8, marginTop:20}}>
            <Text style={styles.textButton}>Ok</Text>
        </TouchableOpacity>
      </View>
      ):(
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









  const LogoutBox =() =>{
  return(
    <View>
      <AntDesign style={{alignSelf: 'center'}} name='questioncircleo' size={40} color={MyColors.darkgreen}/>
      <Text style={[styles.testBody, {paddingVertical: 15,}]}>Are you sure to Log Out?</Text>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <TouchableOpacity activeOpacity={0.6} onPress={()=>setIsLoadBox(false)} >
          <Text style={[styles.testBody,{color: MyColors.dodgerblue}]}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity activeOpacity={0.6} onPress={()=>logout()} >
          <Text style={[styles.testBody,{color: MyColors.dodgerblue}]}>Ok</Text>
        </TouchableOpacity>
      </View>
    </View>
  )}










  const ChangePassBox = ()=>{
    const [passText, setPassText]= useState(null);
    const [conPassText, setConPassText]= useState(null);
    const [newPassText, setNewPassText]= useState(null);

    const [isPassError, setIsPassError]= useState(null);
    const [isNewPassError, setIsNewPassError]= useState(null);
    const [isConPassError, setIsConPassError]= useState(null);

    const [showNewPass, setShowNewPass] = useState(false)
    const [showConPass, setConShowPass] = useState(false)

    const regPassword = /^(?=\w)(?=.*\d)(?=.*\.)/;

    function changePass(){
      let s=1
        if(userPassword!==passText){
            setIsLoad(false)
            setIsPassError('Incorrect Password')
            return
        }
        if(!checkNewPassword()){
            s-=1
        }
        if(!checkConPassword()){
            s-=1  
        }
        if(s==1){
          setIsLoad(true)
          firebase.auth().currentUser.updatePassword(conPassText)
          .then(() =>{
            setUserPassword(conPassText)
            setIsLoad(false)
            setIsLoadBox(false)
          }).catch((error)=> {
            setFirebaseError(error.message)
          });
        }
    }
    
    function checkNewPassword(){
      if(newPassText){
          if(newPassText.length>=6){
              if(regPassword.test(newPassText)){
                setIsNewPassError(null)
                  return true
              }
              setIsNewPassError('Password should contains letter, number & .')
              return false
          }
          setIsNewPassError('Password length must be greater than 6')
          return false
      }
      setIsNewPassError('Enter a Password')
      return false
    }
    function checkConPassword(){
        if(conPassText){
            if(checkNewPassword()){
                if(newPassText===conPassText){
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

    return(
      <View>
        
        <TextInput 
            error={isPassError} mode='outlined' outlineStyle={{borderRadius: 5}} 
            theme={{colors: {primary: MyColors.dodgerblue}}}
            onChangeText={(value)=>setPassText(value)}
            value={passText}
            autoCapitalize='none'
            onResponderStart={()=>setIsPassError(null)}
            label={'Current Password'} 
            />

        {isPassError && <Text style={{color: MyColors.black, fontSize: 12}}>Error: {isPassError}</Text>}
        
        <View style={{paddingVertical :5}}/>
        
        <TextInput 
            error={isNewPassError} mode='outlined' outlineStyle={{borderRadius: 5}} 
            theme={{colors: {primary: MyColors.dodgerblue}}}
            onChangeText={(value)=>setNewPassText(value)}
            value={newPassText}
            autoCapitalize='none'
            onResponderStart={()=>setIsNewPassError(null)}
            label={'New Password'}
            secureTextEntry={!showNewPass}
            right={<TextInput.Icon size={20} icon={'eye'} onTouchEnd={()=>setShowNewPass(false)} onTouchStart={()=>setShowNewPass(true)}/>} 
            />

        {isNewPassError && <Text style={{color: MyColors.black, fontSize: 12}}>Error: {isNewPassError}</Text>}

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

        <View style={{flexDirection: 'row', justifyContent: 'flex-end', paddingTop:10}}>
          <TouchableOpacity activeOpacity={0.6} onPress={()=>setIsLoadBox(false)} >
            <Text style={[styles.testBody,{color: MyColors.dodgerblue}]}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6} onPress={()=>changePass()} >
            <Text style={[styles.testBody,{color: MyColors.dodgerblue}]}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }












  const ChangeNameBox = ()=>{
    const [nameText, setNameText]= useState();
    const [isNameError, setNameError]= useState();

    useEffect(()=>{
      setNameText(name)
    },[])

    const changeName=()=>{
      if(nameText && nameText!==name){
        if(nameText.length>3){
          setIsLoad(true)
          firebase.auth().currentUser.updateProfile({
            displayName: nameText,
          })
          .then(()=>{
            setIsLoad(false)
            setIsLoadBox(false)
            setName(nameText)
          })
          .catch((e)=>{
            setFirebaseError(e.message)})
          return
        }
        setNameError('Name is too short')
        return
      }
      setNameError('Enter a new name')
    }

    return(
      <View>
        <TextInput  error={isNameError} mode='outlined' outlineStyle={{borderRadius: 5}} 
          theme={{colors: {primary: MyColors.dodgerblue}}}
          onChangeText={(value)=>setNameText(value)}
          value={nameText}
          onResponderStart={()=>setNameError(null)}
          label={'Username'} 
          selectTextOnFocus={true}
          selectionColor={MyColors.lightblue}
        />
        {isNameError && <Text style={{color: MyColors.black, fontSize: 12}}>Error: {isNameError}</Text>}
      
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', paddingTop:10}}>
          <TouchableOpacity activeOpacity={0.6} onPress={()=>setIsLoadBox(false)} >
            <Text style={[styles.testBody,{color: MyColors.dodgerblue}]}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity activeOpacity={0.6} onPress={()=>changeName()} >
            <Text style={[styles.testBody,{color: MyColors.dodgerblue}]}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }












  const Box=()=>{
    return(
      <View style={styles.containerBox}>
        <View style={styles.containerInsideBox}>
          {typeBox!==logoutText &&<BoxHeading text={typeBox}/>}
          {typeBox===cUsernameText && <ChangeNameBox heading={cUsernameText}/>} 
          {typeBox===logoutText && <LogoutBox />}
          {typeBox===cPasswordText && <ChangePassBox heading={cPasswordText}/>}
        </View>
      </View>
    )
  }










  return (
    <View style={styles.container}>
      {isLoad &&(<FirebaseLoadAndError/>)}
      {isLoadBox &&(<Box />)}

      <View style={styles.containerProfile}>
        <View style={styles.profile}>
          <Text style={styles.textProfile}>{name.charAt(0).toUpperCase()}</Text>
        </View>
        
        <View style={{marginHorizontal:10}}>
          <Text style={styles.textName}>{name}</Text>
          <Text style={{fontFamily: fonts.body, fontSize: fontSizes.medium}}>{email}</Text>
        </View>
      </View>
      
      <Divider/>

      <TouchableOpacity  activeOpacity={0.6} 
        onPress={()=>{
          setIsLoadBox(true)
          setTypeBox(cUsernameText)
          }
        }> 
          <View style={styles.containerProfile}>
            <Ionicons name='person-outline' size={23}/>
            <Text style={styles.testBody}>{cUsernameText}</Text>
          </View>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.6}  
        onPress={()=>{
          setIsLoadBox(true)
          setTypeBox(cPasswordText)
          
        }}> 
        <View style={styles.containerProfile}>
          <AntDesign name='lock' size={25}/>
          <Text style={styles.testBody}>{cPasswordText}</Text>
        </View>
      </TouchableOpacity>

      <Divider/>

      <TouchableOpacity activeOpacity={0.6}  
        onPress={()=>{
          setIsLoadBox(true)
          setTypeBox(logoutText)
        
          }}> 
          <View style={styles.containerProfile}>
            <AntDesign style={{paddingStart: 2}} name='logout' size={24}/>
            <Text style={[styles.testBody,{fontSize: fontSizes.large}]}>{logoutText}</Text>
          </View>
      </TouchableOpacity>
    </View>
  );
}














const styles=StyleSheet.create({
  container:{
    flex: 1
  },

  containerProfile:{
    flexDirection:'row', padding: 13, alignItems: 'center',
  },

  containerBox:{
    height: '100%',width: '100%', position: 'absolute',zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', justifyContent: 'center',
    alignItems: 'center' 
  },

  containerInsideBox:{
    width:'85%', padding: 15,backgroundColor: MyColors.white,
    borderRadius: 20, elevation:3 
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

  profile:{
    width: 65,height:65,backgroundColor: MyColors.dodgerblue,
    justifyContent: 'center', alignItems:'center',
    borderRadius: 100,
  },

  textProfile:{
    fontSize: 40, fontFamily: fonts.heading3, color:MyColors.white
  },

  testBody:{
    paddingHorizontal:10, paddingVertical: 5,
    fontFamily: fonts.body, fontSize: fontSizes.medium
  },

  divider:{
    width: '100%', height: 1, backgroundColor: MyColors.lightgray, 
    marginVertical: 2, marginHorizontal:10
  },

  textName:{
    fontFamily: fonts.lato900Black, fontSize: fontSizes.large
  },

  textButton:{
    paddingHorizontal: 10,color: MyColors.white, fontSize: fontSizes.medium, fontFamily: fonts.heading3
  },

  potatoLottie:{
    width: 200,
    height: 200,
  },


})