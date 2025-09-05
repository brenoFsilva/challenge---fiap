import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="home-buttons">
      <Link to="/filtro" className="export-button">Filtrar Planilha Matriz</Link>
      <Link to="/combinador" className="clear-button">Combinar Planilhas Existentes</Link>
    </div>
  );
}
