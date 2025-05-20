import './App.css';
import './index.css';
// import { useState } from 'react';

function Calendar(props) {
  const date = new Date();
  // const currentMonth = date.getMonth();

  // const [year, setYear] = useState(0);
  // const [month, setMonth] = useState(currentMonth);

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

  //曜日行の生成
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

  //日付の生成
  const weeks = [];
  function createDays(month, year) {
    //翌月の0日目から当月の最終日を設定 .getDate()はDateインスタンスの日を取得
    const daysInMonth = new Date(
      date.getFullYear() - year,
      month + 1,
      0
    ).getDate();

    //当月の初日の曜日を取得 .getDay()はDateインスタンスの曜日取得
    const firstDay = new Date(date.getFullYear() - year, month, 1).getDay();

    //当月の0日目から前月の最終日を取得
    const daysInPrevMonth = new Date(
      date.getFullYear() - year,
      month,
      0
    ).getDate();

    let dayCount = 1;

    //前月最終日から当月初日の曜日を引いて１を足す(曜日は0から始まるインデックス)ことでカレンダーに表示する前月の日付の先頭の日付を取得
    let prevDayCount = daysInPrevMonth - firstDay + 1;

    //１週間の7日分を来月の日付を７日以上生成するまで繰り返す
    for (let i = 0; i < 6; i++) {
      const days = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          const day = prevDayCount;
          days.push(
            <td
              className="mute"
              onClick={() => viewTasks(date.getFullYear() - year, month, day)}
            >
              <a className="muteA" href="#">
                {prevDayCount}
              </a>
            </td>
          );
          prevDayCount++;
        } else if (dayCount > daysInMonth) {
          let nextMonthDayCount = dayCount - daysInMonth;
          days.push(
            <td
              className="mute"
              onClick={() =>
                viewTasks(
                  date.getFullYear() - year,
                  month + 2,
                  nextMonthDayCount
                )
              }
            >
              <a className="muteA" href="#">
                {nextMonthDayCount}
              </a>
            </td>
          );
          dayCount++;
        } else {
          const day = dayCount;
          if (
            dayCount === date.getDate() &&
            year === 0 &&
            month === date.getMonth()
          ) {
            days.push(
              <td
                className="today"
                onClick={() =>
                  viewTasks(date.getFullYear() - year, month + 1, day)
                }
              >
                <a className="todayA" href="#">
                  {dayCount}
                </a>
              </td>
            );
            dayCount++;
          } else {
            days.push(
              <td
                className="days"
                onClick={() =>
                  viewTasks(date.getFullYear() - year, month + 1, day)
                }
              >
                <a className="daysA" href="#">
                  {dayCount}
                </a>
              </td>
            );
            dayCount++;
          }
        }
      }
      weeks.push(<tr>{days}</tr>);

      if (dayCount - daysInMonth > 7) {
        break;
      }
    }
  }

  function viewTasks(year, month, day) {
    props.setTasksModal('block');
    props.setSelectedDay(`${year}年 ${month}月${day}日`);
  }

  createDays(props.month, props.year);

  function monthMove(direction) {
    if (direction && props.month === 11) {
      createDays(0, props.year + 1);
      props.setYear(props.year + 1);
      props.setMonth(0);
    } else if (!direction && props.month === 0) {
      createDays(11, props.year - 1);
      props.setYear(props.year - 1);
      props.setMonth(11);
    } else if (direction) {
      createDays(props.month + 1, props.year);
      props.setMonth(props.month + 1);
    } else if (!direction) {
      createDays(props.month - 1, props.year);
      props.setMonth(props.month - 1);
    }
  }

  return (
    <>
      <h2>
        <table align="center">
          <tr>
            <th className="moveMonth" onClick={() => monthMove(false)}>
              <a href="#">&lt;</a>
            </th>
            <th className="yearAndMonth">
              &emsp;
              {date.getFullYear() + props.year}.{monthName[props.month]}
              &emsp;
            </th>
            <th className="moveMonth" onClick={() => monthMove(true)}>
              <a href="#">&gt;</a>
            </th>
          </tr>
        </table>
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
