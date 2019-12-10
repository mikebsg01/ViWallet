import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { 
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Button
} from 'react-native';

import DatePicker from 'react-native-datepicker';

export default class TransactionScreen extends Component {

    state = {
        firstName: null,
        lastName: null,
        email: null,
        amount: 0.00,
        date: new Date().toISOString().substr(0, 10),
        concept: null
    };

    constructor(props) {
        super(props);
        this.getUser = this.getUser.bind(this);
        this.onPressSubmit = this.onPressSubmit.bind(this);
        this.passValidation = this.passValidation.bind(this);
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

    async componentDidMount() {
        await this.getUser();
    }

    passValidation(transaction) {
        if (! transaction.amount) {
            alert('El campo \"monto\" es requerido.');
            return false;
        }

        if (! transaction.date) {
            alert('El campo \"fecha\" es requerido.');
            return false;
        }

        if (! transaction.concept) {
            alert('El campo \"motivo\" es requerido.');
            return false;
        }

        try {
            transaction.amount = parseFloat(transaction.amount);
        } catch (e) {
            alert('El campo \"monto\" debe ser un valor numérico.');
            return false;
        }

        return transaction;
    }
    
    storeTransaction = async (transaction) => {
        try {
            let transactions = JSON.parse(await AsyncStorage.getItem(`${this.state.email}_transactions`)) || [];

            transactions.push(transaction);
            await AsyncStorage.setItem(`${this.state.email}_transactions`, JSON.stringify(transactions));
            alert('La transacción fue registrada exitosamente! :)');

            return true;
        } catch (error) {
            alert('Ocurrió un error al almacenar los datos.');
        }

        return false;
    };

    onPressSubmit() {
        const { navigation } = this.props;

        let data = {
            type: navigation.getParam('action'),
            account: navigation.getParam('account'),
            amount: this.state.amount,
            date: this.state.date,
            concept: this.state.concept
        };

        const transaction = this.passValidation(data);

        if (transaction && this.storeTransaction(transaction)) {
            alert(JSON.stringify(transaction));
            navigation.navigate('Accounts');
        }
    }

	render() {
        const { navigation } = this.props;

		return (
        <View style={styles.container}>
            <Text style={styles.lblTitle}>{navigation.getParam('title', 'Ingresar')} a {navigation.getParam('accountText', 'Cuenta')}</Text>
            <ScrollView contentContainerStyle={styles.scrollContentContainer}>
                <Text style={styles.lblAmount}>Monto:</Text>
                <TextInput 
                    style={[styles.input, styles.inputAmount]}
                    selectionColor="#20124d" 
                    underlineColorAndroid="#cfd8dc"
                    keyboardType="decimal-pad"
                    onChangeText={amount => this.setState({ amount })}
                />
                <Text style={styles.lblDate}>Fecha:</Text>
                <DatePicker
                    style={[styles.input, styles.inputDate]}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1970-01-01"
                    maxDate="2070-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={date => this.setState({ date })}
                />
                <Text style={styles.lblConcept}>Motivo:</Text>
                <TextInput 
                    style={[styles.input, styles.inputConcept]}
                    selectionColor="#20124d" 
                    underlineColorAndroid="#cfd8dc"
                    multiline={true}
                    onChangeText={concept => this.setState({ concept })}
                />
                <Button title="Guardar" color="#301b73" onPress={this.onPressSubmit} style={styles.btnSubmit} />
            </ScrollView>
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
        paddingBottom: 285,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    input: {
        height: 40,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    lblAmount: {
        textAlign: 'center',
        marginBottom: 20
    },
    inputAmount: {
        width: '80%',
        textAlign: 'right',
        marginBottom: 20
    },
    lblDate: {
        textAlign: 'center',
        marginBottom: 20
    },
    inputDate: {
        width: '80%',
        marginBottom: 20
    },
    lblConcept: {
        textAlign: 'center',
        marginBottom: 20
    },
    inputConcept: {
        width: '80%',
        marginBottom: 20
    },
    btnSubmit: {
        marginBottom: 20
    }
});