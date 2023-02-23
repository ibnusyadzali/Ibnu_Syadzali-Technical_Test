import { Button, Col, Form, Row, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AddKaryawan() {
  const id = useParams().karyawanId;
  const navigate = useNavigate();

  const input = {
    name: "",
    id_jabatan: 0,
    age: 0,
    gender: "",
    tanggal_lahir: "",
    alamat: "",
  };
  const [values, setValues] = useState(input);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(name, value);
  };
  console.log(values);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:3001/karyawan/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      navigate("/karyawan");
    } catch (error) {
      console.log(error);
    }
  };

  const [jabatan, setJabatan] = useState();
  const fetchJabatan = async () => {
    try {
      const res = await fetch("http://localhost:3001/jabatan");
      const data = await res.json();
      setJabatan(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJabatan();
  }, []);

  const [karyawan, setKaryawan] = useState();
  const fetchKaryawan = async () => {
    try {
      const res = await fetch(`http://localhost:3001/karyawan/${id}`);
      const data = await res.json();
      setKaryawan(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchKaryawan();
  }, [id]);

  useEffect(() => {
    if (karyawan) {
      setValues({
        name: karyawan.name,
        id_jabatan: karyawan.id_jabatan,
        age: karyawan.age,
        gender: karyawan.gender,
        tanggal_lahir: karyawan.tanggal_lahir.slice(0, 10),
        alamat: karyawan.alamat,
      });
    }
  }, [karyawan]);

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center mt-5 pt-5">
      <div className="rounded mt-5 p-3 col-9 shadow-lg" style={{ height: 400 }}>
        <h3 className="text-center"> Menambah Karyawan Baru</h3>
        <hr />
        <Card.Body className="m-3">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col className="d-flex flex-column col-3 me-1 text-end justify-content-around fw-bold">
                <Form.Label>Nama Karyawan:</Form.Label>
                <Form.Label>Jabatan:</Form.Label>
                <Form.Label>Usia:</Form.Label>
                <Form.Label>Jenis Kelamin:</Form.Label>
                <Form.Label>Tanggal Lahir:</Form.Label>
                <Form.Label>Alamat:</Form.Label>
              </Col>
              <Col className="col-8">
                <Form.Control className="mb-1" placeholder="Masukan nama di sini" name="name" onChange={handleInputChange} value={values.name} />
                <select name="id_jabatan" className="form-control mb-1 w-50 text-center" onChange={handleInputChange} value={values.id_jabatan}>
                  {jabatan?.map((el) => {
                    return (
                      <option key={el.id} value={el.id}>
                        {el.nama_jabatan}
                      </option>
                    );
                  })}
                </select>
                <Form.Control className="mb-1 w-25" placeholder="Masukan usia di sini" type="number" name="age" onChange={handleInputChange} value={values.age} />
                <Form.Check className="py-2" inline label="L" name="gender" type="radio" id="inline-radio-L" checked={values.gender === "L"} value="L" onChange={handleInputChange} />
                <Form.Check inline label="P" name="gender" type="radio" id="inline-radio-P" checked={values.gender === "P"} value="P" onChange={handleInputChange} />
                <Form.Control className="mb-1 w-25" type="date" name="tanggal_lahir" onChange={handleInputChange} value={values.tanggal_lahir} />
                <Form.Control className="mb-1" placeholder="Masukan alamat di sini" name="alamat" onChange={handleInputChange} value={values.alamat} />
              </Col>
            </Row>
            <div className="d-flex justify-content-center">
              <Button variant="success me-3" type="submit">
                Submit
              </Button>
              <Link to={"/karyawan"} className="btn btn-warning">
                Cancel
              </Link>
            </div>
          </Form>
        </Card.Body>
      </div>
    </div>
  );
}

export default AddKaryawan;
