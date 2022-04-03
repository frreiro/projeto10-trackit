import { Route, Routes } from "react-router-dom";
import Login from "../Componentes/TelaLogin"
import Cadastro from "../Componentes/TelaCadastro"

export default function RotasLogin() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/cadastro" element={<Cadastro />}></Route>
            </Routes>
        </>
    )
}