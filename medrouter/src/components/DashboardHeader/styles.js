import styled, { css } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100px;

  .header-content {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 40px 0 40px;
    .header-div {
      width: 160px;
      height: 60px;
      background-color: #fff;
      box-shadow: 4px 4px 4px rgba(112, 112, 112, 0.4);

      color: #707070;
      font-weight: bold;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 5px 2px 5px 2px;
      /**#B42493  #3B99C3 #DDDD51 #24B498*/

      position: relative;

      .header-title {
        text-shadow: 4px 4px 4px rgba(112, 112, 112, 0.4);
      }

      .header-sub {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .data-1 {
        color: ${props => props.colors[0]};
        font-weight: bold;
        font-size: 20px;
      }
      .data-2 {
        color: ${props => props.colors[1]};
        font-weight: bold;
        font-size: 20px;
      }
      .data-3 {
        color: ${props => props.colors[2]};
        font-weight: bold;
        font-size: 20px;
      }
      .data-4 {
        color: ${props => props.colors[3]};
        font-weight: bold;
        font-size: 20px;
      }
      .data-1,
      .data-2,
      .data-3,
      .data-4 {
        text-shadow: 4px 4px 5px rgba(112, 112, 112, 0.1);
        margin-left: 2px;
      }

      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          margin-right: 2px;
        }
      }
    }
  }
`;

export const Badge = styled.div`
  background: none;
  border: 0;
  position: relative;

  cursor: ${props => (props.hasUnread ? 'pointer' : '')};

  ${props =>
    props.hasUnread &&
    css`
      &::after {
        position: absolute;
        right: -7px;
        top: -7px;
        width: 15px;
        height: 15px;

        color: red;
        border-radius: 50%;
        border: 2px solid red;
        background-color: #fff;

        content: '${props.value}';

        text-align: center;
        vertical-align: center;
        padding-bottom: 1px;

        font-family: Helvetica, sans-serif;

        &:hover {
          color: blue;
        }
      }
    `}
`;
