import React from 'react';
import { FormData } from './components/formUser';
import { AsyncStorageManager } from './utils/asyncStorage';
import { FormCertificate } from './components/formCertificate';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';



export default class App extends React.Component<any, any> {

  public state: any = {
    user: {
      userId: 0,
      firstName: '',
      lastName: '',
      birthCity: '',
      birthDate: '',
      address: '',
      postalCode: '',
      city: ''
    }
  }

  public componentDidMount() {
    this.checkIfData();
  }


  async checkIfData() {
    const db = new AsyncStorageManager();
    try {
      const data = await db.LoadData();
      this.setState({ user: data });
    } catch (error) {

    }
  } 

  public render() {
    const Stack = createStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Enregistrement'>
          <Stack.Screen name='Certificat' component={FormCertificate}  options={{
            headerStyle: {
              backgroundColor: '#002b36',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            title: 'Génération du certificat'
          }}/>
          <Stack.Screen name='Enregistrement' component={FormData} initialParams={{ isUpdating: false }} options={{
            headerStyle: {
              backgroundColor: '#002b36',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

