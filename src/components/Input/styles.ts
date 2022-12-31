import styled, { css } from 'styled-components/native';
import {TextInput} from 'react-native';

export const Container = styled(TextInput)`

    min-height: 56px;
    height: 56px;

    ${({theme}) => css`
        color: ${theme.COLORS.WHITE};
        background-color: ${theme.COLORS.GRAY_700};
        
        font-family: ${theme.FONT_FAMILY.REGULAR};
        font-size: ${theme.FONT_SIZE.MD}px;
    `}

    border-radius: 6px;
    padding: 16px;
`;