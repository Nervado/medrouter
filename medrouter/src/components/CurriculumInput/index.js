/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { FaTrash, FaCheck, FaBook } from 'react-icons/fa';

import api from '~/services/api';

import { Container } from './styles';

export default function CurriculumInput() {
  const [file, setImage] = useState({
    raw: '',
  });

  async function handleUpload() {
    const data = new FormData();

    data.append('file', file.raw);

    const config = { headers: { 'content-type': 'multipart/form-data' } };

    await api.post('files', data, config);
  }

  const handleChange = e => {
    setImage({
      raw: e.target.files[0],
    });

    handleUpload();
  };

  function handleClick() {
    setImage({ raw: '' });
  }

  return (
    <Container>
      <label htmlFor="curriculum">
        {file.raw ? (
          <div className="file-added">
            <div className="field">
              <FaCheck color="#6BAA34" className="icon" />
              <span>Curriculum Adicionado</span>
            </div>
          </div>
        ) : (
          <div className="no-file">
            <div className="field">
              <FaBook color="#6BAA34" className="icon" />
              <span> Curriculum vitae em pdf</span>
            </div>
          </div>
        )}

        <input type="file" id="curriculum" onChange={handleChange} />
      </label>

      <FaTrash
        className="trash-icon"
        size={20}
        style={{ color: '#666', opacity: '0.6' }}
        onClick={handleClick}
      />
    </Container>
  );
}
