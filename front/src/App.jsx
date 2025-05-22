import './App.css';
import { useState, useRef, useEffect } from 'react';
import Calendar from './Calendar';
import Operation from './ Operation';

function App() {
  const today = new Date();

  //useStateの定義
  const currentMonth = today.getMonth();
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(0);
  const [newTaskModal, setNewTaskModal] = useState('none');
  const [tasksModal, setTasksModal] = useState('none');
  const [alertModal, setAlertModal] = useState('none');
  const [loginModal, setLoginModal] = useState('none');
  const [selectedDay, setSelectedDay] = useState();
  const [taskList, setTaskList] = useState();
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [alert, setAlert] = useState();
  const [loginButton, setLoginButton] = useState('Log in');

  //useRefの定義
  const refNewTask = useRef();
  const refYear = useRef();
  const refMonth = useRef();
  const refDate = useRef();
  const refHour = useRef();
  const refMinute = useRef();
  const refUserName = useRef();
  const refPassword = useRef();

  //ユーザーを切り替えた時にユーザーのタスクリスト生成
  useEffect(() => {
    console.log('Effect');
    createTaskList();
  }, [createTaskList, userId]);

  //Appがマウントされた時にログイン画面のモーダルを表示
  useEffect(() => {
    setLoginModal('block');
  }, []);

  //年、月、日、時、分の選択肢生成
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
  for (let i = 0; i <= 45; i += 15) {
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

  //ユーザーリストの生成
  const allUsers = [];
  function createAllUsers(input) {
    allUsers.splice(0);
    allUsers.push(...input);
    console.log(allUsers);
  }
  async function createUserList() {
    await fetch(`/api`, {
      method: 'GET',
    })
      .then((res) => res.text())
      .then((data) => createAllUsers(JSON.parse(data)));
  }

  //ログインしているユーザーのタスクリストの生成
  const userTasks = [];
  function createUserTasks(input) {
    userTasks.splice(0);
    userTasks.push(...input);
    console.log(userTasks);
  }
  async function createTaskList() {
    await fetch(`/api/${userName}`, {
      method: 'GET',
    })
      .then((res) => res.text())
      .then((data) => createUserTasks(JSON.parse(data)));
  }

  createUserList();

  async function addNewTask() {
    if (!userId || !refNewTask.current.value) {
      setAlert('user or task is not defined');
      setNewTaskModal('none');
      setAlertModal('block');
    }
    const taskObj = {
      user_id: userId,
      year: refYear.current.value,
      month: refMonth.current.value,
      date: refDate.current.value,
      hour: refHour.current.value,
      minute: refMinute.current.value,
      task: refNewTask.current.value,
    };
    console.log(taskObj);
    await fetch(`/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskObj),
    })
      .then((res) => res.text())
      .then((data) => console.log(JSON.parse(data)));
    setNewTaskModal('none');
  }

  async function login() {
    console.log(allUsers);
    console.log(refUserName.current.value)
    const user = allUsers.filter((user) => user.user_name === refUserName.current.value);

    if (user.length !== 0) {
      const userName =refUserName.current.value;
      const password = refPassword.current.value;
      await fetch(`/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userName: userName, password: password}),
      })
        .then((res) => res.text())
        .then(state => {
          if(state === 'successful') {
            setUserName(userName);
            setUserId(user[0].id);
            setLoginModal('none');
            setLoginButton('Log out');
            console.log(userName, user[0].id);
          }else {
      setLoginButton('Log in');
      setAlert('incorrect user name of password');
      setAlertModal('block');
    }
        });
      
    } else {
      setLoginButton('Log in');
      setAlert('incorrect user name of password');
      setAlertModal('block');
    }
    setLoginModal('none');
  }

  return (
    <>
      {/* タイトルの描画 */}
      <h1 className="App">{userName} simple scheduler</h1>

      {/* 操作ボタンの描画 */}
      <Operation
        month={month}
        setMonth={setMonth}
        setYear={setYear}
        setNewTaskModal={setNewTaskModal}
        userTasks={userTasks}
        setLoginModal={setLoginModal}
        loginButton={loginButton}
        setLoginButton={setLoginButton}
        setUserName={setUserName}
        setUserId={setUserId}
        setTaskList={setTaskList}
      />
      {/* カレンダーの描画 */}
      <Calendar
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        setTasksModal={setTasksModal}
        setSelectedDay={setSelectedDay}
        setTaskList={setTaskList}
        userTasks={userTasks}
      />

      {/* タスク追加のモーダル */}
      <div style={{ display: newTaskModal }} className="modal">
        <div className="modal-content">
          <div className="closeModal" onClick={() => setNewTaskModal('none')}>
            &times;
          </div>
          <p width={300}>Add new task</p>
          <span>
            <select name="year" className="input" ref={refYear}>
              {optionOfYear}
            </select>
            年
            <select name="month" className="input" ref={refMonth}>
              {optionOfMonth}
            </select>
            月
            <select name="date" className="input" ref={refDate}>
              {optionOfDay}
            </select>
            日 &emsp;
            <select name="hour" className="input" ref={refHour}>
              {optionOfHour}
            </select>
            時
            <select name="minute" className="input" ref={refMinute}>
              {optionOfMinute}
            </select>
            分
          </span>
          <div style={{ margin: 20 }}>
            <input
              style={{ width: 300, borderRadius: 10 }}
              placeholder="Please, enter your new task"
              className="input"
              ref={refNewTask}
            ></input>
          </div>
          <button onClick={addNewTask}>Add to task list</button>
          <div></div>
        </div>
      </div>

      {/* デイリータスク表示のモーダル */}
      <div style={{ display: tasksModal }} className="modal">
        <div className="modal-content">
          <span className="closeModal" onClick={() => setTasksModal('none')}>
            &times;
          </span>
          <h3>
            <u>{selectedDay}</u>
          </h3>
          <div style={{ marginLeft: 150 }}>
            <list style={{ textAlign: 'left' }}>{taskList}</list>
          </div>
        </div>
      </div>

      {/* 警告のモーダル */}
      <div style={{ display: alertModal }} class="modal">
        <div className="modal-content">
          <span className="closeModal" onClick={() => setAlertModal('none')}>
            &times;
          </span>
          <h3>{alert}</h3>
        </div>
      </div>

      {/* ログイン画面のモーダル */}
      <div style={{ display: loginModal }} class="modal">
        <div class="modal-content" style={{ width: 300 }}>
          <span
            className="closeModal"
            onClick={() => {
              setLoginModal('none');
              setLoginButton('Log in');
            }}
          >
            &times;
          </span>
          <h3>Log in</h3>
          <div style={{ textAlign: 'left', marginLeft: 80, marginBottom: 30 }}>
            <h4 style={{ marginBottom: 0 }}>User name</h4>
            <input ref={refUserName}></input>
            <h4 style={{ marginBottom: 0 }}>Password</h4>
            <input ref={refPassword}></input>
            <button
              style={{ marginTop: 30, marginLeft: 30 }}
              onClick={login}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
