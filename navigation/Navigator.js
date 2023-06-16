import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewsOverview from "../screens/NewsOverview";
import Home from "../screens/Home";
import Saved from "../screens/Saved";


const Tab = createBottomTabNavigator();

const HomeScreen = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Saved" component={Saved} />
        </Tab.Navigator>
    );
};

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />
                <Stack.Screen  name="NewsOverView" component={NewsOverview} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};


export default AppNavigator;