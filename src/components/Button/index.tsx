import { Container, Title, ButtonTypeStyleProps } from './styles';
import { TouchableOpacityProps } from 'react-native';

type ButtonProps = TouchableOpacityProps & {
    title: string;
    type?:ButtonTypeStyleProps
}

export const Button = ({title, type = 'PRIMARY', ...rest}: ButtonProps) => {
    return(
        <Container type={type} {...rest}>
            <Title>{title}</Title>
        </Container>
    );
}