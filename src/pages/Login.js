import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import loginImg from '../images/login-img.svg';
const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Wrapper>
      <div className='container'>
        <img src={loginImg} alt='Github-user' className='svg-image' />
        <h1>github user</h1>
        <a className='btn' onClick={loginWithRedirect}>
          login / signup
        </a>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    width: 100% !important;
    margin-bottom: 2rem;
  }
  .svg-img {
    width: 100%;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
export default Login;
