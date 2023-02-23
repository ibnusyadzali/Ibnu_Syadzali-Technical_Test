import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function Karyawan() {
  const [karyawan, setKaryawan] = useState();
  const fetchKaryawan = async () => {
    try {
      const res = await fetch("http://localhost:3001/karyawan");
      const data = await res.json();
      setKaryawan(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/karyawan/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchKaryawan();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchKaryawan();
  }, []);

  if (karyawan) {
    return (
      <div className="container-fluid vh-100 d-flex justify-content-center">
        <div className="col-11">
          <h2 className="text-center fw-bold mt-5 pt-5 mb-3">Daftar Karyawan</h2>
          <div className="d-flex flex-row-reverse">
            <Link to={"/addKaryawan"} className="btn btn-primary mb-3">
              Tambah Karyawan
            </Link>
          </div>
          <div className="bg-light rounded p-3 text-center shadow-lg" style={{ height: 500 }}>
            <Table striped size="md">
              <thead style={{ fontSize: 16 }}>
                <tr>
                  <th>id</th>
                  <th>Nama Karyawan</th>
                  <th>Usia</th>
                  <th>Jenis Kelamin</th>
                  <th>Tanggal Lahir</th>
                  <th>Jabatan</th>
                  <th>Department</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-center Scroll">
                {karyawan?.map((el) => {
                  return (
                    <tr key={el.id} style={{ fontSize: 14 }}>
                      <td className="pt-3" style={{ fontSize: 14 }}>
                        {el.id}
                      </td>
                      <td className="pt-3">{el.name}</td>
                      <td className="pt-3">{el.age}</td>
                      {el.gender === "L" ? <td className="pt-3">Laki-Laki</td> : <td className="pt-3">Perempuan</td>}
                      <td className="pt-3">{new Date(el.tanggal_lahir).toLocaleDateString("id", { year: "numeric", month: "long", day: "numeric" })}</td>
                      <td className="pt-3">{el.Jabatan.nama_jabatan}</td>
                      <td className="pt-3">{el.Jabatan.Department.nama_department}</td>
                      <td className="">
                        <Link to={`/updateKaryawan/${el.id}`} className="btn btn-warning btn-sm me-2">
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

export default Karyawan;
