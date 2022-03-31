import styled from "styled-components"



export default function Header(){
    return (
        <Cabecalho>
            <h1>TrackIt</h1>
            <img src="https://s2.glbimg.com/rl2qA0jqm8CYvBh7ZTnAu8NG6ds=/0x0:1999x3000/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_b58693ed41d04a39826739159bf600a0/internal_photos/bs/2021/N/1/8FdLsPS2G4uiUV4a8MOg/abacaxi.jpg" />
        </Cabecalho>
    )
}



const Cabecalho = styled.header`
    width: 100vw;
    height: 70px;
    padding: 0 18px 0 18px;
    background-color: var(--cor-azul-escuro);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    display: flex;
    justify-content: space-between;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    
    h1{
        font-size: 40px;
        font-family: 'Playball';
        color: white;
    }

    img{
        width: 51px;
        height: 51px;
        border-radius: 98px
    }

`;

