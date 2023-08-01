import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: sans-serif;
        color: black;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background: #FBF9EC;
        outline: 1px solid #cdd;
    }

    a {
        text-decoration: none;
    }

    button {
        font-size: 16px;
        border: none;
        cursor: pointer;
    }

    input::placeholder {
        color: lightgray;
    }

    li {
        list-style-type: none;
    }

    .logo {
        font-weight: bold;
        font-size: 20px;
    }
`;

export default GlobalStyle;