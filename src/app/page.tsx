export default function Home() {
  return (
    <div className="container-fluid">
      <h2>Dashboard</h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Data Employee</h5>
              <p className="card-text">100 Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Data Tasks</h5>
              <p className="card-text">25 Orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
