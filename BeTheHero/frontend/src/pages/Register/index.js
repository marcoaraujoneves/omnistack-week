import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import "./styles.css";
import api from "../../services/api";

import logoImg from '../../assets/logo.svg';

export default function Register({ history }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsApp] = useState("");
    const [city, setCity] = useState("");
    const [fu, setFU] = useState("");

    async function handleRegister(event) {
        event.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            fu
        };

        const invalidFields = Object.entries(data).filter(field => {
            if (field[1] === "") return field;
        });

        if (invalidFields.length !== 0) return;

        try {
            const response = await api.post("/ngo", data);
            alert(`Your new ID is ${response.data.id}`);
            history.push("/");
        } catch (exception) {
            alert("An error has occured.");
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="BeTheHero" />

                    <h1> Registration </h1>
                    <p>
                        Do your registration, log in to the platform and help people to find your NGO incidents.
                    </p>

                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Back to logon
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input
                        placeholder="NGO name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <input
                        placeholder="E-mail"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <input
                        placeholder="WhatsApp number"
                        value={whatsapp}
                        onChange={(event) => setWhatsApp(event.target.value)}
                    />

                    <div className="input-group">
                        <input
                            placeholder="City"
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                        />
                        <input
                            placeholder="FU"
                            style={{ width: 80 }}
                            value={fu}
                            onChange={(event) => setFU(event.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}
