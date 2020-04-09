/* eslint-disable react/prop-types */
import React from 'react';

// import { MdNotifications } from 'react-icons/md';
import { Container, Badge } from './styles';

export default function DashboardHeader({
  icons,
  names,
  data,
  unreadCount,
  hasUnread,
  colors = ['#DE2929', '#3b99c3', '#DDDD51', '#24B498'],
}) {
  return (
    <Container colors={colors}>
      <div className="header-content">
        {icons.map((icon, i) => (
          <Badge
            key={names[i]}
            className="header-div"
            value={unreadCount[i]}
            hasUnread={hasUnread[i]}
          >
            <span className="header-title">{names[i]}</span>
            <div className="header-sub">
              <span>{icon}</span>
              <span className={`data-${i + 1}`}>{data[i]}</span>
            </div>
          </Badge>
        ))}
      </div>
    </Container>
  );
}

//  <MdNotifications color="#7159c1" size={20} />
