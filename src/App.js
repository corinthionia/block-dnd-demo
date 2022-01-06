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
  width: 1920px;
  height: 1080px;
  background: powderblue;
`;

export default App;
