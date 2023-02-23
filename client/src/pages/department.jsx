import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function Department() {
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

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/department/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchDepartment();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDepartment();
  }, []);

  if (department) {
    return (
      <div className="containe-fluid vh-100 d-flex justify-content-center">
        <div className="col-8">
          <h2 className="text-center fw-bold mt-5 pt-5 mb-3">Daftar Department</h2>
          <div className="d-flex flex-row-reverse">
            <Link to={"/addDepartment"} className="btn btn-primary mb-3">
              Tambah Department
            </Link>
          </div>
          <div className="bg-light rounded p-3 text-center shadow-lg" style={{ height: 500 }}>
            <Table striped size="md">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Nama Department</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-center Scroll">
                {department?.map((el) => {
                  return (
                    <tr key={el.id}>
                      <td className="pt-3">{el.id}</td>
                      <td className="pt-3">{el.nama_department}</td>
                      <td>
                        <Link to={`/updateDepartment/${el.id}`} className="btn btn-warning btn-sm me-2">
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

export default Department;
