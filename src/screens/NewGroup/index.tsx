import { Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, Content, Icon } from './styles';

import { Header } from '@components/Header';
import { Highlights } from '@components/Highlights';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';




export const NewGroup = () => {

    const [group, setGroup] = useState('');


    const navigation = useNavigation()

    const handleNew = async() => {
        try {

            if(group.trim().length === 0){
                return Alert.alert('Novo Grupo', 'Informe o nome da turma');
            }

            await groupCreate(group);
            navigation.navigate('players', {group})    
        } catch (error) {
            if(error instanceof AppError){
                Alert.alert('Novo Grupo', error.message);
            }else{
                Alert.alert('Novo Grupo', 'Não foi possivel criar um novo grupo');
                console.log(error);
            }
            
        }
        
    }

    return(
        <Container>
            <Header showBackButton />
            <Content>
                <Icon />
                <Highlights title='Nova Turma' subtitle='Crie a turma para adicionar as pessoas' />

                <Input 
                    placeholder="Noma da turma" 
                    onChangeText={setGroup}
                />

                <Button title='Criar' onPress={handleNew} style={{ marginTop: 20 }} />

            </Content>
            
        </Container>
    );
}