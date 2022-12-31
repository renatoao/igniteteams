import { useEffect, useState, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Container, Form, HeaderList, NumbersOfPlayers } from './styles';

import { Alert, FlatList, TextInput } from 'react-native';

import { Header } from '@components/Header';
import { Highlights } from '@components/Highlights';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { Input } from '@components/Input';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { AppError } from '@utils/AppError';
import { Loading } from '@components/Loading';

import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playerGetByGroup } from '@storage/player/playerGetByGroup';
import { playerGetByGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';

import { groupRemoveByName } from '@storage/group/groupRemoveByName';


type RouteParams = {
    group: string;
}

export const Players = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [newPlayerName, setNewPlayerName] = useState('');
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

    const route = useRoute();
    const { group } = route.params as RouteParams;

    const newPlayerNameInputRef = useRef<TextInput>(null);

    const navigation = useNavigation();

    const handleAddPlayer = async () => {
        if(newPlayerName.trim().length === 0){
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.');
        }

        const newPlayer = {
            name: newPlayerName,
            team
        }

        try {
            await playerAddByGroup(newPlayer, group);
            
            newPlayerNameInputRef.current?.blur();

            setNewPlayerName('');

            fetchPlayersByTeam();
            
        } catch (error) {
            if(error instanceof AppError){
                Alert.alert('Nova pessoa', error.message);
            }else{
                console.log(error)
                Alert.alert('Nova pessoa', 'Não foi possivel adicionar');
            }

        }
    }

    const fetchPlayersByTeam = async() => {
        try {
            setIsLoading(true);

            const playerByTeam = await playerGetByGroupAndTeam(group, team);
            setPlayers(playerByTeam); 

            setIsLoading(false);
        } catch (error) {
            console.log(error);
            Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado');
        } finally {
            setIsLoading(false);
        }
    }

    const handleRemovePlayer = async(playername: string) => {
        try {
            await playerRemoveByGroup(playername, group);
            fetchPlayersByTeam();
        } catch (error) {
            Alert.alert('Remover pessoa', 'Não foi possível remover a pessoa selecionada')
        }
    }

    const groupRemove = async() => {
        try {
            await groupRemoveByName(group);
            navigation.navigate('groups');
        } catch (error) {
            console.log(error)
            Alert.alert('Remover grupo', 'Não foi possível remover o grupo');
        }
    }

    const handleGroupRemove = async() => {
        Alert.alert('Remover', 'Deseja remover o grupo', 
            [
                {text: 'Não', style: 'cancel'},
                {text: 'Sim', onPress: () => groupRemove() }
            ]
        );
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team]);

    return(
        <Container>
            <Header showBackButton />
            <Highlights title={group} subtitle='Adicione a galera e separe os times' />

            <Form>
                <Input 
                    placeholder='Nome da pessoa' 
                    autoCorrect={false} 
                    onChangeText={setNewPlayerName} 
                    value={newPlayerName}
                    inputRef={newPlayerNameInputRef}
                />
                <ButtonIcon icon='add' onPress={handleAddPlayer} />
            </Form>

            <HeaderList>
                <FlatList 
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({item}) =>(
                        <Filter 
                            isActive={item === team} 
                            title={item}
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />
                <NumbersOfPlayers>
                    {players.length}
                </NumbersOfPlayers>
            </HeaderList>
            {
                isLoading ? <Loading /> :
                
                <FlatList 
                    data={players}
                    keyExtractor={item => item.name}
                    renderItem={({item}) => (
                        <PlayerCard name={item.name} onRemove={()=> handleRemovePlayer(item.name)} />
                    )}
                    ListEmptyComponent = {() => <ListEmpty message='Não existem pessoas nesse time' /> }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        { paddingBottom: 100 },
                        players.length === 0 && {flex: 1}
                    ]}
                />

            }
            <Button title='Remover turma' onPress={handleGroupRemove} type='SECONDARY' />
        </Container>
    );
}
