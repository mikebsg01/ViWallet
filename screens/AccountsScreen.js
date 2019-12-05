import React, { Component } from 'react';
import TabBar from '../components/TabBar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { 
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import {
    faCreditCard,
    faMoneyBill,
    faArrowDown
} from '@fortawesome/free-solid-svg-icons';

export default class AccountsScreen extends Component {

    static navigationOptions = {
        header: null
    };

    state = {
        firstName: null,
        lastName: null,
        email: null
    };

    constructor(props) {
        super(props);
        this.getUser = this.getUser.bind(this);
    }

    getUser = async () => {
        try {
            const session = JSON.parse(await AsyncStorage.getItem('session'));

            this.setState({
                firstName: session.firstName,
                lastName: session.lastName,
                email: session.email,
            });
        } catch (error) {
            alert('Ocurrió un error al cargar los datos.');
        }
    };

    componentDidMount() {
        this.getUser();
    }

    onPressRecharge() {
        alert('Recargar');
    }

	render() {
		return (
        <View style={styles.container}>
            <Text style={styles.lblTitle}>Mis cuentas</Text>
            <ScrollView contentContainerStyle={styles.scrollContentContainer}>
                <View style={styles.accountView}>
                    <FontAwesomeIcon icon={faCreditCard} style={styles.accountIcon}/>
                    <Text style={styles.accountType}>Tarjeta de débito</Text>
                    <TouchableOpacity onPress={this.onPressRecharge} style={styles.accountOptionButton}>
                        <FontAwesomeIcon icon={faArrowDown} style={styles.accountOptionButtonIcon}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.accountView}>
                    <FontAwesomeIcon icon={faMoneyBill} style={styles.accountIcon}/>
                    <Text style={styles.accountType}>Efectivo</Text>
                    <TouchableOpacity onPress={this.onPressRecharge} style={styles.accountOptionButton}>
                        <FontAwesomeIcon icon={faArrowDown} style={styles.accountOptionButtonIcon}/>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <TabBar selected="Accounts"/>
        </View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    lblTitle: {
        fontSize: 28,
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 15
    },
    scrollContentContainer: {
        backgroundColor: '#fff',
        paddingVertical: 5,
        paddingTop: 5,
        paddingBottom: 35,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
	},
    accountView: {
        backgroundColor: '#00f',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    accountIcon: {
        fontSize: 22
    },
    accountType: {
        fontSize: 16
    },
    accountOptionButton: {
        elevation: 8,
        borderRadius: 50,
        backgroundColor: '#25b535',
        padding: 8
    },
    accountOptionButtonIcon: {
        color: '#ffffff'
    }
});