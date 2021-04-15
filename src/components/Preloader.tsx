import React from 'react';
import styled from "styled-components";

const PreloaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  font-weight: bold;
  font-size: 20px;
`

const Preloader: React.FC = () => <PreloaderWrapper>Loading...</PreloaderWrapper>

export default Preloader
