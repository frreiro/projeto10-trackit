import { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import axios from "axios";

import Habito from "../Habito";
import NovoHabito from "../NovoHabito";
import Footer from "../../Footer";
import Header from "../../Header";
import Context from "../../../Context";

export default function Habitos() {

    const { userData } = useContext(Context);
    const {token, image} = userData;

    const [adicionar, setAdicionar] = useState(false);
    const [habitos, setHabitos] = useState([])

    function receberHabitos() {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const URL_HABITOS = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits"
        const promise = axios.get(URL_HABITOS, config)
        promise.then((resposta) => {
            const { data } = resposta
            setHabitos(data)
        })
        promise.catch((erro) => console.log(erro))
    }

    function renderizarHabito() {
        return habitos.map((habito) => {
            const { name: nome, days: dias, id } = habito
            return (
                <Habito
                    key={nome}
                    token={userData.token}
                    id={id}
                    nome={nome}
                    dias={dias}
                    atualizar={()=>receberHabitos()} />
            )
        })
    }






    useEffect(receberHabitos, []);
    const habito = renderizarHabito();



    function renderizarNovoHabito() {
        return adicionar ? <NovoHabito esconder={setAdicionar} atualizar={()=>receberHabitos()} /> : <></>
    }
    const novoHabito = renderizarNovoHabito();

    return (
        <>
            <Header foto={image} />
            <Main>
                <AddHabito>
                    <h1>Meus hábitos</h1>
                    <span className="material-icons" onClick={() => setAdicionar(!adicionar)}>add_box</span>
                </AddHabito>
                <HabitosSection>
                    {novoHabito}
                    {habitos.length === 0
                        ? <h1>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h1>
                        : habito}
                </HabitosSection>
            </Main>
            <Footer />
        </>
    )
}


const Main = styled.main`
    width: 100vw;
    margin-top: 70px;
    padding: 0 17px 0 17px;
    margin-bottom: 80px;

    
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

`;

