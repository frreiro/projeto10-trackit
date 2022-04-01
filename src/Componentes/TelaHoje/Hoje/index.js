import { useState, useEffect, useContext } from 'react'
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import axios from 'axios';


import styled from "styled-components";
import Footer from "../../Footer";
import Header from "../../Header";
import Cartao from "../Cartao";
import Context from '../../../Context';


export default function Hoje() {

    const { userData, setUserData } = useContext(Context);
    const { token, porcentagem: percentual } = userData;

    const [habitos, setHabitos] = useState([{}])
    const [porcentagem, setPorcentagem] = useState(percentual)

    function receberHabitosHoje() {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const URL_HOJE = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
        const promise = axios.get(URL_HOJE, config);
        promise.then((response) => {
            const {data} = response;
            console.log(data)
            setHabitos(data);
        })
        promise.catch((error) => console.log(error));
    }

    useEffect(receberHabitosHoje,[])
    useEffect(calcularPorcentagem,[habitos]);

    function formatarDiaDaSemana() {
        const diaBrasil = dayjs().locale("pt-br");
        const diaDaSemana = diaBrasil.format('dddd')
        let novaString = diaDaSemana.slice(0, diaDaSemana.indexOf("-"));
        return novaString.charAt(0).toUpperCase() + novaString.slice(1);
    }

    function formatarData() {
        const diaBrasil = dayjs().locale("pt-br");
        return diaBrasil.format('DD/MM')
    }

    function calcularPorcentagem() {
        const qntsFeitas = habitos.filter((objeto) => objeto.done === true).length;
        const qntsTotal = habitos.length;
        const percentual = Math.round(qntsFeitas * 100 / qntsTotal);
        setPorcentagem(percentual)
        setUserData({...userData, porcentagem: percentual});
    }


    function renderizarPorcentagem() {
        return porcentagem > 0 
        ? <p className='concluidos'>{porcentagem}% dos hábito concluído</p> 
        : <p>Nenhum hábito concluído ainda</p>;
    }


    function renderizarCartao() {
        return habitos.map((habito) => {
            const { id, name, done, currentSequence, highestSequence } = habito;
            return <Cartao
                id={id}
                nome={name}
                feito={done}
                key={name + id}
                sequenciaAtual={currentSequence}
                maiorSequencia={highestSequence}
                atualizarHabito={receberHabitosHoje}
            />
        });
    }

    const dia = formatarData();
    const cartao = renderizarCartao();
    const texto = renderizarPorcentagem();
    const diaDaSemana = formatarDiaDaSemana();

    return (
        <>
            <Header />
            <Main>
                <Informacao>
                    <h1>{diaDaSemana}, {dia}</h1>
                    {texto}
                </Informacao>
                <section>
                    {cartao}
                </section>
            </Main>
            <Footer porcentagem={porcentagem}/>
        </>

    )

}

const Main = styled.main`
    width: 100vw;
    margin-top: 70px;
    padding: 0 17px 0 17px;
    margin-bottom: 80px;

`;

const Informacao = styled.section`
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 10px;

      h1{
        font-size: 23px;
        line-height: 29px;
        color: var(--cor-azul-escuro);
        margin-bottom: 5px;

    }

    p{  
        font-size: 18px;
        color: #BABABA;
    }

    .concluidos{
        color:#8FC549;
    }
`;
