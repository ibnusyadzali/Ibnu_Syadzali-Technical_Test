import { Button, Col, Form, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AddJabatan() {
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
      await fetch(`http://localhost:3001/jabatan/add`, {
        method: "POST",
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

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center mt-5 pt-5">
      <div className="rounded mt-5 p-3 col-9 shadow-lg" style={{ height: 250 }}>
        <h3 className="text-center"> Menambah Jabatan Baru</h3>
        <hr />
        <Card.Body className="m-3">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col className="d-flex flex-column col-3 me-1 text-end justify-content-around fw-bold">
                <Form.Label>Nama Jabatan:</Form.Label>
                <Form.Label>Nama Department:</Form.Label>
              </Col>
              <Col className="col-8">
                <Form.Control className="mb-1" placeholder="Masukan nama jabatan di sini" name="nama_jabatan" onChange={handleInputChange} value={values.nama_jabatan} />
                <select name="id_department" className="form-control mb-1 w-50 text-center" onChange={handleInputChange} defaultValue={values.id_department}>
                  <option>--- Pilih Salah Satu ---</option>
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

export default AddJabatan;
