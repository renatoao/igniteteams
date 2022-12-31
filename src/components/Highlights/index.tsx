import { Container, Title, SubTitle } from './styles';

type HighlightsProps = {
    title: string;
    subtitle: string;
}

export const Highlights = ({title, subtitle}: HighlightsProps) => {
    return(
        <Container>
            <Title>{title}</Title>
            <SubTitle>{subtitle}</SubTitle>
        </Container>
    );
}