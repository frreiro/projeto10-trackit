import { useState } from "react"
import styled from "styled-components"

import Habito from "../Habito";
import NovoHabito from "../NovoHabito";
import Footer from "../../Footer";
import Header from "../../Header";

export default function Habitos() {
    const [adicionar, setAdicionar] = useState(false);



    function renderizarNovoHabito() {
        return adicionar ? <NovoHabito /> : <></>
    }
    const novoHabito = renderizarNovoHabito();

    return (
        <>
            <Header />
            <Main>
                <AddHabito>
                    <h1>Meus hábitos</h1>
                    <span className="material-icons" onClick={() => setAdicionar(!adicionar)}>add_box</span>
                </AddHabito>
                <HabitosSection>
                    {novoHabito}
                    {/* <Habito/> */}
                    {/* <h1 className="vazio">Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h1> */}
                    {/* <Habito/> */}
                </HabitosSection>
            </Main>
            <Footer />
        </>
    )
}


const Main = styled.main`
    width: 100vw;
    height: calc(100vh - 140px);
    margin-top: 70px;
    background-color: #F2F2F2;
    padding: 0 17px 0 17px;

    
`;

const AddHabito = styled.section`

    height: 85px;
    display: flex;
    justify-content: space-between;
    align-items: center;


    h1{
        font-family: 'Lexend Deca';
        font-size: 23px;
        color: var(--cor-azul-escuro);
    }

    .material-icons{
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 40px; 
        color: var(--cor-azul-claro);
    }
`;


const HabitosSection = styled.section`

    h1{
        font-size: 18px;
        color: #666666;
        line-height: 22px;
    }

    .vazio{
        margin-top: 29px;
    }
`;

