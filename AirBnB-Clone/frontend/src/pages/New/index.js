import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './style.css';

export default function New({ history }) {
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [price, setPrice] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    },[thumbnail]);

    async function handleSubmit(event) {
        event.preventDefault();

        const user_id = localStorage.getItem('user');
        const data = new FormData();
        data.append('thumbnail',thumbnail);
        data.append('company',company);
        data.append('technologies', technologies);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }

    return(
        <form onSubmit={handleSubmit}>

            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})` }} 
                className={ thumbnail ? 'has-thumbnail' : '' }
            > 
                <input 
                    type="file" 
                    onChange={ event => setThumbnail(event.target.files[0])}
                />
                <img src={ camera } alt="Selecionar imagem" />
            </label>

            <label htmlFor="company"> EMPRESA * </label>
            <input 
                id="company" 
                placeholder="Sua empresa incrível" 
                autoComplete="off" 
                value={company} 
                onChange={ event => setCompany(event.target.value) } 
            />

            <label htmlFor="technologies"> 
                TECNOLOGIAS * 
                <span> (separadas por vírgulas) </span>
            </label>
            <input 
                id="technologies" 
                placeholder="Quais tecnologias usam?" 
                autoComplete="off" 
                value={technologies} 
                onChange={ event => setTechnologies(event.target.value) } 
            />

            <label htmlFor="price"> 
                VALOR DA DIÁRIA * 
                <span> (em branco para GRATUITO) </span>
            </label>
            <input 
                id="price" 
                placeholder="Valor cobrado por dia" 
                autoComplete="off" 
                value={price} 
                onChange={ event => setPrice(event.target.value) } 
            />

            <button type="submit" className="btn"> Cadastrar </button>
        </form>
    );
}