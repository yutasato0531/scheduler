import './App.css';
import { useState } from 'react';
import Calendar from './Calendar';
import Operation from './ Operation';

function App() {
  const today = new Date();
  const currentMonth = today.getMonth();
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(0);
  const [newTaskModal, setNewTaskModal] = useState('none');
  const [tasksModal, setTasksModal] = useState('none');
  const [alertModal, setAlertModal] = useState('none');
  const [selectedDay, setSelectedDay] = useState();
  const [taskList, setTaskList] = useState();
  const [userName, setUserName] = useState('');

  const optionOfYear = [];
  for (let i = 2000; i <= 2100; i++) {
    if (i === today.getFullYear()) {
      optionOfYear.push(
        <option value={i} selected>
          {i}
        </option>
      );
    } else {
      optionOfYear.push(<option value={i}>{i}</option>);
    }
  }

  const optionOfMonth = [];
  for (let i = 0; i <= 11; i++) {
    if (i === today.getMonth()) {
      optionOfMonth.push(
        <option value={i + 1} selected>
          {i + 1}
        </option>
      );
    } else {
      optionOfMonth.push(<option value={i + 1}>{i + 1}</option>);
    }
  }

  const optionOfDay = [];
  for (
    let i = 1;
    i <= new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    i++
  ) {
    if (i === today.getDate()) {
      optionOfDay.push(
        <option value={i} selected>
          {i}
        </option>
      );
    } else {
      optionOfDay.push(<option value={i}>{i}</option>);
    }
  }

  const optionOfHour = [];
  for (let i = 0; i <= 24; i++) {
    if (i === today.getHours()) {
      optionOfHour.push(
        <option value={i} selected>
          {i}
        </option>
      );
    } else {
      optionOfHour.push(<option value={i}>{i}</option>);
    }
  }

  const optionOfMinute = [];
  for (let i = 0; i <= 59; i++) {
    if (i === today.getMinutes()) {
      optionOfMinute.push(
        <option value={i} selected>
          {i}
        </option>
      );
    } else {
      optionOfMinute.push(<option value={i}>{i}</option>);
    }
  }

  const allTasks = [];

  function createAllTasks(input) {
    allTasks.push(...input);
    console.log(allTasks);
  }

  async function createTaskList() {
    await fetch(`/api`, {
      method: 'GET',
    })
      .then((res) => res.text())
      .then((data) => createAllTasks(JSON.parse(data)));
  }

  createTaskList();

  return (
    <>
      <h1 className="App">{userName} simple scheduler</h1>
      <Operation
        month={month}
        setMonth={setMonth}
        setYear={setYear}
        setNewTaskModal={setNewTaskModal}
        setUserName={setUserName}
        allTasks={allTasks}
        setAlertModal={setAlertModal}
      />
      <Calendar
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        setTasksModal={setTasksModal}
        setSelectedDay={setSelectedDay}
        setTaskList={setTaskList}
        allTasks={allTasks}
        userName={userName}
      />
      <div style={{ display: newTaskModal }} class="modal">
        <div class="modal-content">
          <div className="closeModal" onClick={() => setNewTaskModal('none')}>
            &times;
          </div>
          <p width={300}>Add new task</p>
          <span>
            <select name="year" className="input">
              {optionOfYear}
            </select>
            年
            <select name="month" className="input">
              {optionOfMonth}
            </select>
            月
            <select name="date" className="input">
              {optionOfDay}
            </select>
            日 &emsp;
            <select name="hour" className="input">
              {optionOfHour}
            </select>
            時
            <select name="minute" className="input">
              {optionOfMinute}
            </select>
            分
          </span>
          <p>
            <input
              style={{ width: 300 }}
              placeholder="Please, enter your new task"
              className="input"
            ></input>
          </p>
        </div>
      </div>
      <div style={{ display: tasksModal }} class="modal">
        <div class="modal-content">
          <span className="closeModal" onClick={() => setTasksModal('none')}>
            &times;
          </span>
          <h3>
            <u>{selectedDay}</u>
          </h3>
          <div style={{ marginLeft: 80, marginRight: 80 }}>
            <list style={{ textAlign: 'left' }}>{taskList}</list>
          </div>
        </div>
      </div>
      <div style={{ display: alertModal }} class="modal">
        <div class="modal-content">
          <span className="closeModal" onClick={() => setAlertModal('none')}>
            &times;
          </span>
          <h3>user is not found
          </h3>
        </div>
      </div>
    </>
  );
}

export default App;
