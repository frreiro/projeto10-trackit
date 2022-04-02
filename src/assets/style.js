import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`

    .swal2-container{
        font-family: 'Lexend Deca';
        font-weight: 400;
    }

    .swal2-actions button{
        font-family: 'Lexend Deca';
        font-weight: 400;
    }


    body{
        background: #F2F2F2;

    }

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