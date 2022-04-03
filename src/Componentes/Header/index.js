import { useContext } from "react";
import styled from "styled-components"
import Context from "../../Context";



export default function Header({foto}){
    const {userData} = useContext(Context);
    const {imagem} = userData;
    return (
        <Cabecalho>
            <h1>TrackIt</h1>
            <img src={imagem} alt="userImage"/>
        </Cabecalho>
    )
}



const Cabecalho = styled.header`
    width: 100vw;
    height: 70px;
    padding: 0 18px 0 18px;
    background-color: var(--cor-azul-escuro);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    display: flex;
    justify-content: space-between;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    z-index:2;
    
    h1{
        font-size: 40px;
        font-family: 'Playball';
        color: white;
    }

    img{
        width: 51px;
        height: 51px;
        border-radius: 98px
    }

`;

