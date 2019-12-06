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
    faArrowDown,
    faExchangeAlt
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

    renderAccountOption = ({ text, icon, bgColor, textColor }) => {
        const accountOptionButton = Object.assign({}, styles.accountOptionButton, { 
            backgroundColor: bgColor,
            color: textColor
        });

        return (
            <View style={styles.accountOption}>
                <TouchableOpacity onPress={this.onPressRecharge} style={accountOptionButton}>
                    <FontAwesomeIcon icon={icon} style={styles.accountOptionButtonIcon}/>
                </TouchableOpacity>
                <Text style={styles.accountOptionName}>{text}</Text>
            </View>
        );
    }

    renderAccount = ({ text, icon }) => {
        return (
            <View style={styles.accountView}>
                <FontAwesomeIcon icon={icon} style={styles.accountIcon} size={20}/>
                <Text style={styles.accountType}>{text}</Text>
                <Text stye={styles.accountBalance}>$ 0.00</Text>
                {this.renderAccountOption({
                    text: 'Recargar',
                    icon: faArrowDown,
                    bgColor: '#25b535',
                    textColor: '#ffffff'
                })}
                {this.renderAccountOption({
                    text: 'Transferir',
                    icon: faExchangeAlt,
                    bgColor: '#bbbbbb',
                    textColor: '#000000'
                })}
            </View>
        );
    }

	render() {
		return (
        <View style={styles.container}>
            <Text style={styles.lblTitle}>Mis cuentas</Text>
            <ScrollView contentContainerStyle={styles.scrollContentContainer}>
                {this.renderAccount({
                    text: 'Débito',
                    icon: faCreditCard
                })}
                {this.renderAccount({
                    text: 'Efectivo',
                    icon: faMoneyBill
                })}
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderBottomColor: '#f9f9f9',
        borderBottomWidth: 1
    },
    accountIcon: {
        flexBasis: 40
    },
    accountType: {
        flexBasis: 60,
        fontSize: 14
    },
    accountBalance: {
        fontSize: 14,
        paddingHorizontal: 12
    },
    accountOption: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    accountOptionName: {
        marginTop: 6,
        fontSize: 12
    },
    accountOptionButton: {
        elevation: 4,
        borderRadius: 50,
        padding: 8
    },
    accountOptionButtonIcon: {}
});