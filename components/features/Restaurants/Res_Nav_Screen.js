
import { createStackNavigator , TransitionPresets} from "@react-navigation/stack";
import { ImageViewer } from "./Image_viewer";
import { RestaurantDetails } from "./Res_Details";
import { ResMap } from "./Res_Map";
import { RestaurantScreen } from "./Res_screen";


const ResScreenStack = createStackNavigator()
export const ResScreen = () => {
    return(
        <ResScreenStack.Navigator 
          
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.ModalSlideFromBottomIOS
                }}>
            <ResScreenStack.Screen
                name="Restaurant"
                component={RestaurantScreen}
            />
            <ResScreenStack.Screen
                name="RestaurantDetails"
                component= {RestaurantDetails}
            />
            <ResScreenStack.Screen
                name="ImageViewer"
                component={ImageViewer}
            />
            <ResScreenStack.Screen
                name="ResMap"
                component={ResMap}
            />
        </ResScreenStack.Navigator>
    )
}