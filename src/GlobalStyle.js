import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
${normalize}
html,
body {
  margin: 0;
  padding: 0;

  background-color: #242424;

}

`;

export default GlobalStyle;
