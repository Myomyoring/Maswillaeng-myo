import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: sans-serif;
        color: black;
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

    ul {
        list-style-type: none;
    }

    textarea {
        border: none;
        resize: none;
    }
    
    textarea::placeholder {
        color: lightgray;
    }
`;

export default GlobalStyle;
