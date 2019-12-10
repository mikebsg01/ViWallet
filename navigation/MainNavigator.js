import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AccountsScreen from '../screens/AccountsScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import TransactionScreen from '../screens/TransactionScreen';

const AppStack = createStackNavigator({
    Accounts: AccountsScreen,
    Categories: CategoriesScreen,
    Transaction: TransactionScreen
});

const AuthStack = createStackNavigator({ 
    Login: LoginScreen,
    Register: RegisterScreen
});

export default createAppContainer(
    createSwitchNavigator({
        AuthLoading: AuthLoadingScreen,
        Auth: AuthStack,
        App: AppStack
    }, {
        initialRouteName: 'AuthLoading'
    })
);