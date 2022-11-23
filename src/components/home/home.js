import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import "./home.css";
import Header from "../header/header";
import DropDown from "../dropdown/dropdown";
const Home = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [addTask, setAddTask] = useState("");
  const [blankDataValidate, setBlankDataValidate] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const tableData = fetchedData?.map((task, index) => {
    return (
      <tr key={task.id}>
        <td className="col-1  text-center">{index + 1}</td>
        <td className="col-5">{task.title}</td>
        <td className="col-3 text-center">
          <Button
            className={task.status === "C" ? "CompletedBtn" : "PendingBtn"}
            onClick={() => handleMArkComplete(task)}
            disabled={task.status === "C"}
          >
            {task.status === "C" ? "Completed" : "Pending"}
          </Button>
        </td>
        <td className="col-3  text-center" >
          <Button className="deleteTask" onClick={() => deleteTask(task)}>
            Delete
          </Button>
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

    if (addTask === "") {
      setBlankDataValidate(true);
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
    const data = await axios.get("http://localhost:3009/tasks");
    if(data.status===200){
      setFetchedData(data.data);
      setFilterData(data.data);
    }

  };

  const deleteTask = async (task) => {
    let data=await axios.delete("http://localhost:3009/tasks/" + task.id);
    if(data.status===200){
      getData();
    }
  };

  const onFocus = () => {
    setBlankDataValidate(false);
  };

  const handleSelect = (eventKey) => {
    if (eventKey === "A") {
      getData();
    } else {
      const data = filterData.filter((e) => {
        return e.status === eventKey;
      });
      setFetchedData(data);
    }
  };

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

      <div className="container">
        <DropDown handleSelect={handleSelect} className="float-right" />
      </div>

      <div className="pt-3">
        <Table striped bordered className="container">
          <thead className="bg-dark text-light">
            <tr>
              <th className="col-1 text-center">Sr. No.</th>
              <th className="col-5">Task Title</th>
              <th className="col-3  text-center">Task Status</th>
              <th className="col-3  text-center">Delete Task</th>
            </tr>
          </thead>

          <tbody>
            {fetchedData.length === 0 ? (
              <tr>
                <td></td>
                <td className="noRecords">No Taks Found </td> <td></td>
                <td></td>
              </tr>
            ) : (
              tableData
            )}
          </tbody>
          
        </Table>
      </div>
    </div>
  );
};

export default Home;
