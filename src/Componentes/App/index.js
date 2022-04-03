import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"


import Context from "../../Context"
import GlobalStyle from "../../assets/style"
import ResetStyle from "../../assets/reset"

import Login from "../../Componentes/TelaLogin"
import Cadastro from "../../Componentes/TelaCadastro"
import Habitos from "../../Componentes/TelaHabitos/Habitos"
import Hoje from "../../Componentes/TelaHoje/Hoje"
import Historico from "../../Componentes/TelaHistorico/Historico"

import Header from "../../Componentes/Header";
import Footer from "../../Componentes/Footer";


import RotasLogin from "../../RotasLogin"
import RotasApp from "../../RotasApp"

export default function App() {

    const [userData, setUserData] = useState({
        imagem: "",
        token: "",
        dados: [{}],
        novoHabito: { name: "", days: [] },
        porcentagem: 0,
        atualizar: false
    })
    return (
        <Context.Provider value={{ userData, setUserData }}>
            <BrowserRouter>
                <ResetStyle />
                <GlobalStyle />
                {userData.token !== ""  ? <Header />: <></>}
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/cadastro" element={<Cadastro />}></Route>
                    {/* {userData.token === "" ? <RotasLogin /> : <RotasApp />} */}
                    <Route path="/habitos" element={<Habitos />}></Route>
                    <Route path="/hoje" element={<Hoje />}></Route>
                    <Route path="/historico" element={<Historico />}></Route>
                </Routes>
                {userData.token !== ""  ? <Footer />: <></>}
                
            </BrowserRouter>
        </Context.Provider >
    )
}