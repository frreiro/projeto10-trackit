import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GlobalStyle from "../../assets/style"
import ResetStyle from "../../assets/reset"
import Context from "../../Context"

import Login from "../TelaLogin"
import Cadastro from "../TelaCadastro"
import Habitos from "../TelaHabitos/Habitos"

export default function App() {

    const [userData, setUserData] = useState({})

    return (
        <Context.Provider value={{userData, setUserData}}>
            <BrowserRouter>
                <ResetStyle />
                <GlobalStyle />
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/cadastro" element={<Cadastro />}></Route>
                    <Route path="/habitos" element={<Habitos />}></Route>

                </Routes>
            </BrowserRouter>
        </Context.Provider >
    )
}