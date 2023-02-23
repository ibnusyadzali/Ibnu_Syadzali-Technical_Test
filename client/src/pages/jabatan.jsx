import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function Jabatan() {
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

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/jabatan/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchJabatan();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJabatan();
  }, []);

  if (jabatan) {
    return (
      <div className="containe-fluid vh-100 d-flex justify-content-center">
        <div className="col-8">
          <h2 className="text-center fw-bold mt-5 pt-5 mb-3">Daftar Jabatan</h2>
          <div className="d-flex flex-row-reverse">
            <Link to={"/addJabatan"} className="btn btn-primary mb-3">
              Tambah Jabatan
            </Link>
          </div>
          <div className="bg-light rounded p-3 text-center shadow-lg" style={{ height: 500 }}>
            <Table striped size="md">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Nama Jabatan</th>
                  <th>Nama Department</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-center Scroll">
                {jabatan?.map((el) => {
                  return (
                    <tr key={el.id}>
                      <td className="pt-3">{el.id}</td>
                      <td className="pt-3">{el.nama_jabatan}</td>
                      <td className="pt-3">{el.Department.nama_department}</td>
                      <td>
                        <Link to={`/updateJabatan/${el.id}`} className="btn btn-warning btn-sm me-2">
                          Update
                        </Link>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(el.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default Jabatan;
