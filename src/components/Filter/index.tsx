import { Container, Title, FilterStyleProps } from './styles';
import { TouchableOpacityProps } from 'react-native';


type FilterProps = TouchableOpacityProps & FilterStyleProps & {
    title: string;
}

export const Filter = ({title, isActive = false, ...rest}: FilterProps) => {
    return(
        <Container isActive={isActive} {...rest}>
            <Title>{title}</Title> 
        </Container>
    );
}