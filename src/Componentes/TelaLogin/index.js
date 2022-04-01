import {useState, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import { useContext } from "react"

import Context from "../../Context"
import Logo from "../../assets/logo-trackit.png"

export default function Login() {

    const {userData, setUserData} = useContext(Context)
    
    const [dadosLogin, setDadosLogin] = useState({
        email: "",
        senha:""
    }) 

    const navigate = useNavigate();

    const URL_LOGIN = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"

    function entrarNaConta(e) {
        e.preventDefault();
        const {email, senha} = dadosLogin;
        //fazer o post
        const promise = axios.post(URL_LOGIN, {
            email: email,
            password: senha
        })
        promise.then((resposta)=>{
            const {data} = resposta
            setUserData({...userData, token: data.token, imagem: data.image});
            navigate("/habitos");
        })
        promise.catch((error)=> console.log(error))
    }

    return (
        <Div>
            <img src={Logo} />
            <Marca>TrackIt</Marca>
            <Formulario onSubmit={entrarNaConta}>
                <input value={dadosLogin.email} type="email" placeholder="email" required onChange={(e) => setDadosLogin({...dadosLogin, email: e.target.value})}/>
                <input value={dadosLogin.senha} type="password" placeholder="senha"  required onChange={(e) => setDadosLogin({...dadosLogin, senha: e.target.value})}/>
                <button type="submit">Entrar</button>
            </Formulario>
            <Link to="/cadastro">
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
    background-color: #FFFFFF;

    img{
        width: 154px;
        height: 100px;
    }
`;

const Marca = styled.h1`
    font-size: 69px;
    font-family: 'Playball';
    color: var(--cor-azul-escuro);
    margin-bottom: 32px;
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
        background-color: var(--cor-azul-claro);
        border-radius: 5px;
        border: none;

        font-size: 20px;
        color: white;


        margin-bottom: 25px;
    }

`;

const TextoCadastro = styled.h1`
    font-size: 13px;
    color: var(--cor-azul-claro);
    text-decoration: underline;
`;