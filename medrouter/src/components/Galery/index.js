/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FaTrash, FaCameraRetro } from 'react-icons/fa';

import api from '~/services/api';

import { Container, Content } from './styles';

export default function Galery({ budget, onDelete, handleBack }) {
  const [photos, setPhotos] = useState([...budget.photos]);

  const [image, setImage] = useState({
    preview: '',
    raw: '',
  });

  async function handleUpload() {
    const data = new FormData();

    data.append('image', image.raw);

    const config = { headers: { 'content-type': 'multipart/form-data' } };

    // to do save url and id
    await api.post('photos', data, config);
  }

  const handleChange = e => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
    });

    // equivale a ter o preview
    setPhotos([
      { id: 10, url: URL.createObjectURL(e.target.files[0]) },
      ...photos,
    ]);

    handleUpload();
  };

  return (
    <Container>
      <div className="photo-header">
        <h1 className="photo-title">Fotos do Orçamento #{budget.id}</h1>
      </div>

      <Content>
        {photos.length === 0 ? (
          <div className="no-photos">
            <div className="photo-wrapper">
              <div className="photo-area">
                <span>
                  <FaCameraRetro
                    size={40}
                    style={{ color: '#df7e38', opacity: '0.6' }}
                  />
                </span>
              </div>
              <div className="photo-footer">
                <button type="submit" onClick={() => {}}>
                  <FaTrash size={20} color="#707070" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          photos.map(p => (
            <div key={p.id} className="photo-wrapper">
              <div className="photo-area">
                <img src={p.url} alt="budget" />
              </div>
              <div className="photo-footer">
                <button type="submit" onClick={() => onDelete(p.id)}>
                  <FaTrash size={20} color="#707070" />
                </button>
              </div>
            </div>
          ))
        )}
      </Content>

      <div className="galery-footer">
        <button
          type="button"
          className="secondary"
          onClick={() => handleBack(budget)}
        >
          Voltar
        </button>

        <label htmlFor="foto">
          <div className="primary">
            Adicionar
            <input
              accept="image/*"
              type="file"
              id="foto"
              onChange={handleChange}
            />
          </div>
        </label>
      </div>
    </Container>
  );
}
