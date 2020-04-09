import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`

--oposta: rgba(255,255,255,1);
--oposta1: rgba(252,204,255,1);
--medium2: rgba(153,217,255,1);
--medium1: rgba(41,171,226,1);
--base1: rgba(0,159,255,1);
--base: rgba(0,50,160,1);
--error: rgba(200,50,50,1)
--warn: rgba(200,255,0,1)


:root {
  --main-bg-color: pink;
}

body {
  background-color: var(--main-bg-color);
}



  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }
   #root {
    height: 100%;
  }

  body , html, #root {

    width: 100%;
    z-index: 0;
    height: 860px;

}



  body,html,#root {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body, input, button {
    font: 14px, 'Roboto', sans-serif;
  }
  a {text-decoration: none;}

  ul { list-style: none;}

  button {
    cursor: pointer;
  }


  .success {
    font-family: Helvetica, sans-serif;
    color: #fff;

    background-color: #df7e38;
    box-shadow: 2px 2px 3px 1px #df7e38;
  }


`;
