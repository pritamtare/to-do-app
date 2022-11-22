import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import "./home.css";
import Header from "../header/header";
import ModalComp from "../modal/modal";

const Home = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [addTask, setAddTask] = useState("");
  const [blankDataValidate, setBlankDataValidate] = useState(false)

  useEffect(() => {
    getData();
  }, []);



  const tableData = fetchedData?.map((task, index) => {
    return (
      <tr key={task.id}>
        <td className="col-1">{index + 1}</td>
        <td className="col-6">{task.title}</td>
        <td className="col-3">
          <Button
            // className="statusBtn"
            className= { task.status === "C" ? "CompletedBtn" : "PendingBtn"} 
            onClick={() => handleMArkComplete(task)}
            disabled={task.status === "C"}
          >
            {task.status === "C" ? "Completed" : "Pending"}
          </Button>
        </td>
        <td className="col-3">
          <Button className="deleteTask" onClick={()=>deleteTask(task)}>Delete</Button>
        </td>
      </tr>
    );
  });

  const handleChange = (e) => {
    setAddTask(e.target.value);
  };

  const addNewTask = async (e) => {
    e.preventDefault();

    const tasks = {
      title: addTask,
      status: "P",
    };

    if(addTask === ""){
      setBlankDataValidate(true)
        return false;
    }
    let response = await axios.post("http://localhost:3009/tasks", {
      ...tasks,
    });

    if (response.status === 201) {
      getData();
      setAddTask("");
    }
  };

  const handleMArkComplete = async (task) => {
    const tasks = {
      ...task,
      status: "C",
    };

    let response = await axios.put(`http://localhost:3009/tasks/${task.id}`, {
      ...tasks,
    });

    if (response.status === 200) {
      getData();
    }
  };

  const getData = async () => {
    // if(fetchedData.status==="C"){
    // setIsDisabled(false)
    // }
    const data = await axios.get("http://localhost:3009/tasks");
    setFetchedData(data.data);
  };

  const deleteTask = async (task) => {
        await axios.delete("http://localhost:3009/tasks/" + task.id)
        getData();
  }

  const onFocus = () =>{
    setBlankDataValidate(false);
  }

  return (
    <div>
      <Header
        getData={getData}
        setAddTask={setAddTask}
        addTask={addTask}
        addNewTask={addNewTask}
        handleChange={handleChange}
        blankDataValidate={blankDataValidate}
        onFocus={onFocus}
      />

      <div className="py-5">
        <Table striped bordered className="container">
          <thead className="bg-dark text-light">
            <tr>
              <th className="col-1">SR. No.</th>
              <th className="col-6">Task Title</th>
              <th className="col-3">Task Status</th>
              <th className="col-3">Delete Task</th>
            </tr>
          </thead>

          <tbody>
            
            {  fetchedData.length === 0 ? <tr><td></td><td   className="noRecords">No Taks Found </td> <td></td><td></td></tr> :  tableData }
            
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
