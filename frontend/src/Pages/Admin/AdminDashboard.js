import React from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3" style={{ border: "1px solid red" }}>
            <AdminMenu />
          </div>
          <div className="col-md-9" style={{ border: "1px solid black" }}>
            <div className="card w-75 p-3">
              <h3>Admin Name:{auth?.user?.name}</h3>
              <h3>Admin Email:{auth?.user?.email}</h3>
              <h3>Admin Contact:{auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
