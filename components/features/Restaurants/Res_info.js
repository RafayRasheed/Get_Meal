import { Text, StyleSheet, View, Image } from "react-native"

// yarn add react-native-paper
import { Card } from "react-native-paper";
import { SvgXml, SvgUri } from "react-native-svg";
import MyColors from "../../utils/MyColors";
import { fonts, fontSizes, fontSizes_px } from '../../utils/Fonts';
// yarn add -D @types/styled-components-react-native
import styled from "styled-components/native";
import starIcon from "../../assets/starIcon";

import openIcon from "../../assets/openIcon";
import { Favorite } from "../Favorites/Res_fav";


const TitleInfo = styled(View)`
    padding: 3px;
    ${'' /* flex-direction: row;
    justifyContent: space-between; */}
`;

const FirstRow = styled(View)`
    flex-direction: row;
    justifyContent: space-between;
`;

const Title = styled(Text)`
    fontFamily: ${fonts.heading3};
    fontSize: ${fontSizes_px.medium}
    color: ${MyColors.black};
    
`;

const Closed = styled(Text)`
    fontFamily: ${fonts.heading3};
    fontSize: ${fontSizes_px.medium};
    height: 25px;
    marginStart: 3px;
    color: ${MyColors.danger}
`;
const Open = styled(Text)`
    fontFamily: ${fonts.heading3};
    fontSize: ${fontSizes_px.medium};
    height: 25px;
    marginStart: 3px;
    color: ${MyColors.success}
`;

const SecondRow = styled(View)`
    flex-direction: row;
    justifyContent: space-between;
`;

const Address = styled(Text)`
    fontFamily: ${fonts.body};
    fontSize: ${fontSizes_px.small}
    color: ${MyColors.black};
    padding-top: 3px;
    padding-bottom: 8px;
`;

const Rating = styled(View)`
    flex-direction: row;
    ${'' /* alignSelf: flex-end; */}
`;


export const RestaurantInfo = ({restaurant={}, map=false}) =>{
    const{
        place_id = '1',
        name= 'Premium Burgers Restaurant',
        address= 'Badurabad Street 200,  Karachi',
        photos= ['https://media.gettyimages.com/id/694198404/photo/burgers-and-fries.jpg?s=612x612&w=0&k=20&c=ctGFhG1GKgnhYpiWQjQP1YDtCxchOfOS083mEEDms5s=',
        'https://media.gettyimages.com/id/1313326790/photo/healthy-veggie-burger-with-vegan-patty-fresh-tomatoes-lettuce-and-potatofries-served-on.jpg?s=1024x1024&w=gi&k=20&c=yrIVZ2r0V29nAf9dANHq-9T152v9zcrhKWxiz8bMkWo=',
    ''],
        icon= 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
        rating= 1,
        open= true,
    }=restaurant;

    // console.log(map)
    const rat = Array.from(new Array(Math.floor(rating)))

    return(
        <Card style={styles.card}>
            {!map && (<Favorite restaurant={restaurant}/>)}
            {!map && (<Card.Cover key={place_id} style={styles.cardCover} source={{uri: photos[0]}}/>)}
    
            <TitleInfo style={{flexDirection: 'row'}}>
                <View style={styles.titles}>
                    <Title numberOfLines={1}> {name}</Title>
                    <Address numberOfLines={1}> {address}</Address>
                </View>
                <View style={styles.detail}>
                    <Rating>
                        {rat.map((_, i)=> 
                            <SvgXml key={`Star_${place_id}_${i}`} xml={starIcon} width={20} height={20}/>
                        )}
                    </Rating>
                    <View style={{flexDirection: 'row'}}>
                        {open && <Open>Open</Open>} 
                        {!open && <Closed>Close</Closed>} 
                        {!map && (<Image style={{width: 20, height: 20, marginEnd: 3, marginStart:10}} source= {{uri: icon}}/>)} 
                    </View>
                        
                </View>
            </TitleInfo>
            
        </Card>  
    )

}

const styles = StyleSheet.create({
    card: {
        backgroundColor: MyColors.white,
        padding: 5,
        borderRadius: 0,
        borderTopWidth: 1,
        borderTopColor: MyColors.lightgray
    },

    cardCover: {
        padding: 5,
        backgroundColor: MyColors.white,
    },

    titles: {
        width: '70%',
        paddingEnd: 10
    },
    detail: {
        width: '30%', 
        alignItems: 'flex-end'
    },

})