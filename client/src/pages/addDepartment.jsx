import { Button, Col, Form, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddDepartment() {
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
      await fetch(`http://localhost:3001/department/add`, {
        method: "POST",
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

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center mt-5 pt-5">
      <div className="rounded mt-5 p-3 col-9 shadow-lg" style={{ height: 200 }}>
        <h3 className="text-center"> Menambah Department Baru</h3>
        <hr />
        <Card.Body className="m-3">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col className="d-flex flex-column col-3 me-1 text-end justify-content-around fw-bold">
                <Form.Label>Nama Department:</Form.Label>
              </Col>
              <Col className="col-8">
                <Form.Control className="mb-1" placeholder="Masukan nama department di sini" name="nama_department" onChange={handleInputChange} value={values.nama_department} />
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

export default AddDepartment;
