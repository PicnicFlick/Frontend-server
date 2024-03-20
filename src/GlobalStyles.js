import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
//@import url('https://webfontworld.github.io/NanumSquareNeo/NanumSquareNeo.css');
/* @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
} */
    // 적용시킬 css 입력
    *{
        box-sizing: border-box;
    }
    a{
        text-decoration: none;
        color: inherit;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 20px;
        vertical-align: baseline;

    }
    hr{
        margin:0;
    }
    body{
        
        line-height: 1;
        font-family: 'Pretendard';
        
    }
    ol, ul{
        list-style: none;
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }
`;

export default GlobalStyles;
