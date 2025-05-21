import './App.css';
import './index.css';
// import { useRef } from 'react';

function Operation(props) {
  // const refInput = useRef(null);

  function thisMonth() {
    props.setYear(0);
    props.setMonth(new Date().getMonth());
  }

  function newTaskModalOpen() {
    props.setNewTaskModal('block');
  }

  function loginLogout() {
    console.log(props.loginButton);
    if(props.loginButton === 'Log out'){
      props.setUserName('');
      props.setUserId('');
      props.setLoginButton('Log in')
    }else{
      props.setLoginModal('block')
    }
  }

  return (
    <>
      <div className="buttonContainer">
        {/* <input ref={refInput} className="input" placeholder="user name" style={{marginLeft: 0, height: 38, width: 100, borderRadius: 10}}></input> */}
        <button
          style={{
            marginLeft: 10,
            height: 40,
            color: 'black',
            backgroundColor: 'white',
          }}
          onClick={loginLogout}
        >
          {props.loginButton}
        </button>
        <button
          style={{ color: 'white', backgroundColor: 'black', marginLeft:330 }}
          onClick={() => thisMonth()}
        >
          This month
        </button>
        <button
          style={{
            marginLeft: 300,
            color: 'white',
            backgroundColor: 'black',
            visibility: props.loginButton,
          }}
          onClick={() => newTaskModalOpen()}
        >
          New task
        </button>
      </div>
    </>
  );
}

export default Operation;
