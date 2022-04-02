import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import { ThreeDots } from "react-loader-spinner";

import Logo from "../../assets/logo-trackit.png"

export default function Cadastro() {
    const [clicado, setClicado] = useState(false);
    const [dadosCadastro, setDadosCadastro] = useState({
        email: "",
        senha: "",
        nome: "",
        foto: "",
    })
    const navigate = useNavigate();
    const URL_CADASTRO = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up"

    function enviarCadastro(e) {
        e.preventDefault();
        setClicado(!clicado)
        console.log(dadosCadastro);
        const { email, nome, senha, foto } = dadosCadastro;
        //fazer o post
        const promise = axios.post(URL_CADASTRO, {
            email: email,
            name: nome,
            image: foto,
            password: senha
        })

        promise.then((resposta) => {
            navigate("/")
            console.log(resposta);
        })
        promise.catch((error) => { console.log("Houve um erro no cadastro" + error); })

    }
    const carregar = <ThreeDots height="50" width="50" color="#FFFFFF" ariaLabel="loading" />
    const isCarregando = clicado ? carregar : "Cadastrar";
    const disableInput = clicado ? 'disable' : ""

    return (
        <Div>
            <img src={Logo} />
            <Marca>TrackIt</Marca>
            <Formulario onSubmit={enviarCadastro}>
                <input type="email"className={disableInput} readOnly={clicado} placeholder="email" required onChange={(e) => setDadosCadastro({ ...dadosCadastro, email: e.target.value })} />
                <input type="password" className={disableInput} readOnly={clicado} placeholder="senha" required onChange={(e) => setDadosCadastro({ ...dadosCadastro, senha: e.target.value })} />
                <input type="text" className={disableInput} readOnly={clicado} placeholder="nome" required onChange={(e) => setDadosCadastro({ ...dadosCadastro, nome: e.target.value })} />
                <input type="url" className={disableInput} readOnly={clicado} placeholder="foto" required onChange={(e) => setDadosCadastro({ ...dadosCadastro, foto: e.target.value })} />
                <button type="submit">{isCarregando}</button>
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
    background-color: #FFFFFF;

    a{
        text-decoration: none;
    }

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

    .disable{
        background-color:  #F2F2F2;
        color: #AFAFAF ;
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