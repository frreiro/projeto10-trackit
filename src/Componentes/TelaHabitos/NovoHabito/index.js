import axios from "axios";
import { useState, useContext } from "react"
import { ThreeDots } from "react-loader-spinner";


import styled from 'styled-components'
import Context from "../../../Context";

export default function NovoHabito({ esconder, atualizar }) {

    const { userData, setUserData } = useContext(Context);
    const { atualizar: atualizarHoje, novoHabito } = userData;
    const [clicado, setClicado] = useState(false);
    const [habito, setHabito] = useState(novoHabito)

    function atualizarHabito() {
        setUserData({ ...userData, novoHabito: habito })
    }

    function resetarHabito() {
        setUserData({
            ...userData,
            atualizar: !atualizarHoje,
            novoHabito: { name: "", days: [] }
        });
    }


    function enviarHabito(e) { // botão cancelar tbm enviar essa requisição
        e.preventDefault();
        //post
        setClicado(!clicado);
        const config = {
            headers: {
                "Authorization": `Bearer ${userData.token}`
            }
        }
        const URL_ADD_HABITO = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
        const promise = axios.post(URL_ADD_HABITO, habito, config);
        promise.then((resposta) => {
            resetarHabito();
            esconder(false);
            atualizar();

        })
        promise.catch((error) => {
            console.log(error);

        })

    }


    function renderizarDias() {
        const { days: dias } = habito;
        const diasSemanas = ["D", "S", "T", "Q", "Q", "S", "S"];
        return diasSemanas.map((dia, indice) => {
            return dias.includes(indice)
                ? <div key={indice + dia} className="ativado" onClick={() => verificarClick(indice)} >{dia}</div>
                : <div key={indice + dia} onClick={() => verificarClick(indice)}>{dia}</div>
        })
    }



    function verificarClick(num) {
        const { days: dias } = habito;
        if (dias.includes(num)) {
            dias.splice(dias.indexOf(num), 1)
            setHabito({ ...habito, days: [...dias] })
        } else {
            setHabito({ ...habito, days: [...dias, num] })
        }
    }

    function mudarNome(e) {
        e.preventDefault();
        // setUserData({...userData, novoHabito: {...novoHabito, nome: e.target.value}})
        setHabito({ ...habito, name: e.target.value })
    }

    const semana = renderizarDias();
    const carregar = <ThreeDots height="100" width="50" color="#FFFFFF" ariaLabel="loading" />
    const isCarregando = clicado ? carregar : "Salvar";
    const disableInput = clicado ? 'disable' : ""
    const disableButton = clicado ? (e) => e.preventDefault() : enviarHabito;


    return (
        <Div>
            <main>
                <form onSubmit={disableButton}>
                    <input placeholder='nome do hábito' className={disableInput}
                        readOnly={clicado} type="text" value={habito.name} onChange={mudarNome} />
                    <DiasDaSemana>
                        {semana}
                    </DiasDaSemana>
                    <BotaoSection>
                        <button className='cancelar' type="button" onClick={() => {
                            esconder(false)
                            atualizarHabito();
                        }
                        }>Cancelar</button>
                        <button className='salvar' type="submit">{isCarregando}</button>
                    </BotaoSection>
                </form>
            </main>
        </Div>
    )
}


const Div = styled.div`
    width: 340px;
    height: 180px;
    
    padding: 0 14px 0 14px;
    background-color: #fff;
    border-radius: 5px;

    display: flex;
    align-items: center;
    position: relative;

    margin-bottom: 10px;
    
    main{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }  

    input{
        width: 303px;
        height: 45px;
        font-size: 20px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        
        padding-left: 11px;
        margin-bottom: 8px;
        
    }

    .disable{
        background-color:  #F2F2F2;
        color: #AFAFAF ;
    }

    input::placeholder{
        color: #DBDBDB;
        
    }

`;

const BotaoSection = styled.section`
    position: absolute;
    right: 16px;
    bottom: 15px;
    display: flex;

    button{
        width: 84px;
        height: 35px;
        outline: none;
        border: none;
        border-radius: 4px;
        font-size: 16px;

        display: flex;
        justify-content: center;
        align-items: center;
    }


    .cancelar{
        background-color: #fff;
        color: var(--cor-azul-claro);
    }

    .salvar{
        background-color: var(--cor-azul-claro);
        color: #fff;
        margin-left: 23px;
    }
`;

const DiasDaSemana = styled.section`
    display:flex;
    margin-bottom: 50px;

    div{
        width: 30px;
        height: 30px;

        color: #DBDBDB;
        font-size: 20px;
        
        display: flex;
        align-items: center;
        justify-content: center;

        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;

        margin-right: 4px;
    }

    .ativado{
        background: #CFCFCF;
        color: #FFFFFF;
    }

`;


