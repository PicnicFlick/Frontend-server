import { Link } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: 'BMJua';
    font-weight: normal;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/BMJua/BMJua.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/BMJua/BMJua.eot?#iefix') format('embedded-opentype'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/BMJua/BMJua.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/BMJua/BMJua.woff') format('woff'),
         url('https://cdn.jsdelivr.net/gh/webfontworld/BMJua/BMJua.ttf') format("truetype");
    font-display: swap;
} 
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
        font-family: 'Pretendard-Variable';
        overscroll-behavior: none; //스크롤 체이닝 방지
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
