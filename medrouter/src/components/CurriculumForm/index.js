/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm, FormContext } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';
import history from '../../services/history';

import { Container } from './styles';
import logo from '~/assets/logo.svg';

import AvatarInput from '../AvatarInput';

import CurriculumFields from '../CurriculumFields';
import CurriculumFooter from '../CurriculumFooter';

export default function CurriculumForm() {
  const methods = useForm();

  const onSubmit = async e => {
    e.preventDefault();
    const data = methods.getValues();
    try {
      await api.post('/curriculum', { ...data });

      toast.success('Curriculum enviado, aguarde contato!', {
        position: toast.POSITION.TOP_RIGHT,
        className: 'success',
      });

      history.push('/');
    } catch (error) {
      toast.error('Verifique os campos e tente novamente!');
    }
  };

  return (
    <FormContext {...methods}>
      <Container onSubmit={methods.handleSubmit(onSubmit)}>
        <NavLink className="logo-wrapper" to="/">
          <img src={logo} alt="logo" width="81px" height="67px" />
        </NavLink>
        <AvatarInput />
        <CurriculumFields />
        <CurriculumFooter onSubmit={onSubmit} />
      </Container>
    </FormContext>
  );
}
