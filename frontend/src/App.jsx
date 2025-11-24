import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CollaboratorsList from "./components/CollaboratorsList";
import FormationsCatalogue from "./components/FormationsCatalogue";
import Login from "./components/Login";
import Home from "./components/Home";
import '../src/App.css'
import MesDemandes from "./components/MesDemandes";
import ManagerDemandes from "./components/ManagerDemandes";
import RhValidations from "./components/RhValidations";



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("collaborateur_id");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <>
          <button className="logout-btn" onClick={handleLogout}>Se déconnecter</button>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collaborateurs" element={<CollaboratorsList />} />
            <Route path="/formations" element={<FormationsCatalogue />} />
            <Route path="/mes-demandes" element={<MesDemandes />} />
            <Route path="/manager-demandes" element={<ManagerDemandes />} />
            <Route path="/rh-validations" element={<RhValidations />} />

            {/* Toute autre route → accueil */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </Router>
  );
}

export default App;
