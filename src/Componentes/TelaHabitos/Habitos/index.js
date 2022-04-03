import { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import axios from "axios";
import { Rings } from "react-loader-spinner";


import Habito from "../Habito";
import NovoHabito from "../NovoHabito";
import Context from "../../../Context";


export default function Habitos() {

    const { userData } = useContext(Context);
    const { token} = userData;

    const [adicionar, setAdicionar] = useState(false);
    const [habitos, setHabitos] = useState(null)
    


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


    function renderizarNovoHabito() {
        return adicionar ? <NovoHabito
            esconder={setAdicionar}
            atualizar={() => receberHabitos()}
        /> : <></>
    }

    function renderizarHabito() {
        return habitos !== null ? verificarItens() : ""
    }
    function verificarItens(){
        return habitos.length === 0 
        ? <h1>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h1>
        : habitos.map((habito) => {
            const { name: nome, days: dias, id } = habito
            return (
                <Habito
                    key={nome + id}
                    token={userData.token}
                    id={id}
                    nome={nome}
                    dias={dias}
                    atualizar={() => receberHabitos()} />
            )
        })
    }

    useEffect(receberHabitos, []);
    const habito = renderizarHabito();
    const novoHabito = renderizarNovoHabito();
    const carregar = habitos !== null ? habito : <Carregando><Rings height="200" width="200" color="var(--cor-azul-escuro)" ariaLabel="loading" /></Carregando>;
    return (
        <>
            <Main>
                <AddHabito>
                    <h1>Meus hábitos</h1>
                    <ion-icon onClick={() => setAdicionar(!adicionar)} name="add-circle"></ion-icon>
                </AddHabito>
                <HabitosSection>
                    {novoHabito}
                    {carregar}
                </HabitosSection>
            </Main>
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

    ion-icon{
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

const Carregando = styled.div`
    width: 100vw;
    height: 100vh;

    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    top: 0;
    z-index: 2;

    display: flex;
    justify-content: center;
    align-items: center;
    
`;
