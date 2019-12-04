import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';

const Navigator = createStackNavigator({
    LoginScreen,
}, {
	initialRouteName: 'LoginScreen'
});

export default createAppContainer(Navigator);