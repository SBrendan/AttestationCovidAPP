import React from 'react';
import { Button, Linking, StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

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

interface QueryParam {
    l: string;
    f: string;
    b: string;
    p: string;
    a: string;
    z: string;
    c: string;
    r: string;
}

export class FormCertificate extends React.Component<Props, State> {


    private generateLink(action: string) {
        const uri = `https://covid.luko.eu/generate.html#`;
        const queryParams: QueryParam = {
            l: encodeURIComponent(this.props.route.params.lastName),
            f: encodeURIComponent(this.props.route.params.firstName),
            b: encodeURIComponent(this.props.route.params.birthDate),
            p: encodeURIComponent(this.props.route.params.birthCity),
            a: encodeURIComponent(this.props.route.params.address),
            z: encodeURIComponent(this.props.route.params.postalCode),
            c: encodeURIComponent(this.props.route.params.city),
            r: action,
        }

        const url = uri + "f=" + queryParams.f + "&l=" + queryParams.l + "&b=" + queryParams.b + "&p=" + queryParams.p + "&a=" + queryParams.a + "&c=" + queryParams.c + "&z=" + queryParams.z + "&r=" + queryParams.r
        console.log(url);
        Linking.openURL(url);
    }

    private handleClick = (action: string) => {
        this.generateLink(action);
    }

    public render() {

        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Choix du motif de sortie</Text>
                <View style={styles.separator} />
                <FontAwesome.Button name='briefcase' style={{ backgroundColor: "#002b36" }} onPress={() => this.handleClick('travail')}>Travail</FontAwesome.Button>
                <View style={styles.separator} />
                <FontAwesome.Button name='shopping-cart' style={{ backgroundColor: "#002b36" }} onPress={() => this.handleClick('achats')}>Achats</FontAwesome.Button>
                <View style={styles.separator} />
                <FontAwesome.Button name='user-md' style={{ backgroundColor: "#002b36" }} onPress={() => this.handleClick('sante')}>Santé</FontAwesome.Button>
                <View style={styles.separator} />
                <FontAwesome.Button name='users' style={{ backgroundColor: "#002b36" }} onPress={() => this.handleClick('famille')}>Famille</FontAwesome.Button>
                <View style={styles.separator} />
                <FontAwesome.Button name='wheelchair' style={{ backgroundColor: "#002b36" }} onPress={() => this.handleClick('handicap')}>Handicap</FontAwesome.Button>
                <View style={styles.separator} />
                <FontAwesome.Button name='bicycle' style={{ backgroundColor: "#002b36" }} onPress={() => this.handleClick('sport_animaux')}>Sport et Animaux</FontAwesome.Button>
                <View style={styles.separator} />
                <FontAwesome.Button name='bell' style={{ backgroundColor: "#002b36" }} onPress={() => this.handleClick('convocation')}>Convocation</FontAwesome.Button>
                <View style={styles.separator} />
                <FontAwesome.Button name='user' style={{ backgroundColor: "#002b36" }} onPress={() => this.handleClick('missions')}>Enfants</FontAwesome.Button>
                <View style={styles.separator} />
                <FontAwesome.Button name='cogs' style={{ backgroundColor: "#002b36" }} onPress={() => this.props.navigation.navigate('Enregistrement', { isUpdating: true })}>Modifier mes informations utilisateur</FontAwesome.Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#073642',
        padding: 8
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        textAlign: 'center'
    },
    title: {
        fontSize: 32,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    separator: {
        marginVertical: 8,
    },
});