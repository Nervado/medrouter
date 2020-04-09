/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import { Container, Content } from './styles';

export default function RingLoading({
  radius,
  stroke,
  progress,
  color,
  title,
}) {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const [strokeDashoffset, setStrokeDashoffset] = useState(0);

  useEffect(() => {
    const _strokeDashoffset = circumference - (progress / 100) * circumference;
    setStrokeDashoffset(_strokeDashoffset);
  }, [circumference, progress]);

  return (
    <Container color={color}>
      <h1>{title}</h1>
      <Content
        strokeDashoffset={strokeDashoffset}
        progress={progress}
        height={`${radius * 2 + radius / 3}px`}
        width={`${radius * 2 + radius / 3}px`}
        color={color}
      >
        <svg className="progress-ring" height={radius * 2} width={radius * 2}>
          <circle
            className="progress-ring__circle"
            stroke={`${color}`}
            fill="rgba(112,112,112,0.03)"
            strokeWidth={stroke}
            strokeDasharray={(circumference, circumference)}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        <div className="progress">{`${progress.toFixed(1)}%`}</div>
      </Content>
    </Container>
  );
}
