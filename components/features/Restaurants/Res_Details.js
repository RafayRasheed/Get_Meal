import React, { useEffect, useRef, useState } from 'react'
import { View, LayoutAnimation,Text, SafeAreaView, StyleSheet, Platform, StatusBar, ScrollView, Image, TouchableOpacity } from "react-native"
import { List } from 'react-native-paper';
import { fonts } from '../../utils/Fonts';
import MyColors from '../../utils/MyColors';
import { Favorite } from '../Favorites/Res_fav';
import { ResFullDetails } from './Res_Full_Detail';
 

const Menu={
    BreakFast: 'https://marketplace.canva.com/EAFI_i7T__g/1/0/1131w/canva-brown-black-modern-restaurant-food-menu-portrait-MqWj4UijfwU.jpg',
    Lunch: 'https://images.sirved.com/ChIJYWwXBPslTIYRCFLzWOPnqwI/5b6b0c8fdfdf5.jpg',
    Haiti: 'https://image.zmenu.com/menupic/6247363/94b457fd-ce61-45ee-b68d-d018d1728f42.jpg',
    Dinner: 'https://img.freepik.com/free-vector/creative-restaurant-menu-digital-use-with-photo_52683-45622.jpg',
}

const category=[
    {
    
        name: 'Break Fast',
        icon: 'bread-slice',
        menu: [{
                image:'https://marketplace.canva.com/EAFI_i7T__g/1/0/1131w/canva-brown-black-modern-restaurant-food-menu-portrait-MqWj4UijfwU.jpg',
                width: 0,
                height: 0,
            },
        ],
        timings: '8:00 AM  -  9:30 AM'  
        
    },

    {
        name: 'Lunch',
        icon: 'hamburger',
        menu: [{
                image:'https://images.sirved.com/ChIJYWwXBPslTIYRCFLzWOPnqwI/5b6b0c8fdfdf5.jpg',
                width: 0,
                height: 0,
            },
            {
                image: 'https://images.sirved.com/ChIJYWwXBPslTIYRCFLzWOPnqwI/5b6b0c8fdfdf5.jpg',
                width: 0,
                height: 0,
            }
        ],
        timings: '2:00 PM  -  4:00 PM'  
        
    }, 
    { 
        name: 'Haiti',
        icon: 'food',
        menu: [{
                image: 'https://images.sirved.com/ChIJYWwXBPslTIYRCFLzWOPnqwI/5b6b0c8fdfdf5.jpg',
                width: 0,
                height: 0,
            },
            {
                image: 'https://image.zmenu.com/menupic/6247363/94b457fd-ce61-45ee-b68d-d018d1728f42.jpg',
                width: 0,
                height: 0,
            },
            {
                image: 'https://marketplace.canva.com/EAFI_i7T__g/1/0/1131w/canva-brown-black-modern-restaurant-food-menu-portrait-MqWj4UijfwU.jpg',
                width: 0,
                height: 0,
            },
        ],
        timings: '5:00 PM  -  7:00 PM'  
        
    },

    {   
       
        name: 'Dinner',
        icon: 'food-variant',
        menu: [
            {
                image: 'https://img.freepik.com/free-vector/creative-restaurant-menu-digital-use-with-photo_52683-45622.jpg',
                width: 0,
                height: 0,
            },
            {
                image: 'https://marketplace.canva.com/EAFI_i7T__g/1/0/1131w/canva-brown-black-modern-restaurant-food-menu-portrait-MqWj4UijfwU.jpg',
                width: 0,
                height: 0,
            },
            {
                image: 'https://image.zmenu.com/menupic/6247363/94b457fd-ce61-45ee-b68d-d018d1728f42.jpg',
                width: 0,
                height: 0,
            },
        ],
        timings: '9:00 PM  -  11:30 PM'  
    }, 
]

const Timings={
    BreakFast: '8:00 AM  -  9:30 AM',
    Lunch: '2:00 PM  -  4:00 PM',
    Haiti: '5:00 PM  -  7:00 PM',
    Dinner: '9:00 PM  -  11:30 PM', 
}





export const RestaurantDetails= ({route, navigation}) => {
    const {restaurant} = route.params;
    const [ref, setRef] = useState()
    const [position, setPosition] = useState([])
    const [expended, setExpended] = useState([])    
    const [hei, setHei] = useState([])
   
    function toMap(){
        navigation.navigate('ResMap', {restaurant})
    }
    useEffect(()=>{

    },[])
    const scrollHandler=(i)=>{
        // console.log("------", i,  hei)
        ref.scrollTo({
            x: 0,
            y: i,
            animated: true,
        })
    }

    const Categories = ({i=0, detail={}}) => {
        let images = detail.menu 

        return(
            <View
                onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                const s = parseInt(layout.y)
                const h = parseInt(layout.height)
                const f= s+h
                position[i]=f
                // console.log('dgfgdfg ',f)
                setPosition(position)
            }}>
    
            <List.Accordion
                theme={styles.onExpendTheme}
                style={styles.expendedList}
                titleStyle={styles.listHeading}
                onExpendTheme={()=>console.log('gjj v hu uuh')}
                onPress={() => { 
                    if(expended[i]){
                        expended[i]=false
                        setExpended(expended)
                    }
                    else{
                        // console.log(position[i])
                        scrollHandler(position[i])
                        LayoutAnimation.easeInEaseOut()
                        expended[i]=true
                        setExpended(expended)
                    }
                    console.log(expended)
                    }}
                title= {detail.name}
                left={(props)=> <List.Icon style={{tintColor: MyColors.brown}} {...props} icon={detail.icon}/>}
            >
                <List.Item  style={{paddingStart: 0}} titleStyle={styles.timingsText}  title= {detail.timings}></List.Item>
               
                <ScrollView horizontal={true} style={styles.scrollMenu} contentContainerStyle={styles.scrollMenuContainer}>
                    {images.map((image, i)=> 
                        <TouchableOpacity key={i} activeOpacity={0.7} onPress={()=>navigation.navigate('ImageViewer', {images, i})}>
                            <Image style={styles.menu} source= {{uri: image.image}}/>
                        </TouchableOpacity>)}
                </ScrollView>
            </List.Accordion>
            </View>
        )
    }
    return(
        <SafeAreaView 
            onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                const s = parseInt(layout.y)
                const h = parseInt(layout.height)
            }}
            
            style= {styles.container}>
                <ScrollView ref={(ref)=>{
                    setRef(ref)
                }}>
                <Favorite restaurant={restaurant}/>
                <ResFullDetails restaurant={restaurant} navigate={toMap}/>
                {category.map((item,i)=>
                    <Categories key={i} i={i} detail={item}/>
                )}

                </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS==='android'? StatusBar.currentHeight: 0,
        backgroundColor: MyColors.white
    },

    expendedList: {
        paddingHorizontal:10,
        borderWidth: 0.5,
        borderColor: MyColors.lightgray,
    },
    onExpendTheme: {
        colors: {primary: MyColors.brown}
    },

    listHeading: {
       
    },

    timingsText: {
        color: MyColors.darkcyan,
        fontFamily:fonts.heading3,
        alignSelf: 'center'
    },

    scrollMenu: {
        paddingStart: 0, 
        paddingStart: 0, 

        // borderWidth: 1,
        elevation: 1,
        // borderColor: MyColors.lightgray,
        marginBottom: 5
        
        // backgroundColor:MyColors.lightgray
    },
    scrollMenuContainer: {
        flexGrow: 0.95 ,
        justifyContent: 'center',

    },

    menu: {
        width: 150, height: 200, padding: 5, marginStart: 10, marginEnd: 3
    },

    



})
