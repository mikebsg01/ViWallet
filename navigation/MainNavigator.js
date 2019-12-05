import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';

const AuthStack = createStackNavigator({ 
    Login: LoginScreen
});

export default createAppContainer(
    createSwitchNavigator({
        AuthLoading: AuthLoadingScreen,
        Auth: AuthStack
    }, {
        initialRouteName: 'AuthLoading'
    })
);