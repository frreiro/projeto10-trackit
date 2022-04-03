import axios from "axios";
import { useState, useContext } from "react";
import Swal from "sweetalert2";

import styled from "styled-components";
import Context from "../../../Context";

export default function Habito({ token, id, nome, dias, atualizar }) {

    const { userData, setUserData} = useContext(Context);
    const {atualizar: atualizarHoje} = userData;
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
            setUserData({...userData, atualizar: !atualizarHoje})

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

    const customizacaoSwal = {
        width: '340px',
        heightAuto: false,
        allowEscapeKey: false,
        returnFocus: false,
        allowOutsideClick: false,
        iconColor: 'red',
        titleText: "Tem certeza que deseja excluir?",
        icon: "warning",
        confirmButtonText: "Excluir",
        showCancelButton: true,
        cancelButtonColor: '#CFCFCF',
        confirmButtonColor: 'red',
        cancelButtonText: "Cancelar"
    }


    function confirmacao(){
        Swal.fire(customizacaoSwal).then((result) => {
            if (result.value) {
                deletarHabito()
            } else {
                setEsconder(!esconder)
            }
        });
    }


    const semana = renderizarDias();
    return (
        <>
            <Div>
                <main>
                    <h1>{nome}</h1>
                    <DiasDaSemana>
                        {semana}
                    </DiasDaSemana>
                    <ion-icon onClick={confirmacao} name="trash-outline"></ion-icon>
                </main>
            </Div>
        </>
    )
}

const Div = styled.div`
    width: 340px;
    min-height: 91px;
    
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

        word-break: break-all;
    }  

    h1{
        font-size: 20px;
        margin-bottom: 8px;
        
        padding: 10px 25px 0 0;
        
    }
    ion-icon{
        font-weight: normal;
        font-style: normal;
        font-size: 20px; 
        color: #666666;
    
        position: absolute;
        top: 11px;
        right:10px;
    }

`;

const DiasDaSemana = styled.section`
    display:flex;
    margin-bottom: 10px;

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