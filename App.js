
import React from 'react';
import { useFonts as Oswald, Oswald_400Regular, Oswald_300Light, Oswald_200ExtraLight, Oswald_500Medium, Oswald_700Bold} from '@expo-google-fonts/oswald';
import { useFonts as Lato, Lato_400Regular, Lato_900Black, Lato_100Thin, Lato_300Light} from '@expo-google-fonts/lato';

import { Navigator } from './components/features/Navigators/Navigator';
import firebase from 'firebase/compat';
import { AuthContextProvider } from './components/features/Firebase/Authentication.Context';

const firebaseConfig = {
  apiKey: "AIzaSyAsBEVxFeMeZVK1-kVNUNep9TSdVEWu0q8",
  authDomain: "getmeal-bae55.firebaseapp.com",
  projectId: "getmeal-bae55",
  storageBucket: "getmeal-bae55.appspot.com",
  messagingSenderId: "813335174282",
  appId: "1:813335174282:web:94e0cb38c0c7cc838fa173"
};

// Initialize Firebase
const app=firebase.initializeApp(firebaseConfig);

export default function App() {

  const[oswaldLoaded]= Oswald({
    Oswald_400Regular,Oswald_500Medium,Oswald_700Bold,Oswald_300Light, Oswald_200ExtraLight, 
  })
  const[latoLoaded]= Lato({
    Lato_400Regular,Lato_900Black, Lato_100Thin, Lato_300Light
  })

  // if(!isAuthentication) return null;
  
  if(!oswaldLoaded || !latoLoaded){
    return null
  }
  console.log('--------------------------------------------------------------')  
  return (
    <AuthContextProvider>
      <Navigator/>
    </AuthContextProvider>
  );
}








