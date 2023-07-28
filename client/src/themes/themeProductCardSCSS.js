import styled from 'styled-components';

const CardContainer = styled.div`
  box-shadow: 5px 5px 5px #acacac;
  align-items: baseline;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-image: url(${(props) => props.imageurl});
  background-size: ${(props) => props.size};
  background-position: center;
  border-radius: 15px;
  position: relative;
  background-repeat: no-repeat;
  background-color: white;
  overflow: hidden;
  ${(props) =>
    props.sale === 'true'
      ? `
        &::after {
         content: 'Sale';
         color: white;
         text-align: center;
         padding-top: 27px;
         background-color: #7ba158;
         height: 65px;
         width: 65px;
         position: absolute;
         top: -15px;
         right: -18px;
         border-radius: 50%;
         transform: rotateZ(45deg);
         animation: pulsate 2s ease-in-out infinite;
    }
        `
      : ''};
  @keyframes pulsate {
    0% {
      opacity: 0.3;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.3;
    }
  }
`;

export default CardContainer;
