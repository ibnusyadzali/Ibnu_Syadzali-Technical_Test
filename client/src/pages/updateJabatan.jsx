import { Button, Col, Form, Row, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function UpdateJabatan() {
  const id = useParams().jabatanId;
  const navigate = useNavigate();

  const input = {
    id_department: 0,
    nama_jabatan: "",
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
      await fetch(`http://localhost:3001/jabatan/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      navigate("/jabatan");
    } catch (error) {
      console.log(error);
    }
  };
  const [department, setDepartment] = useState();
  const fetchDepartment = async () => {
    try {
      const res = await fetch("http://localhost:3001/department");
      const data = await res.json();
      setDepartment(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDepartment();
  }, []);

  const [jabatan, setJabatan] = useState();
  const fetchJabatan = async () => {
    try {
      const res = await fetch(`http://localhost:3001/jabatan/${id}`);
      const data = await res.json();
      setJabatan(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJabatan();
  }, [id]);

  useEffect(() => {
    if (jabatan) {
      setValues({
        id_department: jabatan.id_department,
        nama_jabatan: jabatan.nama_jabatan,
      });
    }
  }, [jabatan]);

  if (jabatan) {
    return (
      <div className="container-fluid vh-100 d-flex justify-content-center mt-5 pt-5">
        <div className="rounded mt-5 p-3 col-9 shadow-lg" style={{ height: 250 }}>
          <h3 className="text-center"> Update Jabatan</h3>
          <hr />
          <Card.Body className="m-3">
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col className="d-flex flex-column col-3 me-1 text-end justify-content-around fw-bold">
                  <Form.Label>Nama Jabatan:</Form.Label>
                  <Form.Label>Nama Department:</Form.Label>
                </Col>
                <Col className="col-8">
                  <Form.Control className="mb-1" placeholder="Name" name="nama_jabatan" onChange={handleInputChange} value={values.nama_jabatan} />
                  <select name="id_department" className="form-control mb-1" onChange={handleInputChange} value={values.id_department}>
                    {department?.map((el) => {
                      return (
                        <option key={el.id} value={el.id}>
                          {el.nama_department}
                        </option>
                      );
                    })}
                  </select>
                </Col>
              </Row>
              <div className="d-flex justify-content-center">
                <Button variant="success me-3" type="submit">
                  Submit
                </Button>
                <Link to={"/jabatan"} className="btn btn-warning">
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

export default UpdateJabatan;
