import styled from "styled-components";

export default function Historico() {
    return (
        <>
            <Main>
                <section>
                    <h1>Historico</h1>
                </section>
                <article>
                    <h1>Em breve você poderá ver o histórico dos seus hábitos aqui!</h1>
                </article>
            </Main>
        </>
    )
}


const Main = styled.main`
    width: 100vw;
    margin-top: 70px;
    padding: 0 17px 0 17px;
    margin-bottom: 80px;

    section{

        height: 85px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
            h1{
            font-family: 'Lexend Deca';
            font-size: 23px;
            color: var(--cor-azul-escuro);
        }
    }

    article{
        font-family: 'Lexend Deca';
            font-size: 17px;
            color: #666666 ;
    }
    
`;