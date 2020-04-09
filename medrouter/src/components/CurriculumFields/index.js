/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useFormContext, Controller } from 'react-hook-form';
import cep from '~/services/cep';

import { Container, Input, InputArea } from './styles';
import DropdownMenu from '../DropdownMenu';
import CurriculumInput from '../CurriculumInput';

export default function CurriculumFields() {
  const { register, methods, reset } = useFormContext();

  const [newcep, setCep] = useState('     -   ');

  useEffect(() => {
    async function handleChangeCep() {
      const validate = /^[0-9]{8}$/;

      if (!validate.test(newcep)) return;

      try {
        const { data } = await cep.get(`/${newcep}/json`);
        if (data.erro) {
          reset({ cep: 'Cep inválido' });
        } else {
          reset({
            cep: data.cep,
            city: data.localidade,
            streetName: data.logradouro,
            fu: data.uf,
            neighborhood: data.bairro,
          });
        }
      } catch (error) {
        reset({ cep: 'Cep inválido' });
      }
    }

    handleChangeCep();
  }, [newcep, reset]);

  return (
    <Container {...methods}>
      <InputArea>
        <Input
          ref={register}
          shk={0}
          width="150px"
          name="name"
          placeholder="Seu nome"
        />
        <Input
          ref={register}
          shk={0}
          grow={1}
          width="300px"
          name="surname"
          placeholder="Seu sobrenome"
        />
        <Input
          ref={register}
          shk={0}
          grow={1}
          width="300px"
          name="email"
          placeholder="Seu email"
        />
        <Input
          ref={register}
          shk={0}
          width="200px"
          placeholder="Seu cpf"
          name="phoneNumber"
        />
        <Input
          ref={register}
          shk={4}
          width="50px"
          name="cep"
          placeholder="CEP"
          onBlur={e => setCep(e.target.value)}
        />

        <Input
          ref={register}
          shk={1}
          grow={1}
          width="250px"
          name="streetName"
          placeholder="Nome da rua"
        />
        <Input
          ref={register}
          shk={5}
          grow={0}
          width="50px"
          name="houseNumber"
          placeholder="numero"
        />
        <Input
          ref={register}
          shk={5}
          grow={0}
          width="50px"
          name="complement"
          placeholder="complemento"
        />
        <Input
          ref={register}
          shk={0}
          grow={1}
          width="50px"
          name="neighborhood"
          placeholder="Bairro"
        />
        <Input
          ref={register}
          shk={0}
          grow={1}
          width="50px"
          name="city"
          placeholder="Cidade"
        />
        <Input
          ref={register}
          shk={0}
          grow={1}
          width="50px"
          name="fu"
          placeholder="UF"
        />
      </InputArea>
      <InputArea>
        <Controller
          as={<DropdownMenu />}
          name="category"
          onChange={selected => {
            return selected;
          }}
          defaultValue=""
          className="dropdown"
          shk={1}
          grow={1}
          placeholder="Sua especialidade"
          list={[
            'Eletricista',
            'Marceneiro',
            'Pedreiro',
            'Pintor',
            'Encanador',
          ]}
        />
        <CurriculumInput />
      </InputArea>
    </Container>
  );
}

CurriculumFields.propTypes = {
  setDate: PropTypes.func,
  date: PropTypes.any,
};

CurriculumFields.defaultProps = {
  setDate: null,
  date: {},
};
