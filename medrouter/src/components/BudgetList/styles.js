import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 550px;

  font-family: Helvetica, sans-serif;

  overflow: scroll;

  ul {
    background-color: rgba(112, 112, 112, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    li {
      animation-name: fade;
      animation-duration: 500ms;
      box-shadow: 4px 4px 6px 1px rgba(0, 0, 0, 0.16);
      background-color: #fff;
      height: 135px;

      width: 90%;

      margin: 10px;

      border-radius: 4px;

      padding: 5px;
      padding-right: 10px;

      overflow: hidden;

      .budget {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .header {
          color: #666666;
          font-family: Helvetica, sans-serif;
          font-weight: bold;
          font-size: 18px;
        }
        .body {
          margin-left: 20px;
          margin-top: 5px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          .info {
            display: flex;
            align-items: center;

            margin-top: 2px;

            .info-text {
              height: 1em;
              margin-left: 10px;
              font-family: Helvetica, sans-serif;
              font-size: 16px;
              color: #666;

              overflow: hidden;
            }
          }
        }
        .footer {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;

          .icon {
            opacity: 0.6;
            cursor: pointer;
            &:hover {
              opacity: 1;
            }
          }
          button {
            height: 20px;
            width: 100px;

            border: none;

            background-color: ${props =>
              props.primary ? '#df7e38' : '#707070'};

            color: #fff;
            font-size: 14px;
            border-radius: 4px;

            font-family: Helvetica, sans-serif;

            margin: 0 5px 0 5px;

            &:hover {
              opacity: 0.6;
            }
          }
          .secondary {
            background-color: #707070;
          }
          .hide {
            display: none;
          }
        }
      }

      @keyframes fade {
        from {
          opacity: 0;
          transform: translateY(10%);
        }
        to {
          opacity: 1;
          transform: translateY(0%);
        }
      }
    }
  }
`;
