import React from 'react';
import { StyleSheet, Text, TextInput, ScrollView, View, SafeAreaView } from 'react-native';
import { AsyncStorageManager } from '../utils/asyncStorage';
import { FontAwesome } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';

export interface Props {
    navigation: any;
    route: any;
}

export interface State {
    userId: number;
    lastName: string;
    firstName: string;
    birthDate: string;
    birthCity: string;
    address: string;
    postalCode: string;
    city: string;
}

export class FormData extends React.Component<Props, State> {

    private handleChange = ({ name, value }: any) => {
        this.setState({ ...this.state, [name]: value });
    }



    private handleSave = () => {
        const object: State = {
            userId: 1,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            birthCity: this.state.birthCity,
            birthDate: this.state.birthDate,
            postalCode: this.state.postalCode,
            city: this.state.city,
        }

        let db = new AsyncStorageManager();
        db.StoreData(object)
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Certificat', params: object }]
        });
    }

    public state: State = {
        userId: 0,
        firstName: '',
        lastName: '',
        birthCity: '',
        birthDate: '',
        address: '',
        postalCode: '',
        city: ''
    }

    public componentDidMount() {
        this.checkIfData();
    }

    async checkIfData() {
        const db = new AsyncStorageManager();
        const { isUpdating } = this.props.route.params;
        try {
            const data = await db.LoadData();
            if (data.userId == 0 || !isUpdating) {
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Certificat', params: data }]
                });
            } else if (isUpdating) {
                this.setState({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    birthCity: data.birthCity,
                    birthDate: data.birthDate,
                    address: data.address,
                    postalCode: data.postalCode,
                    city: data.city,
                })
            }
        } catch (error) {

        }
    }

    public render() {

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.container}>
                    <Text style={styles.field}>Nom</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.handleChange({ name: 'firstName', value: text })}
                        value={this.state.firstName}
                        placeholder='Nom'
                        autoCompleteType='name'
                    />
                    <Text style={styles.field}>Prénom</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.handleChange({ name: 'lastName', value: text })}
                        value={this.state.lastName}
                        placeholder='Prénom'
                        autoCompleteType='name'
                    />
                    <Text style={styles.field}>Date d'anniversaire</Text>
                    <TextInputMask
                        style={styles.input}
                        value={this.state.birthDate}
                        onChangeText={text => this.handleChange({ name: 'birthDate', value: text })}
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                    />
                    <Text style={styles.field}>Lieu de naissance</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.handleChange({ name: 'birthCity', value: text })}
                        value={this.state.birthCity}
                        placeholder='Lieu de naissance'
                    />
                    <Text style={styles.field}>Adresse</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.handleChange({ name: 'address', value: text })}
                        value={this.state.address}
                        placeholder='Adresse'
                        autoCompleteType='street-address'
                    />
                    <Text style={styles.field}>Code postal</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.handleChange({ name: 'postalCode', value: text })}
                        value={this.state.postalCode}
                        placeholder='Code postal'
                        autoCompleteType='postal-code'
                    />
                    <Text style={styles.field}>Ville</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => this.handleChange({ name: 'city', value: text })}
                        value={this.state.city}
                        placeholder='Ville'
                        autoCompleteType='street-address'
                    />
                    <View style={styles.separator} />
                    <FontAwesome.Button name='check' style={{ backgroundColor: "#002b36" }} onPress={() => this.handleSave()}>Enregistrer</FontAwesome.Button>
                </ScrollView>
            </SafeAreaView>
        )

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#073642',
        padding: 8
    },
    field: {
        color: "#fff",
        marginVertical: 5
    },
    separator: {
        marginVertical: 8,
    },
    input: { height: 40, borderColor: 'gray', borderWidth: 1, color: '#fff', padding: 5 },
    datePickerStyle: {
        width: 360,
    },
});