/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { MdError } from 'react-icons/md';

import { useFormContext } from 'react-hook-form';

import { getValues } from '../../utils/helpers/getValues';

// import { store } from '../../store/index';

import cep from '~/services/cep';

import { Container, Input, InputArea } from './styles';

export default function BudgetFields() {
  const [newcep, setCep] = useState('     -   ');
  const { reset, errors, register, setValue } = useFormContext();

  useEffect(() => {
    setValue(getValues('budgets', 'budget'));
  }, [setValue]);

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
    <Container>
      <div>
        <h1>Localização da obra ou instalação:</h1>
      </div>
      <InputArea>
        <Input
          ref={register}
          shk={4}
          width="50px"
          name="cep"
          placeholder="CEP"
          onBlur={e => setCep(e.target.value)}
          defaultValue=""
        />
        {errors.cep && (
          <p className="yup-warn">
            <MdError />
          </p>
        )}
        <Input
          ref={register}
          shk={1}
          grow={1}
          width="250px"
          name="streetName"
          placeholder="Nome da rua"
        />
        {errors.streetName && (
          <p className="yup-warn">
            <MdError />
          </p>
        )}
        <Input
          ref={register}
          shk={5}
          grow={0}
          width="50px"
          name="houseNumber"
          placeholder="numero"
        />
        {errors.houseNumber && (
          <p className="yup-warn">
            <MdError />
          </p>
        )}
        <Input
          ref={register}
          shk={5}
          grow={0}
          width="50px"
          name="complement"
          placeholder="complemento"
        />
        {errors.complement && (
          <p className="yup-warn">
            <MdError />
          </p>
        )}
        <Input
          ref={register}
          shk={0}
          grow={0}
          width="50px"
          name="neighborhood"
          placeholder="Bairro"
        />
        {errors.neighborhood && (
          <p className="yup-warn">
            <MdError />
          </p>
        )}
        <Input
          ref={register}
          shk={0}
          grow={1}
          width="50px"
          name="city"
          placeholder="Cidade"
        />
        {errors.city && (
          <p className="yup-warn">
            <MdError />
          </p>
        )}
        <Input
          ref={register}
          shk={0}
          grow={0}
          width="50px"
          name="fu"
          placeholder="UF"
        />
        {errors.fu && (
          <p className="yup-warn">
            <MdError />
          </p>
        )}
      </InputArea>

      <div className="line" />

      <div>
        <h1>Informações adicionais:</h1>
      </div>
      <InputArea>
        <Input
          ref={register}
          shk={0}
          grow={0}
          width="50px"
          name="numberOfFloors"
          placeholder="Numero de pavimentos"
        />

        <Input
          ref={register}
          shk={0}
          grow={0}
          width="50px"
          name="numberOfRooms"
          placeholder="Número de comodos"
        />

        <Input
          ref={register}
          shk={0}
          grow={0}
          width="50px"
          name="height"
          placeholder="Altura"
        />

        <Input
          ref={register}
          shk={0}
          grow={0}
          width="50px"
          name="width"
          placeholder="Largura"
        />

        <Input
          ref={register}
          shk={0}
          grow={0}
          width="50px"
          name="deepness"
          placeholder="Profundidade"
        />

        <Input
          ref={register}
          shk={0}
          grow={0}
          width="50px"
          name="numberOflights"
          placeholder="Número de pontos de luz"
        />

        <Input
          ref={register}
          shk={0}
          grow={0}
          width="50px"
          name="numberOfWalls"
          placeholder="Número de paredes"
        />

        <Input
          ref={register}
          shk={0}
          grow={0}
          width="50px"
          name="numberOfDoors"
          placeholder="Número de portas"
        />

        <Input
          ref={register}
          shk={0}
          grow={0}
          width="50px"
          name="numberOfWindows"
          placeholder="Número de janelas"
        />
      </InputArea>
    </Container>
  );
}
