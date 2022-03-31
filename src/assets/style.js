import {createGlobalStyle} from "styled-components"

const GlobalStyle = createGlobalStyle`


    body *{
        box-sizing: border-box;
        --cor-azul-claro: #52B6FF;
        --cor-azul-escuro: #126BA5;
    }

    .root *{
        font-family: 'Lexend Deca';
        font-weight: 400;
    }
    
`;

export default GlobalStyle;