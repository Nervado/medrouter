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
  align-items: center;
  justify-content: space-between;
  width: ${props => props.width};
  height: ${props => props.height};

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .chart {
      height: 100%;
      width: 100%;
      display: flex;

      align-items: center;
      justify-content: space-between;
    }
  }
`;

export const AxisY = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};

  .y {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    color: ${props => props.color};
    font-weight: bold;

    .min {
      margin-bottom: 10px;
    }
  }
`;
export const Bar = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};

  --begin: ${props => props.gradient && props.gradient[0]};
  --end: ${props => props.gradient && props.gradient[1]};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .div1 {
    height: ${props => props.height};
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 2px;
    .bar {
      height: ${props => props.size};
      width: 100%;
      background: linear-gradient(var(--begin), var(--end));
      background-color: ${props => props.color};

      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
    }
  }

  .div2 {
    display: flex;
    align-items: center;
    justify-content: center;

    .x {
      color: ${props => props.color};
      font-family: Helvetica, sans-serif;
      font-size: 12px;
    }
  }
`;
