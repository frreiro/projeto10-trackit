import axios from 'axios';
import { useState, useContext } from 'react';

import styled from 'styled-components'
import Context from '../../../Context';



export default function Cartao({ id, nome, feito, sequenciaAtual, maiorSequencia, atualizarHabito }) {

    const { userData } = useContext(Context);
    const { token } = userData;

    const [selecionado, setSelecionado] = useState(feito);




    function toggleCheckCartao(URL, boolean) {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const promise = axios.post(URL, boolean, config);
        promise.then((response) => {
            atualizarHabito();
            console.log(response.status)
        })
        promise.catch((error) => console.log(error));
    }



    function mudarEstado() {
        console.log(id)
        verificarEstado();
        setSelecionado(!selecionado);

    }


    function verificarEstado() {
        if (selecionado) {
            //desselecionar
            const URL_DESMARCAR = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;
            toggleCheckCartao(URL_DESMARCAR, false);
        } else {
            //selecionar
            const URL_MARCAR = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;
            toggleCheckCartao(URL_MARCAR, true);
        }
    }


    const mudarCor = selecionado && sequenciaAtual === maiorSequencia ? 'igual' : ""

    return (
        <Div cor={selecionado ? '#8FC549' : '#666666'}>
            <section>
                <h1>{nome}</h1>
                <p>Sequência atual: <span>{sequenciaAtual} dias</span></p>
                <p>Seu recorde: <span className={mudarCor}>{maiorSequencia} dias</span></p>
            </section>
            <Icone onClick={mudarEstado} cor={selecionado ? '#8FC549' : '#E7E7E7'}>
                <ion-icon name="checkbox"></ion-icon>
            </Icone>
        </Div>
    )
}

const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #FFFFFF;
    padding: 13px 15px 17px 15px;
    border-radius: 5px;
    margin-bottom: 10px;

    section{
        h1{
            font-size: 20px;
            margin-bottom: 10px;
            color: #666666;

        }
        p{
            font-size: 13px;
            color: #666666;
        }

        span{
            color: ${(props) => props.cor}; 
        }
        
        .igual{
            color: #8FC549;
        }
    }

`;

const Icone = styled.div`
    ion-icon{
        font-size: 69px;
        color: ${(props) => props.cor};
    }
`