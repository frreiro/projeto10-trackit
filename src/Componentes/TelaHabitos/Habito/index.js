import { useState } from "react";


import styled from "styled-components";

export default function Habito() {

    const [dias, setDias] = useState([])

    
    function renderizarDias(){
        const diasSemanas =  ["D","S","T","Q","Q","S","S"];
        return diasSemanas.map((dia, indice)=>{
            return dias.includes(indice) 
            ? <div className="ativado">{dia}</div> 
            : <div>{dia}</div>
        })
    }

    const semana = renderizarDias();
    return (
        <Div>
            <main>
                <h1>Ler 1 capítulo de livro</h1>
                <DiasDaSemana>
                    {semana}
                </DiasDaSemana>
                <span className="material-icons-outlined">delete_outline</span>
            </main>
        </Div>
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


