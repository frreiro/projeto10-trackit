
import { Routes, Route } from "react-router-dom";

import Habitos from "../Componentes/TelaHabitos/Habitos"
import Hoje from "../Componentes/TelaHoje/Hoje"
import Historico from "../Componentes/TelaHistorico/Historico"

import Header from "../Componentes/Header";
import Footer from "../Componentes/Footer";

export default function RotasApp() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/habitos" element={<Habitos />}></Route>
                <Route path="/hoje" element={<Hoje />}></Route>
                <Route path="/historico" element={<Historico />}></Route>
            </Routes>
            <Footer />
        </>

    )
}