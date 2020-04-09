import React, { useState, useEffect, useMemo } from 'react';

import {
  FaRegCalendarCheck,
  FaRegCalendar,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  getDaysInMonth,
  getYear,
  getMonth,
  getDay,
  getDate,
  setDate,
  addMonths,
  subMonths,
  subDays,
  addDays,
  isSameDay,
  format,
} from 'date-fns';
import pt from 'date-fns/locale/pt';

import { weekDays, months } from '../../utils/helpers/calendarConstants';

import {
  Container,
  Header,
  Title,
  List,
  StyledButton,
  HeaderCalendar,
  HeaderBody,
} from './styles';

export default function SimpleDatePicker({
  defaultValues,
  placeholderText,
  onChange,
}) {
  const [visible, setVisible] = useState(false);
  const [date, setNewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daysrange, setDaysrange] = useState([]);

  const today = new Date();

  function handlePrevMounth() {
    setNewDate(subMonths(date, 1));
  }

  function handleNextMounth() {
    setNewDate(addMonths(date, 1));
  }

  const dateFormatted = useMemo(() => {
    return format(selectedDate, "d 'de' MMMM 'de' yyyy", {
      locale: pt,
    });
  }, [selectedDate]);

  useEffect(() => {
    let index = 0;
    const days = [];
    let offset;

    const initialDate = setDate(date, 1);

    offset = getDay(initialDate);

    if (offset === 0) offset = 6;
    if (offset >= 1 && offset <= 6) offset -= 1;

    while (index < offset) {
      days.push(subDays(initialDate, 6 - index));
      index += 1;
    }

    index = 0;
    const daysInMounth = getDaysInMonth(initialDate);

    while (index < daysInMounth) {
      days.push(addDays(initialDate, index));
      index += 1;
    }

    setDaysrange([...days]);
  }, [date]);

  return (
    <Container
      onMouseLeave={() => {
        setVisible(false);
      }}
    >
      <Header>
        <Title
          onClick={() => setVisible(!visible)}
          selected={defaultValues || selectedDate > today ? 1 : 0}
        >
          <span>
            {selectedDate > today
              ? dateFormatted
              : defaultValues || placeholderText}
          </span>
          <span style={{ color: '#df7e38' }}>
            {defaultValues || selectedDate > today ? (
              <FaRegCalendarCheck />
            ) : (
              <FaRegCalendar />
            )}
          </span>
        </Title>
      </Header>
      <List
        visible={visible}
        onMouseLeave={() => {
          setVisible(false);
          setNewDate(selectedDate);
        }}
      >
        <HeaderCalendar>
          <div className="year-wrapper">
            <FaChevronLeft
              className="icon"
              size={12}
              style={{ color: '#fff' }}
              onClick={handlePrevMounth}
            />
            <div className="year">
              {months[getMonth(date)]}
              <span> de </span>
              {getYear(date)}
            </div>
            <FaChevronRight
              className="icon"
              size={12}
              style={{ color: '#fff' }}
              onClick={handleNextMounth}
            />
          </div>
          <div className="week-days">
            {weekDays.map(weekday => {
              return (
                <div key={weekday.toString()} className="day-header">
                  {weekday.toString()}
                </div>
              );
            })}
          </div>
        </HeaderCalendar>
        <HeaderBody>
          {daysrange.map(item => {
            return (
              <div className="day" key={item.toString()}>
                <StyledButton
                  disabled={
                    !(item > today) || getMonth(item) !== getMonth(date)
                  }
                  selected={isSameDay(item, selectedDate) ? 1 : 0}
                  onClick={() => {
                    setVisible(false);
                    setSelectedDate(item);
                    onChange(item);
                  }}
                >
                  {getMonth(item) !== getMonth(date) ? ' ' : getDate(item)}
                </StyledButton>
              </div>
            );
          })}
        </HeaderBody>
      </List>
    </Container>
  );
}

SimpleDatePicker.propTypes = {
  placeholderText: PropTypes.string,
  onChange: PropTypes.func,
  defaultValues: PropTypes.string,
};

SimpleDatePicker.defaultProps = {
  placeholderText: '',
  onChange: null,
  defaultValues: '',
};
