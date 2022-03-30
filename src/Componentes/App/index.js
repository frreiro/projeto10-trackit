import UserContext from "../../Context"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../TelaLogin"
import Cadastro from "../TelaCadastro"
import Habitos from "../TelaHabitos"


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path="/cadastro" element={<Cadastro/>}></Route>
                <Route path="/habitos" element={<Habitos/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}