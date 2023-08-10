import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        font-family: sans-serif;
        color: black;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        // outline: 1px solid #cdd;
    }

    html {
        background: #FBF9EC;
    }

    a {
        text-decoration: none;
    }

    button {
        background: none;
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

    textarea {
        border: none;
        resize: none;
    }
    
    textarea::placeholder {
        color: lightgray;
    }

    .logo {
        font-weight: bold;
        font-size: 20px;
    }
`;

export default GlobalStyle;
