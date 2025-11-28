import { Routes, Route } from "react-router-dom";
import styles from "./Global.module.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Patrimony } from "./pages/patrimony";
import { CPD } from "./pages/cpd";
import { Home } from "./pages/Home";
import { Admin } from "./pages/admin";



function App() {
  return (
    <div className={styles.container}>
      <Routes>
        <Route index element={<Home />} />
        <Route path="admin" element={<Admin />} />
        <Route path="patrimonio" element={<Patrimony />} />
        <Route path="cpd" element={<CPD />} />
        <Route path="*" element={<>ERROR</>}  />
      </Routes>
    </div>
  );
}

export default App;
