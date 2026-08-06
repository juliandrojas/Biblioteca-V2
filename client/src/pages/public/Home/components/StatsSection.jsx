export default function StatsSection({ stats }) {
  return (
    <div className="row g-4">
      <div className="col-md-3">
        <div className="card shadow-sm border-0 text-center">
          <div className="card-body">
            <h1>📚</h1>
            <h2>{stats.totalBooks}</h2>
            <p className="text-muted mb-0">Libros</p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow-sm border-0 text-center">
          <div className="card-body">
            <h1>📂</h1>
            <h2>{stats.totalCategories}</h2>
            <p className="text-muted mb-0">Categorías</p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow-sm border-0 text-center">
          <div className="card-body">
            <h1>👥</h1>
            <h2>{stats.totalUsers}</h2>
            <p className="text-muted mb-0">Usuarios</p>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow-sm border-0 text-center">
          <div className="card-body">
            <h1>📖</h1>
            <h2>{stats.totalLoans}</h2>
            <p className="text-muted mb-0">Préstamos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
