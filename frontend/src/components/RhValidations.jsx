import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";

function RhValidations() {
  const [demandes, setDemandes] = useState([]);
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const collaborateurId = localStorage.getItem("collaborateur_id");

    fetch("http://127.0.0.1:8000/api/rh/demandes/", {
      headers: {
        "Collaborateur-Id": collaborateurId,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // 🔥 Ne garder QUE les formations payantes + certifiantes
        const filtered = (data.demandes || []).filter(
          d => d.prix > 0 && d.certifiante === true
        );

        setDemandes(filtered);
      });
  }, []);


  // ============================
  // 🔴 Traiter une demande RH
  // ============================
  const traiterDemande = (id, action) => {
    const collaborateurId = localStorage.getItem("collaborateur_id");

    fetch("http://127.0.0.1:8000/api/rh/demandes/valider/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Collaborateur-Id": collaborateurId,
      },
      body: JSON.stringify({
        demande_id: id,
        action: action,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // 👉 Afficher la notification
        if (data.error) {
          setNotification(data.error);
        } else {
          setNotification(
            action === "valider"
              ? "Formation validée par le RH 🎉"
              : "Demande refusée ❌"
          );

          // 👉 Retirer la ligne du tableau
          setDemandes((prev) => prev.filter((d) => d.id !== id));
        }
      });
  };

  return (
    <div className="manager-demandes-container">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Retour
      </button>

      <h1>📋 Validations RH</h1>

      {demandes.length === 0 ? (
        <p>Aucune demande en attente</p>
      ) : (
        <table className="demandes-table">
          <thead>
            <tr>
              <th>Collaborateur</th>
              <th>Formation</th>
              <th>Prix</th>
              <th>Certifiante</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {demandes.map((d) => (
              <tr key={d.id}>
                <td>{d.collaborateur}</td>

                <td>
                  <strong>{d.formation}</strong>
                </td>

                {/* Prix */}
                <td className={d.prix === 0 ? 'prix-gratuit' : ''}>
                  {d.prix === 0 ? "Gratuite" : `${d.prix} €`}
                </td>

                {/* Certifiante */}
                <td className={d.certifiante ? "certif-oui" : "certif-non"}>
                  {d.certifiante ? "Oui" : "Non"}
                </td>

                {/* Statut du manager */}
                <td>
                  {d.statut === "Validée par le Manager" ? (
                    <span className="badge-manager-ok">✔ Manager validé</span>
                  ) : (
                    <span className="badge-manager-wait">En attente</span>
                  )}
                </td>

                {/* Actions RH */}
                <td>
                  <div className="actions-cell">
                    <button
                      className="btn-validate"
                      disabled={
                        (d.certifiante || d.price > 0) &&
                        d.statut !== "Validée par le Manager"
                      }
                      onClick={() => traiterDemande(d.id, "valider")}
                    >
                      Valider
                    </button>

                    <button
                      className="btn-refuse"
                      onClick={() => traiterDemande(d.id, "refuser")}
                    >
                      Refuser
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Notification */}
      <Notification
        message={notification}
        onClose={() => setNotification("")}
      />
    </div>
  );
}

export default RhValidations;

