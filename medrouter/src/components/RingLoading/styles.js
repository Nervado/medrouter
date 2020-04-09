import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    color: ${props => props.color};
    text-shadow: 2px 3px 4px rgba(112, 112, 112, 0.2);
    font-size: 1em;
    font-family: Helvetica, sans-serif;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${props => props.width};
  height: ${props => props.height};
  position: relative;

  .progress-ring {
    .progress-ring__circle {

      animation: load linear normal 1s;


      transform: rotate(-90deg);
      transform-origin: 50% 50%;

    }
    @keyframes load {

      from {

        stroke-dashoffset: ${props => props.strokeDashoffse};

      }
      to {

        stroke-dashoffset: 0;
      }
    }
  }

  /*${props => props.strokeDashoffset / props.progress} **/

  .progress {
    position: absolute;

    width: 100%;
    height: 100%;
    color: ${props => props.color};
    font-size: 2.5em;
    font-family: Helvetica, sans-serif;
    font-weight: bold;

    text-shadow: 2px 3px 4px rgba(112, 112, 112, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .data-1 {
    color: #de2929;
    font-weight: bold;
    font-size: 20px;
  }
  .data-2 {
    color: #3b99c3;
    font-weight: bold;
    font-size: 20px;
  }
  .data-3 {
    color: #dddd51;
    font-weight: bold;
    font-size: 20px;
  }
  .data-4 {
    color: #24b498;
    font-weight: bold;
    font-size: 20px;
  }
`;
