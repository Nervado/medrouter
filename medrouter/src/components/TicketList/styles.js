import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 520px;

  font-family: Helvetica, sans-serif;

  background-color: rgba(0, 0, 0, 0.1);
  overflow: scroll;

  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    align-items: center;

    width: 100%;

    li {
      animation-name: fade;
      animation-duration: 500ms;

      overflow: hidden;

      box-shadow: 4px 4px 6px 1px rgba(0, 0, 0, 0.16);

      height: 130px;
      width: 90%;

      margin: 10px;

      border-radius: 4px;
      background-color: #fff;

      .ticket {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;

        padding: 5px 5px 5px 10px;

        .header {
          height: 15px;
          color: #666666;
          font-family: Helvetica, sans-serif;
          font-weight: bold;
          font-size: 16px;
          margin: 5px 0 5px 0;
        }
        .body {
          height: 80px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          flex-wrap: wrap;

          .info {
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: flex-start;

            margin: 2px;

            .info-text {
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
          height: 20px;

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
