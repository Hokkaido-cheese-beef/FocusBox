import styled from "styled-components"

export const OutWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const styledDiv = styled.div`
    text-align: center;
    justify-content: center;
    align-items: center;
    margin-top: 45.44px;
`;

export const popupWrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(0,0,0, 0.5);
`;

export const Slider = styled.div`
    overflow: scroll;
    width: 100%;
    height: 100%;
    /* overflow-x: hidden; */
    ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background: #bf33ff77;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-track {
        background: #bf33ff11;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-corner{
        background: #bf33ff00;
    }
`
