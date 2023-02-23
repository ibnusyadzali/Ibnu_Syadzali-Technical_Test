import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

function BaseLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default BaseLayout;
