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

export default class CategoriesScreen extends Component {

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

	render() {
		return (
        <View style={styles.container}>
            <Text style={styles.lblTitle}>Categorías</Text>
            <ScrollView contentContainerStyle={styles.scrollContentContainer}>
                <Text>Categorías</Text>
            </ScrollView>
            <TabBar selected="Categories"/>
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
        elevation: 8,
        borderRadius: 50,
        padding: 8
    },
    accountOptionButtonIcon: {
        color: '#ffffff'
    }
});