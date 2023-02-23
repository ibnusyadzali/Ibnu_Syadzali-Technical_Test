import { Button, Col, Form, Row, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function UpdateDepartment() {
  const id = useParams().departmentId;
  const navigate = useNavigate();

  const input = {
    nama_department: "",
  };
  const [values, setValues] = useState(input);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:3001/department/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      navigate("/department");
    } catch (error) {
      console.log(error);
    }
  };

  const [department, setDepartment] = useState();
  const fetchDepartment = async () => {
    try {
      const res = await fetch(`http://localhost:3001/department/${id}`);
      const data = await res.json();
      setDepartment(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDepartment();
  }, [id]);

  useEffect(() => {
    if (department) {
      setValues({
        nama_department: department.nama_department,
      });
    }
  }, [department]);

  if (department) {
    return (
      <div className="container-fluid vh-100 d-flex justify-content-center mt-5 pt-5">
        <div className="rounded mt-5 p-3 col-9 shadow-lg" style={{ height: 200 }}>
          <h3 className="text-center"> Update Department</h3>
          <hr />
          <Card.Body className="m-3">
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col className="d-flex flex-column col-2 me-1 text-end justify-content-around fw-bold">
                  <Form.Label>Name:</Form.Label>
                </Col>
                <Col className="col-9">
                  <Form.Control className="mb-1" placeholder="Name" name="nama_department" onChange={handleInputChange} value={values.nama_department} />
                </Col>
              </Row>
              <div className="d-flex justify-content-center">
                <Button variant="success me-3" type="submit">
                  Submit
                </Button>
                <Link to={"/department"} className="btn btn-warning">
                  Cancel
                </Link>
              </div>
            </Form>
          </Card.Body>
        </div>
      </div>
    );
  }
}

export default UpdateDepartment;
