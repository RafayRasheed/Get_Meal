import React from 'react'
import { Image, ScrollView, Text, TouchableHighlight, TouchableHighlightComponent, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Card } from 'react-native-paper'
import { SvgXml } from 'react-native-svg';
import styled from 'styled-components';
import starIcon from '../../assets/starIcon';
import { fonts, fontSizes_px } from '../../utils/Fonts';
import MyColors from '../../utils/MyColors';

const Title = styled(Text)`
    fontFamily: ${fonts.heading3};
    fontSize: ${fontSizes_px.xLarge}
    color: ${MyColors.darkcyan};
    padding: 10px;
`;

const DetailHeading = styled(Text)`
    fontFamily: ${fonts.bodyBold};
    fontSize: ${fontSizes_px.xMedium}
    color: ${MyColors.brown};
    padding: 0px;
`;

const DetailResult  = styled(Text)`
    fontFamily: ${fonts.bodyRegular};
    fontSize: ${fontSizes_px.medium};
    padding: 0px;
`;

const Detail  = ({k='', result='', rating=false, color=MyColors.black }) => (
    <View style={{paddingHorizontal: 10,flexDirection: 'row',alignItems:'flex-end', marginTop:0}}>
        <DetailHeading>{k}</DetailHeading>
        {rating && (<SvgXml key={'o'} xml={starIcon} width={20} height={20} marginEnd={5}/>)}
        <DetailResult style={{color: color}}>{result}</DetailResult>
    </View>
    
)

export const ResFullDetails = ({restaurant={}, navigate}) => {
    // console.log(restaurant)
    const s = 'dryhd rdg dgrdg rgrd grdgrdg drgdr grdg drg rdgrdg dr grdg'
    return(
       
        <Card style={{padding: 5, borderRadius: 0, backgroundColor: MyColors.white}}>
            <Card.Cover  key={restaurant.place_id} source={{uri: restaurant.photos[0]}}/>
            
            <ScrollView  style={{marginHorizontal:'8%'}} contentContainerStyle={{flexGrow: 1 ,justifyContent: 'center'}} horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={{flexDirection: 'row', backgroundColor: MyColors.white}}>
                    <Image  style={{ tintColor: MyColors.black ,alignSelf: 'center',width: 20, height: 20}} source= {{uri: restaurant.icon}}/>
                    <Title >{restaurant.name}</Title>
                </View>
            </ScrollView>
           
            <Detail k={'Address:  '} result={restaurant.address} />
            <Detail k={'Rating:    '} result={restaurant.rating+ '/5   '+restaurant.user_ratings_total+ ' Reviews'} rating={true}/>
            <Detail k={'Status:     '} result={restaurant.open? 'Open Now': 'Close Temporary '} color={restaurant.open? MyColors.success: MyColors.danger}/>
            
           

            <TouchableOpacity activeOpacity={0.8} style={{paddingTop: 20}} onPress={()=>navigate()}>
                    <Image  style={{width: "100%",alignSelf: 'center', height: 80, borderRadius: 10}} source={require('../../assets/Images/google.png')} />
                </TouchableOpacity>
            <View style={{paddingTop:0, alignItems: 'center'}}>
              
                <Title >Timings  &  Menu</Title>
            </View>

        </Card>
    )
}