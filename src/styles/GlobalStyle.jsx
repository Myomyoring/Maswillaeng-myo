import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}

    * {
        box-sizing: border-box;
        /* outline: 1px solid #cdd; */
    }

    html {
        background: #FBF9EC; // main color
        font-family: sans-serif;
        min-width: 375px;
        min-height: 100vh;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    button {
        background: none;
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
