/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import {
  FaPlusCircle,
  FaMinusCircle,
  FaRegIdBadge,
  FaStar,
} from 'react-icons/fa';

import { Icon, Actions } from './styles';

const Add = <FaPlusCircle color="green" size={20} />;
const Sub = <FaMinusCircle color="#df7e38" size={20} />;
const Busy = <FaRegIdBadge color="#707070" size={20} />;
const Available = <FaRegIdBadge color="green" size={20} />;

export default function SearchItem({
  id,
  name,
  surname,
  job,
  hired,
  busy,
  stars,
  handleHired,
}) {
  const [_hired, setHired] = useState(hired);

  const data = { id, name, surname, job, hired, busy, stars };

  function handleClick() {
    const isHired = _hired;
    setHired(!_hired);
    if (!isHired) {
      data.hired = true;
      handleHired(id, 'add', { ...data });
    } else {
      data.hired = false;
      handleHired(id, 'remove', { ...data });
    }
  }

  return (
    <div className="search-item">
      <div className="search-item-name">
        <span>{busy ? Busy : Available}</span>
        <span>
          {name} {surname},
        </span>
        <span>{job}</span>
      </div>

      <Actions className="action">
        <span>
          <FaStar color="#df7e38" size={20} />
        </span>
        <span>{stars.toFixed(1)}</span>
        <span>
          <Icon onClickCapture={handleClick}>{_hired ? Sub : Add}</Icon>
        </span>
      </Actions>
    </div>
  );
}
