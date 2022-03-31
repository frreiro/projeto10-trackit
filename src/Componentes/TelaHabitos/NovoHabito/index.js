import {useState} from "react"

import styled from 'styled-components'
import Habito from "../Habito";
import Habitos from "../Habitos";

export default function NovoHabito() {

    const [habito, setHabito] = useState({
        name: "",
        days: []
    })
    
    
    function renderizarDias(){
        const {days:dias} = habito;
        const diasSemanas = ["D", "S", "T", "Q", "Q", "S", "S"];
        return diasSemanas.map((dia, indice) => {
            return dias.includes(indice) 
            ? <div key={indice+dia} className="ativado" onClick={()=>verificarClick(indice)} >{dia}</div>  
            : <div key={indice+dia} onClick={()=>verificarClick(indice)}>{dia}</div>
        })
    }
    

    
    function verificarClick(num){
        const {days:dias} = habito;
        if(dias.includes(num)){
            dias.splice(dias.indexOf(num), 1)
            setHabito({...habito, days:[...dias]})
        }else{
            setHabito({...habito, days:[...dias, num] })
        }
    }

    function mudarNome(e){
        e.preventDefault();
        setHabito({...habito, name: e.target.value})
    }

    function enviarHabito(e){ // botão cancelar tbm enviar essa requisição
        e.preventDefault();
        console.log(habito)
    }
    
    

    const semana = renderizarDias();

    return (
        <Div>
            <main>
                <form onSubmit={enviarHabito}>               
                <input placeholder='nome do hábito' type="text" value={habito.name} onChange={mudarNome}/>
                <DiasDaSemana>
                    {semana}
                </DiasDaSemana>
                <BotaoSection>
                    <button className='cancelar'type="button">Cancelar</button>
                    <button className='salvar' type="submit">Salvar</button>
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

    input::placeholder{
        color: #DBDBDB;
        
    }

`;

const BotaoSection = styled.section`
    position: absolute;
    right: 16px;
    bottom: 15px;

    button{
        width: 84px;
        height: 35px;
        outline: none;
        border: none;
        border-radius: 4px;

        font-size: 16px
    }

    .cancelar{
        background-color: #fff;
        color: var(--cor-azul-claro)
    }

    .salvar{
        background-color: var(--cor-azul-claro);
        color: #fff;
        margin-left: 23px
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


