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
    const user = props.allUsers.filter(user => user.user_name === userName);
    if(user.length !== 0) {
      props.setUserName(userName)
      props.setUserId(user[0].id)
      console.log(userName, props.userId);
    }else {
      props.setAlert('user is not found')
      props.setAlertModal('block');
    }
  }

  return (
    <>
      <div className="buttonContainer">
        <input ref={refInput} className="input" placeholder="user name" style={{marginLeft: 0, height: 38, width: 100, borderRadius: 10}}></input>
        <button style={{marginLeft: 10, height: 40, color: 'white', backgroundColor: 'black'}} onClick={() => changeUserName(refInput.current.value)}>
          OK
        </button>
        <button style={{marginLeft: 500, color: 'white', backgroundColor: 'black'}} onClick={() => newTaskModalOpen()}>New task</button>
        <button style={{color: 'white', backgroundColor: 'black'}} onClick={() => thisMonth()}>This month</button>
      </div>
    </>
  );
}

export default Operation;
