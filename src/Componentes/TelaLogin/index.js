import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import { ThreeDots } from "react-loader-spinner";
import Swal from "sweetalert2";



import Context from "../../Context"
import Logo from "../../assets/logo-trackit.png"

export default function Login() {

    const { userData, setUserData } = useContext(Context)



    const [clicado, setClicado] = useState(false);
    const [dadosLogin, setDadosLogin] = useState({ //FIXME: Retirar o email e senha
        email: "abacaxi@uol.com",
        senha: "123456"
    })
    const navigate = useNavigate();

    const URL_LOGIN = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login"


    function entrarNaConta(e) {
        e.preventDefault();
        setClicado(!clicado);
        const { email, senha } = dadosLogin;
        //fazer o post
        const promise = axios.post(URL_LOGIN, {
            email: email,
            password: senha
        })
        promise.then((resposta) => {
            const { data } = resposta
            setUserData({ ...userData, token: data.token, imagem: data.image });
            navigate("/habitos");
        })
        promise.catch((error) => {
            tratarErro(error.request.status)
        })
    }


    function tratarErro(status) {
        Swal.fire({
            width: '340px',
            heightAuto: false,
            allowEscapeKey: false,
            returnFocus: false,
            allowOutsideClick: false,
            title: `${status === 401 ? "Usuário não encontrado" : "Erro"}`,
            text: `${status === 401 ? "Cadastre-se de graça" : "Por favor, tente novamente"}`,
            icon: "error",
            confirmButtonText: "Voltar",
            showCancelButton: true,
            cancelButtonColor: 'var(--cor-azul-claro)',
            confirmButtonColor: '#CFCFCF',
            cancelButtonText: "Cadastrar-se"
        }).then((result) => {
            if (!result.value) {
                navigate('/cadastro')
            } else {
                setClicado(false);
            }
        });
    }

    const carregar = <ThreeDots height="50" width="50" color="#FFFFFF" ariaLabel="loading" />
    const isCarregando = clicado ? carregar : "Enviar";
    const disableInput = clicado ? 'disable' : ""
    const disableButton = clicado ? (e)=>e.preventDefault() : entrarNaConta;

    return (
        <>
            <Div>
                <img src={Logo} />
                <Marca>TrackIt</Marca>
                <Formulario onSubmit={disableButton} >
                    <input
                        value={dadosLogin.email}
                        type="email"
                        placeholder="email"
                        required
                        className={disableInput}
                        readOnly={clicado}
                        onChange={(e) => setDadosLogin({ ...dadosLogin, email: e.target.value })} />
                    <input
                        value={dadosLogin.senha}
                        type="password"
                        placeholder="senha"
                        required
                        className={disableInput}
                        readOnly={clicado}
                        onChange={(e) => setDadosLogin({ ...dadosLogin, senha: e.target.value })} />
                    <button type="submit">{isCarregando}</button>
                </Formulario>
                <Link to="/cadastro">
                    <TextoCadastro>Não tem uma conta? Cadastre-se!</TextoCadastro>
                </Link>

            </Div>
        </>
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

    a{
        text-decoration: none;
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
        font-size: 20px;
        color: #126BA5;

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

        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 25px;
    }

`;

const TextoCadastro = styled.h1`
    font-size: 13px;
    color: var(--cor-azul-claro);
    text-decoration: underline;
`;

