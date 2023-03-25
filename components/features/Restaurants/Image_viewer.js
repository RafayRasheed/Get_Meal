import React, { useEffect, useState } from 'react'
import { Image, View , Dimensions, Animated, StyleSheet, Platform, StatusBar, SafeAreaView, Text, Modal} from 'react-native'
import MyColors from '../../utils/MyColors';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import {Ionicons} from '@expo/vector-icons'

export const ImageViewer =({navigation, route})=>{
    const images = route.params.images
    const i = route.params.i 
    const [index, setIndex]= useState(i)
    const [ratio, setRatio] = useState(1)
    const wid= Dimensions.get('window').width
    const image = images[index].image
    const imgLength = images.length
    const[animationX, setAnimationX]= useState(new Animated.Value(0));
    const [showChange, setShowChange ] = useState(true)
    const [toFalse, setToFalse ] = useState(true)

    const logOutZoomState = (event, gestureState, zoomableViewEventObject) => {
        setToFalse(false)
    }

    function handlePressIn(){
        Animated.timing(animationX, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }
  
    Image.getSize(image, (width, height) => {
        setRatio(height/width)
    })

    function onForward(){
        if(index <imgLength-1){
            Animated.timing(animationX, {
                toValue: -500,
                duration: 100,
                useNativeDriver: true,
            }).start();

            setTimeout(()=>{
                setIndex(index+1)
                setAnimationX(new Animated.Value(500))
    
            },50)
        }
    }

    function onBack(){
        if(index>0){
            Animated.timing(animationX, {
                toValue: 500,
                duration: 100,
                useNativeDriver: true,
            }).start();

            setTimeout(()=>{
                setIndex(index-1)
                setAnimationX(new Animated.Value(-500))
            },50)
        }
    }

    function change(){
        console.log(toFalse)
        if(toFalse){
            setShowChange(!showChange)
        }
        else{setToFalse(true)}
    }

    return(
        <SafeAreaView style={styles.container}>
            {imgLength>1 && showChange && (
                <View style={[styles.containerChangeImage, styles.containerChangeLeft]}>
                    <Ionicons 
                        style={{paddingVertical: 25, opacity: index==0? 0.3: 1}} 
                        name={"ios-chevron-back-sharp"} size={40} color="#fff" onPress={onBack}/>
                </View>)
            }

            {imgLength>1 && showChange && (<View style={[styles.containerChangeImage, styles.containerChangeRight]}>
                <Ionicons 
                    style={{paddingVertical: 25,opacity: index==imgLength-1? 0.3: 1}} 
                    name={"ios-chevron-forward-sharp"} size={40} color="#fff" onPress={onForward} 
                />
                </View>)
            }
            {showChange && (
                <View style={styles.topBar}>
                <Ionicons name={"arrow-back"} size={30} color="#fff" onPress={()=>navigation.goBack()}/>
                {imgLength>1 && (<View style={{flexDirection: 'row'}}>
                    <Text style={{color: MyColors.white, fontSize: 25, alignSelf: 'center' }}>{index+1}/{imgLength}</Text>
                </View>)}
                <Ionicons name={"share-social"} size={25} color="#fff" />
                </View>
            )

            }

            

            <View style={{flex: 1,justifyContent: 'center'}} onTouchEnd={()=>change()}>
                {/* <ImageShowing images={images} i={current}/> */}
                <ReactNativeZoomableView
                    key={index}
                    zoomEnabled={true}
                    maxZoom={1.5}
                    minZoom={1}
                    zoomStep={0.5}
                    initialZoom={1}
                    bindToBorders={true}
                    style={styles.zoomableView}
                    onZoomAfter={logOutZoomState}>
                    

                <Animated.View  style={{transform: [{translateX: animationX}]}}>
                    <Image onLoadEnd={handlePressIn} 
                        key={index} resizeMode="contain"
                        style={{width: '100%', 
                        height: wid*ratio }} 
                        source= {{uri:image}}/>
                </Animated.View>
                    
                </ReactNativeZoomableView>
            </View>
        </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    container: {
        backgroundColor: MyColors.black,
        flex: 1, 
        paddingTop: Platform.OS=='android'?StatusBar.currentHeight: 0
    },

    topBar:{
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignContent: 'center',
        alignItems:'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',top:40, zIndex:2,
    },

    containerChangeImage: {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        position: 'absolute',top:'50%',
        zIndex:1, alignItems: 'center',
        flexDirection: 'row',
    },

    containerChangeLeft:{
        borderTopEndRadius: 15,
        borderBottomEndRadius: 15,
        left: 0,
    },
    
    containerChangeRight:{
        borderTopStartRadius: 15,
        borderBottomStartRadius: 15,
        right: 0,
    },
})