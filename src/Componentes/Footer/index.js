import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import styled from "styled-components"
import Context from "../../Context"
import axios from 'axios';



export default function Footer() {

    const { userData, setUserData } = useContext(Context);
    const { porcentagem: percentual, token, atualizar } = userData;

    const [porcentagem, setPorcentagem] = useState(percentual)
    const [ habitos, setHabitos] = useState([{}])

    function receberHabitosHoje() {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const URL_HOJE = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
        const promise = axios.get(URL_HOJE, config);
        promise.then((response) => {
            const { data } = response;
            setUserData({ ...userData, dados: data });
            setHabitos(data);
        })
        promise.catch((error) => error);
    }
    useEffect(receberHabitosHoje, [atualizar])


    function calcularPorcentagem() {
        if (habitos !== undefined) {
            const qntsFeitas = habitos.filter((objeto) => objeto.done === true).length;
            const qntsTotal = habitos.length;
            const percentual = Math.round(qntsFeitas * 100 / qntsTotal);
            setPorcentagem(percentual)
            setUserData({ ...userData, porcentagem: percentual });
        }
    }

    useEffect(calcularPorcentagem, [habitos]);


    return (
        <Rodape >
            <Link to="/habitos">
                <h1>Hábitos</h1>
            </Link>
            <div>
                <Link to="/hoje">
                    <CircularProgressbar
                        value={porcentagem}
                        background={true}
                        backgroundPadding={6}
                        text={"Hoje"}
                        styles={buildStyles(ProgressBarStyles)} />
                </Link>
            </div>
            <Link to="/historico">
                <h1>Histórico</h1>
            </Link>
        </Rodape>)
        
}



const ProgressBarStyles = {
    backgroundColor: 'var(--cor-azul-claro)',
    trailColor: 'var(--cor-azul-claro)',
    pathColor: 'white',
    textColor: 'white',
}

const Rodape = styled.footer`
    width: 100vw;
    height: 70px;
    padding: 0 36px 0 36px;
    background-color: #FFFFFF;

    display: flex;
    justify-content: space-between;
    align-items: center;


    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;

    a{
        text-decoration: none
    }


    h1{
        font-size: 18px;
        color: var(--cor-azul-claro);

    }

    div{
        width: 91px;
        height: 91px;
        
        position: fixed;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        bottom: 10px;

    }

`;
