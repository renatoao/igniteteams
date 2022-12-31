import { Container, Icon, ButtonIconTypeStylesProps } from './styles';
import { TouchableOpacityProps } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

type ButtonIconProps = TouchableOpacityProps & {
    icon: keyof typeof MaterialIcons.glyphMap;
    type?: ButtonIconTypeStylesProps
}

export const ButtonIcon = ({icon, type = 'PRIMARY', ...rest}: ButtonIconProps) => {
    return(
        <Container {...rest}>
            <Icon name={icon} type={type} />
        </Container>
    );
}