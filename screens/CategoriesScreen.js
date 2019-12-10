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
    faShoppingBasket,
    faUtensils,
    faFilm,
    faBus,
    faUsers,
    faBriefcaseMedical,
    faShoppingCart,
    faGift
} from '@fortawesome/free-solid-svg-icons';

const categories = [
    {
        name: 'Provisiones',
        icon: faShoppingBasket,
        backgroundColor: '#4fa7f0'
    },
    {
        name: 'Restaurante',
        icon: faUtensils,
        backgroundColor: '#4c5bb9'
    },
    {
        name: 'Ocio',
        icon: faFilm,
        backgroundColor: '#fc4a86'
    },
    {
        name: 'Transporte',
        icon: faBus,
        backgroundColor: '#f6ab47'
    },
    {
        name: 'Salud',
        icon: faBriefcaseMedical,
        backgroundColor: '#54ad56'
    },
    {
        name: 'Familia',
        icon: faUsers,
        backgroundColor: '#8058f5'
    },
    {
        name: 'Compras',
        icon: faShoppingCart,
        backgroundColor: '#f15352'
    },
    {
        name: 'Regalos',
        icon: faGift,
        backgroundColor: '#4fa7f0'
    }
];

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

    renderCategory = ({ name, icon, backgroundColor }, index) => {
        const categoryButton = Object.assign({}, styles.categoryButton, { 
            backgroundColor: backgroundColor
        });

        return (
            <View style={styles.categoryView} key={`category-${index}`}>
                <Text style={styles.categoryName}>{name}</Text>
                <TouchableOpacity onPress={this.onPressRecharge} style={categoryButton}>
                    <FontAwesomeIcon icon={icon} style={styles.categoryIcon}/>
                </TouchableOpacity>
                <Text style={styles.categoryExpense}>$ 0.00</Text>
            </View>
        );
    }

    renderCategories = () => {
        return categories.map((category, index) => this.renderCategory(category, index));
    }

	render() {
		return (
        <View style={styles.container}>
            <Text style={styles.lblTitle}>Categorías</Text>
            <ScrollView contentContainerStyle={styles.scrollContentContainer}>
                {this.renderCategories()}
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    categoryView: {
        flexBasis: '25%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12
    },
    categoryName: {
        fontSize: 12
    },
    categoryButton: {
        marginTop: 6,
        elevation: 4,
        borderRadius: 50,
        padding: 12
    },
    categoryIcon: {
        color: '#ffffff'
    },
    categoryExpense: {
        marginTop: 6,
        fontSize: 12
    }
});