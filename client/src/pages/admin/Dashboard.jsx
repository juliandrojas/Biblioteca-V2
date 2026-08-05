import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/dashboardService.js";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBooks: 0,
    totalCategories: 0,
    totalLoans: 0,
    totalCopies: 0,
    availableCopies: 0,
    borrowedCopies: 0,
    booksInStock: 0,
    booksOutOfStock: 0,
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        setStats(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <div className="container">
        {/* <h1 className="text-center">Hola Mundo</h1>
        <hr /> */}
        <h2 className="text-center">Estadísticas</h2>
        <div className="row text-center">
          <div className="col-md-3 mb-4">
            <div className="card shadow-sm border-0 text-center h-100">
              <div className="card-body">
                <i className="bi bi-people display-4 text-primary"></i>

                <h5 className="mt-3">Usuarios</h5>

                <h2 className="fw-bold">{stats.totalUsers}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow-sm border-0 text-center h-100">
              <div className="card-body">
                <i className="bi bi-book-half display-4 text-primary"></i>

                <h5 className="mt-3">Libros</h5>

                <h2 className="fw-bold">{stats.totalBooks}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow-sm border-0 text-center h-100">
              <div className="card-body">
                <i className="bi bi-tags display-4 text-primary"></i>

                <h5 className="mt-3">Categorías</h5>

                <h2 className="fw-bold">{stats.totalCategories}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-4">
            <div className="card shadow-sm border-0 text-center h-100">
              <div className="card-body">
                <i className="bi bi-clock display-4 text-primary"></i>

                <h5 className="mt-3">Préstamos</h5>

                <h2 className="fw-bold">{stats.totalLoans}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
