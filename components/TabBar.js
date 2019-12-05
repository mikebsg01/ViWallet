import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { withNavigation } from 'react-navigation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCreditCard, faShoppingBasket, faChartBar } from '@fortawesome/free-solid-svg-icons';

class TabBar extends Component {
    
    icon = (iconName) => {
        if (iconName == 'credit-card') return faCreditCard;
        else if (iconName == 'shopping-basket') return faShoppingBasket;
        else if (iconName == 'chart-bar') return faChartBar;
        return null;
    }
	
	renderTab = ({ text, route, iconName }) => {
		const { selected, navigation  } = this.props;

		return (
			<TouchableOpacity style={styles.tab} onPress={() => navigation.navigate(route)}>
                <FontAwesomeIcon icon={this.icon(iconName)} size={24} style={styles.tabIcon} />
                { selected === route && <Text style={styles.tabText}>{text}</Text> }
				{ selected === route && <View style={styles.tabLine}/> }
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				{this.renderTab({ text: 'Cuentas', route: 'Accounts', iconName: 'credit-card' })}
				{this.renderTab({ text: 'Categorías', route: 'Categories', iconName: 'shopping-basket' })}
				{this.renderTab({ text: 'Resumen', route: 'Overview', iconName: 'chart-bar' })}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: 60,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		backgroundColor: '#f9f9f9',
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0
	},
	tab: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
        flexDirection: 'column',
        paddingVertical: 8
    },
    tabIcon: {
        marginVertical: 1
    },
    tabText: {
        marginVertical: 1
    },
	tabLine: {
		position: 'absolute',
		backgroundColor: 'red',
		height: 4,
		left: 16,
		right: 16,
		bottom: 0
	}
});

export default withNavigation(TabBar);