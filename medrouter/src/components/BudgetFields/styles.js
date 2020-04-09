import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px 0 15px;

  .yup-warn {
    display: block;
  }

  .custom-input {
    height: 50px;

    margin-top: 10px;

    margin-left: 5px;

    box-shadow: 2px 2px 3px 1px #df7e38;

    width: 200px;

    color: #707070;
    font-size: 18px;
    font-family: Helvetica, sans-serif;

    text-align: center;
    vertical-align: center;
  }
`;

export const InputArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const Input = styled.input.attrs(props => ({
  type: 'text',
  placeholder: props.placeholder,
  value: props.value,
  name: props.name,
}))`
  height: 50px;

  margin: 5px;
  padding: 0 5px 0 5px;

  box-shadow: 2px 2px 3px 1px #df7e38;

  opacity: 1;

  border: none;
  font-family: Helvetica, sans-serif;

  color: #000000;
  font-size: 18px;

  flex-basis: ${props => (props.width ? props.width : '50px')};
  flex-grow: ${props => (props.grow ? props.grow : 0)};
  width: ${props => (props.shk ? props.shk : 0)};

  &::placeholder {
    opacity: 0.8;
    color: #707070;
  }
`;

export const TextArea = styled.div`
  height: 200px;
  width: 100%;

  padding: 0 5px 0 5px;
  textarea {
    padding: 5px;
    border: none;
    width: 100%;
    height: 100%;
    box-shadow: 2px 2px 3px 1px #df7e38;
    font-family: Helvetica, sans-serif;

    color: #000000;

    font-size: 18px;
    &::text {
      opacity: 0.8;
      color: #707070;
    }
  }
`;

export const StyledPicker = styled.div`
  height: 50px;

  margin-top: 10px;

  margin-left: 5px;

  box-shadow: 2px 2px 3px 1px #df7e38;

  width: 200px;

  color: #707070;
  font-size: 18px;
  font-family: Helvetica, sans-serif;

  text-align: center;
  vertical-align: center;
`;

//
