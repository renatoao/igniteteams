import { Container, Logo, BackButton, BackIcon } from './styles';

import logoImg from '@assets/logotipo/logo.png';
import { useNavigation } from '@react-navigation/native';

type Props = {
    showBackButton?: boolean;
}

export const Header = ({showBackButton = false}: Props) => {

    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.navigate('groups');
    }

    return(
        <Container>
            {
                showBackButton && 
                <BackButton onPress={handleGoBack}>
                    <BackIcon />
                </BackButton>
            }

            <Logo source={logoImg} />
        </Container>
    );
}