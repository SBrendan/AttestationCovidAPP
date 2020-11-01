import AsyncStorage from "@react-native-async-storage/async-storage";
import { State } from "../components/formUser";

export interface AsyncStorageManagerInterface {
    StoreData(object: State): Promise<any>;
    LoadData(): Promise<any>;
}

export class AsyncStorageManager implements AsyncStorageManagerInterface {
    StoreData = async (object: State) => {
        try {
            await AsyncStorage.setItem("user", JSON.stringify(object))
        } catch (error) {
            console.log(error);
        }
    }
    LoadData = async () => {
        try {
            const data = await AsyncStorage.getItem('user');
            if (data) {
                return JSON.parse(data);
            }
        } catch (error) {
            console.log(error);
            return JSON.parse('');
        }
    }
}