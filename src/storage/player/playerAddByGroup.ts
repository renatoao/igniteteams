import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playerGetByGroup } from './playerGetByGroup';
import { PlayerStorageDTO } from "./PlayerStorageDTO";


export const playerAddByGroup = async (newPlayer: PlayerStorageDTO, group: string) => {
    try {
        const storagePlayers = await playerGetByGroup(group);
        
        const playerAlreadyExists = storagePlayers.filter(player => player.name === newPlayer.name);
        if(playerAlreadyExists.length > 0){
            throw new AppError('Essa pessoa já está adionada em algum time');
        }

        const storage = JSON.stringify([...storagePlayers, newPlayer]);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);

    } catch (error) {
        throw(error);
    }
}