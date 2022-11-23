import "./header.css"
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
const Header = ({onFocus, blankDataValidate, addNewTask, handleChange, addTask}) => {

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">TODO APP </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarSScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          {/* <div > */}
          {blankDataValidate && (
              <span className="d-flex mx-3 text-danger">* Please add task</span>
            )}
            <Form className="d-flex" onSubmit={addNewTask}>
              <Form.Control
                type="test"
                placeholder="Add new task..."
                className="me-2 inputAddTask"
                aria-label="add"
                onChange={handleChange}
                value={addTask}
                onFocus={onFocus}
              />
              <Button type="submit" variant="success px-4">
                Add
              </Button>
            </Form>

            
          {/* </div> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
