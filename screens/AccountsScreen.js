import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View, FlatList, ScrollView, Button, Image } from 'react-native';
import TabBar from '../components/TabBar';

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
            const { navigation } = this.props;

            if (session === null) {
                navigation.navigate('LoginScreen');
                return;
            }

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

	render() {
		return (
        <View style={styles.container}>
            <Text style={styles.lblTitle}>Mis cuentas</Text>
            <ScrollView contentContainerStyle={styles.scrollContentContainer}>
                
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
        paddingBottom: 35
	},
    imgDog: {
        flex: 1,
        width: 86, 
        height: 86,
        borderRadius: 8,
        margin: 15
    }
});