import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";
import { groupsGetAll } from "@storage/group/groupsGetAll";

import { GROUP_COLLECTION } from "@storage/storageConfig";

export const groupCreate = async(groupName: string) => {
    try {
        const storageGroups = await groupsGetAll();

        const groupAlreadyExixts = storageGroups.includes(groupName);

        if(groupAlreadyExixts){
            throw new AppError('Já existe um grupo cadastrado com esse nome.')
        }

        const storage = JSON.stringify([ ...storageGroups, groupName.trim()]);
        await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    } catch (error) {
        throw error;
    }
}