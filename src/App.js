import EditablePage from './EditablePage';
import GlobalStyle from './GlobalStyle';
import styled from 'styled-components';

const App = () => {
  return (
    <Wrapper>
      {/* <GlobalStyle />
      <EditablePage /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 1910px;
  height: 1070px;
  background: powderblue;

  border: 5px solid pink;
`;

export default App;
