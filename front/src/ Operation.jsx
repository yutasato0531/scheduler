import './App.css';
import './index.css';
import {} from 'react';

function Operation(props) {
  const month = new Date().getMonth();

  function thisMonth() {
    props.setYear(0);
    props.setMonth(month);
  }

  function newTaskModalOpen() {
    props.setNewTaskModal('block');
  }

  return (
    <>
      <div className='buttonContainer'>
        <button onClick={() => newTaskModalOpen()}>New task</button>
        <button onClick={() => thisMonth()} className='input'>This month</button>
        {/* <button onClick={() => {}}>Update</button> */}
      </div>
    </>
  );
}

export default Operation;
