/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { FaCameraRetro, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput() {
  const [image, setImage] = useState({
    preview: '',
    raw: '',
  });

  const [file, setFile] = useState(null);

  async function handleUpload(e) {
    const data = new FormData();
    data.append('avatar', e.target.files[0]);
    try {
      const response = await api.post('avatars', data);
      toast.info('Avatar atualizado', { className: 'success' });
      setFile(response.data);
    } catch (error) {
      setImage({ preview: '', raw: '' });
      toast.error(
        'A sua foto deve ter no máximo 2 MB e ser do tipo .jpg, .jpeg, .png, ou .gif!',
      );
    }
  }

  const handleChange = e => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
    });

    handleUpload(e);
  };

  async function handleClick() {
    setImage({ preview: '', raw: '' });
    if (!file) return;
    try {
      await api.delete(`avatars/${file.avatarId}`);
      setFile(null);

      toast.warn('Foto deletada');
    } catch (error) {
      toast.error('Falha ao deletar foto');
    }
  }

  return (
    <Container>
      <label htmlFor="avatar">
        {image.preview ? (
          <img src={image.preview} alt="banner" />
        ) : (
          <div className="no-photo">
            {' '}
            <FaCameraRetro
              size={40}
              style={{ color: '#df7e38', opacity: '0.6' }}
            />{' '}
          </div>
        )}

        <input
          accept="image/*"
          type="file"
          id="avatar"
          onChange={handleChange}
          value=""
        />
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
