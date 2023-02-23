function Home() {
  return (
    <div className="container-fluid vh-100 d-flex justify-content-center">
      <div className="col-6 vh-100 d-flex justify-content-center align-items-center">
        <h2>
          Selamat datang di website{" "}
          <span className="fw-bold" style={{ color: "#B99B6B", fontSize: 40 }}>
            My Company
          </span>
        </h2>
      </div>
      <div className="col-6 vh-100 d-flex justify-content-center align-items-center">
        <img className="imgHome" src="https://images.unsplash.com/photo-1576267423048-15c0040fec78?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
      </div>
    </div>
  );
}

export default Home;
