import styled from 'styled-components';
import Head from 'next/head';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';
function Login() {
  const SingIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };
  return (
    <Container>
      <Head>
        <title>login</title>
      </Head>
      <LoginContainer>
        <Logo src='https://logospng.org/download/whatsapp/logo-whatsapp-1024.png' />
        <Button onClick={SingIn} variant='outlined'>
          Sing in
        </Button>
      </LoginContainer>
    </Container>
  );
}

export default Login;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;

  background-color: white;
  border-radius: 13px;
  padding: 100px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.6);
`;

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;
const Logo = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
`;
