import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import "./styles.css";
import api from '../../services/api';

export default function Profile({ history }) {
    const [incidents, setIncidents] = useState([]);

    const ngo_id = localStorage.getItem("ngo_id");
    const ngo_name = localStorage.getItem("ngo_name");

    useEffect(() => {
        if (!ngo_id || !ngo_name) history.push("/");

        api.get("/profile", {
            headers: {
                Authorization: ngo_id
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ngo_id]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incident/${id}`, {
                headers: {
                    Authorization: ngo_id
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert("Error while deleting incident, please try again!");
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push("/");
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="BeTheHero" />
                <span> Welcome, {ngo_name} </span>

                <Link className="button" to="/incident/new">Register new incident</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Registered Incidents</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong> INCIDENT:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIPTION:</strong>
                        <p>{incident.description}</p>

                        <strong>VALUE</strong>
                        <p>{Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(incident.value)}</p>

                        <button onClick={() => { handleDeleteIncident(incident.id) }}>
                            <FiTrash2 size={20} color="#A8A8B3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
