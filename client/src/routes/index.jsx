import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../layout/baseLayout";
import Home from "../pages/home";
import Department from "../pages/department";
import AddDepartment from "../pages/addDepartment";
import UpdateDepartment from "../pages/updateDepartment";
import Jabatan from "../pages/jabatan";
import AddJabatan from "../pages/addJabatan";
import UpdateJabatan from "../pages/updateJabatan";
import Karyawan from "../pages/karyawan";
import AddKaryawan from "../pages/addKaryawan";
import UpdateKaryawan from "../pages/updateKaryawan";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/department",
        element: <Department />,
      },
      {
        path: "/addDepartment",
        element: <AddDepartment />,
      },
      {
        path: "/updateDepartment/:departmentId",
        element: <UpdateDepartment />,
      },
      {
        path: "/jabatan",
        element: <Jabatan />,
      },
      {
        path: "/addJabatan",
        element: <AddJabatan />,
      },
      {
        path: "/updateJabatan/:jabatanId",
        element: <UpdateJabatan />,
      },
      {
        path: "/karyawan",
        element: <Karyawan />,
      },
      {
        path: "/addKaryawan",
        element: <AddKaryawan />,
      },
      {
        path: "/updateKaryawan/:karyawanId",
        element: <UpdateKaryawan />,
      },
    ],
  },
]);

export default router;
