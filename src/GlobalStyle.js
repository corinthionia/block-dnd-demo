import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0;
 
  /* Center Container */
  display: flex;
  align-items: center;
  justify-content: center;
}
`;

export default GlobalStyle;
