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
        icon: faShoppingBasket
    },
    {
        name: 'Restaurante',
        icon: faUtensils
    },
    {
        name: 'Ocio',
        icon: faFilm
    },
    {
        name: 'Transporte',
        icon: faBus
    },
    {
        name: 'Salud',
        icon: faBriefcaseMedical
    },
    {
        name: 'Familia',
        icon: faUsers
    },
    {
        name: 'Compras',
        icon: faShoppingCart
    },
    {
        name: 'Regalos',
        icon: faGift
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

    renderCategory = ({ name, icon }, index) => {
        return (
            <View style={styles.categoryView} key={`category-${index}`}>
                <Text style={styles.categoryName}>{name}</Text>
                <TouchableOpacity onPress={this.onPressRecharge} style={styles.categoryButton}>
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
        padding: 12,
        backgroundColor: '#00f'
    },
    categoryIcon: {
        color: '#ffffff'
    },
    categoryExpense: {
        marginTop: 6,
        fontSize: 12
    }
});