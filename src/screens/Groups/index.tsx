import { Container } from './styles';
import { useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Loading } from '@components/Loading';

import { Highlights } from '@components/Highlights';
import { Header } from '@components/Header';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { groupsGetAll } from '@storage/group/groupsGetAll';


export const Groups = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [groups, setGroups] = useState<string[]>([]);


    const navigation = useNavigation();

    const handleNewGroup = () => {
        navigation.navigate('new');
    }

    const fetchGroups = async() => {
        try {
            setIsLoading(true);

            const data = await groupsGetAll();
            setGroups(data);

            setIsLoading(false);
        } catch (error) {
            console.log(error);
        } finally{
            setIsLoading(false);
        }
    }

    const handleOpenGroup = (group: string) => {
        navigation.navigate('players', {group});
    }

    useFocusEffect(useCallback(() => {
        fetchGroups();
    }, []));

    return(
        <Container>
           <Header />
           <Highlights title='Turmas' subtitle='Jogue com a sua turma' />

           {
            isLoading ? <Loading /> :
           
            <FlatList 
                data={groups}
                keyExtractor={item => item}
                renderItem = { ({item}) => (
                    <GroupCard 
                        title={item} 
                        onPress={() => handleOpenGroup(item)}
                    />
                )}
                contentContainerStyle={groups.length === 0 && {flex:1} }
                ListEmptyComponent = {() => <ListEmpty message='Não existem turmas cadastradas' /> }
                showsVerticalScrollIndicator={false}
            />
            }
            <Button title='Criar Nova Turma' onPress={handleNewGroup} />
        </Container>
    );
}