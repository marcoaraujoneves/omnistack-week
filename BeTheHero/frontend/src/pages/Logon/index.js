import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import "./styles.css";

import logoImg from '../../assets/logo.svg';
import heroesImg from "../../assets/heroes.png";

export default function Logon({ history }) {
    const [id, setID] = useState("");

    const ngo_id = localStorage.getItem("ngo_id");
    const ngo_name = localStorage.getItem("ngo_name");

    useEffect(() => {
        if (ngo_id && ngo_name) history.push("/profile");
    }, [ngo_id]);

    async function handleLogon(event) {
        event.preventDefault();

        if (id === "") return;

        try {
            const response = await api.post("/sessions", { id });

            localStorage.setItem("ngo_id", id);
            localStorage.setItem("ngo_name", response.data.name);

            history.push("/profile");
        } catch (error) {
            alert("Failed to login, please try again!");
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="BeTheHero" />

                <form onSubmit={handleLogon}>
                    <h1>Login to BeTheHero</h1>

                    <input
                        placeholder="Your ID"
                        value={id}
                        onChange={(event) => setID(event.target.value)}
                    />
                    <button className="button" type="submit">Log in</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041" />
                        I don't have a registration
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}
