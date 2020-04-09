/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import { Container, Content, AxisY, Bar } from './styles';

export default function BarChart({
  title,
  data,
  color,
  size,
  barLenght,
  gradient,
}) {
  const max = data.reduce((a, b) => {
    return Math.max(a, b.value);
  }, 0);

  const [colWidht, setColWidth] = useState(0);

  const NUMCOL = 12;

  useEffect(() => {
    const MAXCOLSIZE = size / NUMCOL;
    let _colWidth = 0;

    if (MAXCOLSIZE - 2 > barLenght) {
      _colWidth = MAXCOLSIZE - 2;
    } else {
      _colWidth = barLenght;
    }

    setColWidth(_colWidth);
  }, [barLenght, size]);

  return (
    <Container color={color}>
      <h1>{title}</h1>
      <Content
        height={`${size + size / 6}px`}
        width={`${size + size / 1.5}px`}
        size={`${size}px`}
      >
        <div className="content">
          <AxisY
            height={`${size + size / 6}px`}
            width={`${colWidht}px`}
            color={color}
          >
            <div className="y">
              <div className="max">{max}</div>
              <div className="min">0</div>
            </div>
          </AxisY>
          <div className="chart">
            {data.map(mounth => (
              <Bar
                size={`${(mounth.value * size) / max}px`}
                height={`${size + size / 6}px`}
                width={`${colWidht * 1.5}px`}
                key={mounth.id}
                color={color}
                gradient={gradient}
              >
                <div className="div1">
                  <div className="bar" />
                </div>

                <div className="div2">
                  <div className="x">{mounth.mounth}</div>
                </div>
              </Bar>
            ))}
          </div>
        </div>
      </Content>
    </Container>
  );
}
