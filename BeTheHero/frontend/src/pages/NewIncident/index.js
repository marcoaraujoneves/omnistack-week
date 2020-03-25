import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import "./styles.css";
import api from '../../services/api';

import logoImg from "../../assets/logo.svg";

export default function NewIncident({ history }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");

    const ngo_id = localStorage.getItem("ngo_id");

    useEffect(() => {
        if (!ngo_id) history.push("/");
    }, [ngo_id]);

    async function handleCreateIncident(event) {
        event.preventDefault();

        const data = {
            title,
            description,
            value
        };

        const invalidFields = Object.entries(data).filter(field => {
            if (field[1] === "") return field;
        });

        if (invalidFields.length !== 0) return;

        try {
            await api.post("/incident", data, {
                headers: {
                    Authorization: ngo_id
                }
            });

            history.push("/profile");
        } catch (exception) {
            alert("An error has occured.");
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="BeTheHero" />

                    <h1> Register a new incident </h1>
                    <p> Describe the incident in detail to find a hero to solve it. </p>

                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Back to Home page
                    </Link>
                </section>

                <form onSubmit={handleCreateIncident}>
                    <input
                        placeholder="Incident title"
                        value={title}
                        onChange={event => setTitle(event.target.value)}

                    />
                    <textarea
                        placeholder="Incident description"
                        value={description}
                        onChange={event => setDescription(event.target.value)}

                    />
                    <input
                        placeholder="Value"
                        type="number"
                        min="0"
                        step="0.01"
                        value={value}
                        onChange={event => setValue(event.target.value)}

                    />

                    <button className="button" type="submit"> Create </button>
                </form>
            </div>
        </div>
    );
}
