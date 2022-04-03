import { useState, useEffect, useContext } from 'react'
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';


import styled from "styled-components";
import Footer from "../../Footer";
import Header from "../../Header";
import Cartao from "../Cartao";
import Context from '../../../Context';


export default function Hoje() {

    const { userData } = useContext(Context);
    const { porcentagem, dados: novosHabitos } = userData;

    const [habitos, setHabitos] = useState([{}])

    function atualizar(){
        setHabitos(novosHabitos);
    }
    useEffect(atualizar,[])


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
                // atualizarHabito={receberHabitosHoje}
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
