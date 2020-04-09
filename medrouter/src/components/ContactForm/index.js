/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { FormContext, useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import api from '../../services/api';
import history from '../../services/history';

import { schema } from '../../utils/schemas/email.schema';

import DropdownMenu from '../DropdownMenu';
import Button from '../Button';
import { Container, Input, InputArea, TextArea } from './styles';
import { getEmailType } from '~/utils/helpers/email.types';

export default function ContactForm() {
  const {
    register,
    methods,
    errors,
    handleSubmit,
    control,
    getValues,
  } = useForm({
    mode: 'onBlur',
    validationSchema: schema,
  });

  const onSubmit = async e => {
    e.preventDefault();
    const data = getValues();
    try {
      await api.post('/emails', { ...data });

      toast.success('Email enviado, aguarde contato!', {
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
      <Container onSubmit={handleSubmit(onSubmit)}>
        <InputArea>
          <Input
            className={errors.username ? 'has-errors' : ''}
            ref={register}
            shk={0}
            grow={1}
            width="300px"
            name="username"
            placeholder="Seu nome"
          />

          <Input
            className={errors.email ? 'has-errors' : ''}
            ref={register}
            shk={0}
            grow={1}
            width="300px"
            name="email"
            placeholder="Seu email"
          />

          <Input
            className={errors.phonenumber ? 'has-errors' : ''}
            ref={register}
            shk={0}
            width="200px"
            placeholder="Seu telefone"
            name="phonenumber"
          />

          <Controller
            control={control}
            as={
              <DropdownMenu
                list={['Financeiro', 'Orçamentos', 'Outros', 'Reclamações']}
              />
            }
            name="type"
            onChange={([selected]) => {
              return getEmailType(selected);
            }}
            width={100}
            shk={0}
            grow={0}
            defaultValue={{ value: 'geral' }}
          />
        </InputArea>

        <TextArea>
          <textarea
            ref={register}
            name="msg"
            id="1"
            cols="30"
            rows="10"
            placeholder="Descreva aqui sua mensagem..."
            className={errors.msg ? 'has-errors' : ''}
          />
        </TextArea>

        <Button text="Enviar" primary onSubmit={onSubmit} />
      </Container>
    </FormContext>
  );
}
