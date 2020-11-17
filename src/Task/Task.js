import React from 'react'
import DeleteIcon from '../assets/delete.svg'

function Task() {
    const inputRef = React.useRef()

    let [listArray, setListArray] = React.useState([])
    let tempValue;

    function handleChange(value) {
        tempValue = value
    }

    function submit() {
        if (inputRef.current.value === "")
            alert('You must write something')
        else {
            setListArray([...listArray, { taskName: tempValue, isChecked: false }])
            inputRef.current.value = ""
            console.log(listArray)
        }
    }

    function soldCheckbox(taskIndex) {
        var tempArray = listArray
        for (let i = 0; i < tempArray.length; i++) {
            if (taskIndex === i) {
                tempArray[i].isChecked = !tempArray[i].isChecked
            }
        }
        setListArray([])
        setListArray(listArray => listArray.concat(tempArray))
        console.log(listArray)
    }

    function onDelete(task) {
        setListArray(listArray => listArray.filter((x, index) => x.isChecked !== task.isChecked))
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>Task List</h2>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '50px' }}>
                <input ref={inputRef} style={{ border: 'solid 1px black', padding: '5px 10px', marginBottom: '10px' }} type="text" onChange={(e) => handleChange(e.target.value)} name="task" id="taskInput" placeholder="New Task" />
                <button style={{
                    width: '100px',
                    padding: '10px',
                    backgroundColor: 'green',
                    border: 'solid 1px green',
                    color: 'white',
                    fontFamily: 'inherit',
                    fontWeight: 500,
                    cursor: 'pointer',
                    outline: 'none',
                    '&:focus': {
                        outline: 'none'
                    }
                }} onClick={submit}>Add Task</button>
            </div>
            {listArray.length > 0 ? listArray.map((task, index) => {
                return (
                    <div style={{ marginTop: '10px', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} key={index}>
                        <div style={{
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <input type="checkbox" style={{ margin: '0 15px 0 0' }} checked={task.isChecked} onChange={() => soldCheckbox(index)} id="scales" name="scales"
                            />
                            <label style={{ marginTop: '-5px' }} for="scales">{task.taskName}</label>
                        </div>
                        {
                            task.isChecked ?
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                }}>
                                    <img onClick={() => { onDelete(task) }} src={DeleteIcon} style={{ display: 'block', marginLeft: '100px', height: '30px', cursor: 'pointer' }} />
                                </div>
                                : null
                        }
                    </div>
                )
            }) : null}
        </div >
    )
}

export default Task