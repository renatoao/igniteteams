import { Container, Name, Icon } from './styles';

import { ButtonIcon } from '@components/ButtonIcon';

type PlayercardProps = {
    name: string;
    onRemove: () => void;
}

export const PlayerCard = ({name, onRemove}: PlayercardProps) => {
    return(
        <Container>        
            <Icon name='person' />
            <Name>{name}</Name>

            <ButtonIcon icon='close' type='SECONDARY' onPress={onRemove} />
        </Container>
    );
}