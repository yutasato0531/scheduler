import './App.css';
import './index.css';
import { useState } from 'react';

function Calendar() {
  const date = new Date();
  console.log('🚀 ~ Calendar ~ date:', date);
  const today = date.getDate();
  console.log('🚀 ~ Calendar ~ today:', today);
  const currentMonth = date.getMonth();
  console.log('🚀 ~ Calendar ~ currentMonth:', currentMonth);

  const [month, setMonth] = useState(currentMonth);

  const monthName = {
    0: 'January',
    1: 'Feburary',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };

  const monthDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const dayOfWeek = [];
  for (let i = 0; i < 7; i++) {
    if (i === 0) {
      dayOfWeek.push(<th className="sun">{monthDays[i]}</th>);
    } else if (i === 6) {
      dayOfWeek.push(<th className="sat">{monthDays[i]}</th>);
    } else {
      dayOfWeek.push(<th className="weekDay">{monthDays[i]}</th>);
    }
  }

  const weeks = [];
  function createDays(month) {
    const daysInMonth = new Date(
      date.getFullYear(),
      month + 1,
      0
    ).getDate();
    console.log("🚀 ~ createDays ~ daysInMonth:", daysInMonth)
    
    const firstDay = new Date(date.getFullYear(), month, 1).getDay();
    console.log("🚀 ~ createDays ~ firstDay:", firstDay)

    const daysInPrevMonth = new Date(
      date.getFullYear(),
      month,
      0
    ).getDate();
    console.log("🚀 ~ createDays ~ daysInPrevMonth:", daysInPrevMonth)

    let dayCount = 1;
    let prevDayCount = daysInPrevMonth - firstDay + 1;

    for (let i = 0; i < 6; i++) {
      const days = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          days.push(<td className="mute">{prevDayCount}</td>);
          prevDayCount++;
        } else if (dayCount > daysInMonth) {
          let nextMonthDayCount = dayCount - daysInMonth;
          days.push(<td className="mute">{nextMonthDayCount}</td>);
          dayCount++;
        } else {
          days.push(<td className="days">{dayCount}</td>);
          dayCount++;
        }
      }
      weeks.push(<tr>{days}</tr>);

      if (dayCount - daysInMonth > 7) {
        break;
      }
    }
  }

  createDays(month);

  function monthMove(direction) {
    if (direction) {
      createDays(month + 1);
      setMonth(month + 1);
    } else {
      createDays(month -1);
      setMonth(month - 1);
    }
  }

  return (
    <>
      <h2>
        <span className="moveMonth" onClick={() => monthMove(false)}>
          &lt;
        </span>
        <span>&emsp;{monthName[month]}&emsp;</span>
        <span className="moveMonth" onClick={() => monthMove(true)}>
          &gt;
        </span>
      </h2>
      <div id="calendar" class="calendar-wrap">
        <table className="calendar">
          <tr>{dayOfWeek}</tr>
          {weeks}
        </table>
      </div>
    </>
  );
}

export default Calendar;
