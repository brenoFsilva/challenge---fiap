import FileInput from "./components/FileInput";
import "./App.css";
import { useEffect, useState } from "react";
import type Data from "./interfaces/Data";
import FilterList from "./components/FilterList";
import type { Filter } from "./interfaces/Filter";
import * as XLSX from "xlsx";

function App() {
  const [data, setData] = useState<Array<Data> | null>(null);
  const [filteredData, setFilteredData] = useState<Array<Data> | null>(null);
  const [filter, setFilter] = useState<Filter | null>(null);
  const [resetSignal, setResetSignal] = useState(false);

  const filterData = (data: Data[], filters: Filter): Data[] => {
    return data.filter((item) => {
      // Sempre inclui tarefas com condição "Sempre"
      if (item["Condição"] === "Sempre") return true;

      // Aplica os filtros aos demais
      for (const [key, values] of Object.entries(filters)) {
        if (values.length === 0) continue;
        const itemValue = item[key as keyof Data] as string;
        if (!values.includes(itemValue)) {
          return false;
        }
      }

      return true;
    });
  };

  useEffect(() => {
    if (!data) return;

    if (filter && Object.keys(filter).length) {
      setFilteredData(filterData(data, filter));
    } else {
      setFilteredData(data);
    }
  }, [data, filter]);

  useEffect(() => {
    console.log(filteredData);
  }, [filteredData]);

  const exportToExcel = () => {
    const filtered = data ? filterData(data, filter ?? {}) : [];

    if (filtered.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cronograma");

    const date = new Date().toISOString().slice(0, 10); // Ex: 2025-06-11
    const filename = `cronograma_filtrado_${date}.xlsx`;

    XLSX.writeFile(workbook, filename);
  };

  // App.tsx (com layout reorganizado e visual melhorado)
  return (
    <>
      <header
        style={{
          backgroundColor: "#F23064",
          color: "#fff",
          padding: "1.5rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
        }}
      >
        <div>
          <a href="/Home">Pagina inicial</a>
          <h1 style={{ margin: 0, fontSize: "1.8rem" }}>
            Challenge FIAP + Aché 2025
          </h1>
          <p style={{ margin: 0, fontSize: "1rem", opacity: 0.95 }}>
            Gestão Inteligente de Cronogramas na Indústria Farmacêutica
          </p>
        </div>
        <img
          src="/logo.svg"
          alt="Logo"
          style={{ height: "80px", borderRadius: "10px" }}
        />
      </header>

      <main style={{ padding: "2rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <FileInput setData={setData} />
        </div>

        {filteredData && data && (
          <>
            <section style={{ marginBottom: "2rem" }}>
              <h2>Filtros</h2>
              <div className="filters-container">
                <div className="filter-box">
                  <FilterList
                    setFilter={setFilter}
                    data={data}
                    atributeName="Classificação"
                    resetSignal={resetSignal}
                  />
                </div>
                <div className="filter-box">
                  <FilterList
                    setFilter={setFilter}
                    data={data}
                    atributeName="Categoria"
                    resetSignal={resetSignal}
                  />
                </div>
                <div className="filter-box">
                  <FilterList
                    setFilter={setFilter}
                    data={data}
                    atributeName="Fase"
                    resetSignal={resetSignal}
                  />
                </div>
                <div className="filter-box">
                  <FilterList
                    setFilter={setFilter}
                    data={data}
                    atributeName="Condição"
                    resetSignal={resetSignal}
                  />
                </div>
                <div className="filter-box">
                  <FilterList
                    setFilter={setFilter}
                    data={data}
                    atributeName="% Concluída"
                    resetSignal={resetSignal}
                  />
                </div>
              </div>
            </section>

            <button
              onClick={() => {
                setFilter(null);
                setResetSignal((prev) => !prev);
              }}
              style={{
                marginLeft: "1rem",
                padding: "0.6rem 1.2rem",
                backgroundColor: "#444",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              🧹 Limpar todos os filtros
            </button>

            <div style={{ textAlign: "right", marginBottom: "1rem" }}>
              <button
                onClick={exportToExcel}
                style={{
                  padding: "0.6rem 1.4rem",
                  backgroundColor: "#2e7d32",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                📥 Exportar cronograma (.xlsx)
              </button>
            </div>

            <section>
              <h2>Tabela</h2>
              <div style={{ overflowX: "auto" }}>
                <table>
                  <thead>
                    <tr>
                      <th>Número</th>
                      <th>Classificação</th>
                      <th>Categoria</th>
                      <th>Fase</th>
                      <th>Condição</th>
                      <th>Nome</th>
                      <th>Duração</th>
                      <th>Como Fazer</th>
                      <th>Documento Referência</th>
                      <th>% Concluída</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item) => (
                      <tr
                        key={item["Número"]}
                        className={
                          item["% Concluída"] === "100%"
                            ? "linha-concluida"
                            : item["Condição"] === "Sempre"
                            ? "linha-sempre"
                            : ""
                        }
                      >
                        <td>{item["Número"]}</td>
                        <td>{item["Classificação"]}</td>
                        <td>{item.Categoria}</td>
                        <td>{item.Fase}</td>
                        <td>{item["Condição"]}</td>
                        <td>{item.Nome}</td>
                        <td>{item["Duração"]}</td>
                        <td>{item["Como Fazer"]}</td>
                        <td>{item["Documento Referência"]}</td>
                        <td>{item["% Concluída"]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* <select name="" id="" defaultValue="sempre">
        <option value="sempre">Sempre</option>
        <option value="">Todos</option>
        <option value="">A</option>
        <option value="">B</option>
        <option value="">C</option>
      </select> */}
      </main>
    </>
  );
}

export default App;
