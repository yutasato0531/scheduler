import './App.css';
import './index.css';
import { useRef } from 'react';

function Operation(props) {
  const refInput = useRef(null);

  function thisMonth() {
    props.setYear(0);
    props.setMonth(new Date().getMonth());
  }

  function newTaskModalOpen() {
    props.setNewTaskModal('block');
  }

  function changeUserName(userName) {
    const userTasks = props.allTasks.filter(task => task.user_name === userName);
    if(userTasks.length !== 0) {
      props.setUserName(userName)
      console.log(userName);
    }else {
      props.setAlertModal('block');
    }
  }

  return (
    <>
      <div className="buttonContainer">
        <input ref={refInput} className="input" placeholder="user name"></input>
        <button onClick={() => changeUserName(refInput.current.value)}>
          change user
        </button>
        <button onClick={() => newTaskModalOpen()}>New task</button>
        <button onClick={() => thisMonth()}>This month</button>
      </div>
    </>
  );
}

export default Operation;
