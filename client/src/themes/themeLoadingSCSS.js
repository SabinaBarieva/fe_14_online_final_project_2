import styled from 'styled-components';

export const LoadingContainer = styled.div`
  width: 100%;
  max-width: 520px;
  text-align: center;
  color: #484543;
  position: relative;
  margin: 0 auto;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: #484543;
    bottom: 0;
    left: 0;
    border-radius: 10px;
    animation: movingLine 2.4s infinite ease-in-out;
  }

  @keyframes movingLine {
    0% {
      opacity: 0;
      width: 0;
    }

    33.3%,
    66% {
      opacity: 0.8;
      width: 100%;
    }

    85% {
      width: 0;
      left: initial;
      right: 0;
      opacity: 1;
    }

    100% {
      opacity: 0;
      width: 0;
    }
  }
`;

export const LoadingText = styled.div`
  font-size: 3vw;
  line-height: 64px;
  letter-spacing: 10px;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-evenly;
  span {
    animation: moveLetters 2.4s infinite ease-in-out;
    transform: translatex(0);
    position: relative;
    display: inline-block;
    opacity: 0;
    text-shadow: 0 2px 10px rgba(46, 74, 81, 0.3);
  }
}

@keyframes moveLetters {
  0% {
    transform: translateX(-15vw);
    opacity: 0;
  }

  33.3%, 66% {
    transform: translateX(0);
    opacity: 1;
  }

  100% {
    transform: translateX(15vw);
    opacity: 0;
  }
}`;
