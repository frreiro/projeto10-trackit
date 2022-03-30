import {useState, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"
import styled from "styled-components"

export default function Cadastro() {

    const [dadosCadastro, setDadosCadastro] = useState({
        email: "",
        senha: "",
        nome:"", 
        foto:"", 

    })

    function enviarCadastro(e){
        e.preventDefault();
        //fazer o post
        console.log(dadosCadastro);
    }

    return (
        <Div>
            <img src="https://www.apaulista.org.br/wp-content/uploads/2021/02/youtube-logo.png" />
            <Formulario onSubmit={enviarCadastro}>
                <input type="email" placeholder="email" required onChange={(e)=>setDadosCadastro({...dadosCadastro, email: e.target.value})}/>
                <input type="password" placeholder="senha"required  onChange={(e)=>setDadosCadastro({...dadosCadastro, senha: e.target.value})} />
                <input type="text" placeholder="nome" required  onChange={(e)=>setDadosCadastro({...dadosCadastro, nome: e.target.value})}/>
                <input type="url" placeholder="foto" required  onChange={(e)=>setDadosCadastro({...dadosCadastro, foto: e.target.value})}/>
                <button type="submit">Cadastrar</button>
            </Formulario>
            <Link to="/">
                <TextoCadastro>Não tem uma conta? Cadastre-se!</TextoCadastro>
            </Link>

        </Div>
    )
}


const Div = styled.div`
    width: 100vw;
    height:100vh;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;

    img{
        width: 180px;
        height: 180px;
    }

`;

const Formulario = styled.form`
    display: flex;
    flex-direction: column;

    input{
        width: 303px;
        height: 45px;
        background-color: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        outline:none;
        padding-left: 11px;
        margin-bottom: 6px;

        }

    input::placeholder{
        color: #DBDBDB;
    }

    button{
        width: 303px;
        height: 45px;
        background-color: #52B6FF;
        border-radius: 5px;
        border: none;

        font-size: 20px;
        color: white;


        margin-bottom: 25px;
    }

`;

const TextoCadastro = styled.h1`
    font-size: 13px;
    color: #52B6FF;
    text-decoration: underline;
`;