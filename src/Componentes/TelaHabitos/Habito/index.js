import axios from "axios";
import { useState } from "react";


import styled from "styled-components";

export default function Habito({ token, id, nome, dias, atualizar }) {

    const [esconder, setEsconder] = useState(true)

    function deletarHabito() {
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        const URL_DELETE = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`
        const promise = axios.delete(URL_DELETE, config);
        promise.then((resposta) => {
            console.log(resposta.status)
            setEsconder(false);
            atualizar();
        });
        promise.catch((error) => console.log(error.message));
    }



    function renderizarDias() {
        const diasSemanas = ["D", "S", "T", "Q", "Q", "S", "S"];
        return diasSemanas.map((dia, indice) => {
            return dias.includes(indice)
                ? <div key={indice + dia} className="ativado">{dia}</div>
                : <div key={indice + dia} >{dia}</div>
        })
    }
    function telaConfirmacao() {
        return (
            <Confirmacao>
                <main>
                    <h1>Você deseja deletar esse hábito permanentemente?</h1>
                    <div>
                        <button className="cancelar" onClick={() => setEsconder(true)}>Não</button>
                        <button className="excluir" onClick={deletarHabito}>Excluir</button>
                    </div>
                </main>
            </Confirmacao>
            )
    }

    const confirmacao = telaConfirmacao();
        

    

    const semana = renderizarDias();
    return (
        <>
            {esconder ? "": confirmacao}
            <Div>
                <main>
                    <h1>{nome}</h1>
                    <DiasDaSemana>
                        {semana}
                    </DiasDaSemana>
                    <span className="material-icons-outlined" onClick={()=>setEsconder(false)}>delete_outline</span>
                </main>
            </Div>
        </>
    )
}

const Div = styled.div`
    width: 340px;
    height: 91px;
    
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

    h1{
        font-size: 20px;
        margin-bottom: 8px;
        
    }

    .material-icons-outlined{
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 23px; 
        color: #666666;

        position: absolute;
        top: 11px;
        right:10px;
    }
`;

const DiasDaSemana = styled.section`
    display:flex;

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

const Confirmacao = styled.div`
    width: 100vw;
    height: 100vh;

    background-color: rgba(50.2%, 50.2%, 50.2%, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;

    main{
        width: 340px;
        height: 200px;
        background-color: #FFFFFF;

        text-align: center;

        padding: 0 28px 0 28px;
        border-radius: 5px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        div{
            margin-top: 30px;
        }
        
        button{
            width: 100px;
            height: 40px;
            outline: none;
            border: none;
            border-radius: 4px;

            font-size: 16px
        }

        .excluir{
            background-color: #ec2300;
            color: #FFFFFF;
        }

        .cancelar{
            background-color:#FFFFFF;
            margin-right: 10px;
        }
    }
`;



