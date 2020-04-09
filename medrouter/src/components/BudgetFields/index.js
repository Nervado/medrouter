/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { MdError } from 'react-icons/md';
import { useFormContext, Controller } from 'react-hook-form';

import { getValues, getValue } from '../../utils/helpers/getValues';
import { prettyDate } from '../../utils/helpers/friendlyBrDate';
import SimpleDatePicker from '~/components/SimpleDatePicker';
import DropdownMenu from '../DropdownMenu';

import { Container, Input, TextArea, InputArea } from './styles';

export default function BudgetFields() {
  const { register, methods, errors, setValue } = useFormContext();

  const [dateFormated, setDateFormated] = useState();

  useEffect(() => {
    const data = getValues('budgets', 'budget');

    setValue(data);
    setDateFormated(prettyDate(getValue('budgets', 'budget', 'date').date[0]));
  }, [setValue, dateFormated]);

  return (
    <Container {...methods}>
      <InputArea>
        <Input
          ref={register}
          shk={0}
          width="150px"
          name="username"
          placeholder="Seu nome"
        />
        {errors.username && (
          <p className="yup-warn">
            <MdError />
          </p>
        )}
        <Input
          ref={register}
          shk={0}
          grow={1}
          width="300px"
          name="surname"
          placeholder="Seu sobrenome"
        />
        {errors.surname && (
          <p className="yup-warn">
            <MdError />
          </p>
        )}
        <Input
          ref={register}
          shk={0}
          grow={1}
          width="300px"
          name="email"
          placeholder="Seu email"
        />
        {errors.email && (
          <p className="yup-warn">
            <MdError />
          </p>
        )}
        <Input
          ref={register}
          shk={0}
          width="200px"
          placeholder="Seu telefone"
          name="phoneNumber"
        />
        {errors.phoneNumber && (
          <p className="yup-warn">
            <MdError />
          </p>
        )}
      </InputArea>
      <TextArea>
        <textarea
          ref={register}
          name="description"
          id="1"
          cols="30"
          rows="10"
          placeholder=" Descreva aqui seu desejo..."
        />
      </TextArea>
      {errors.description && (
        <p className="yup-warn">
          <MdError />
        </p>
      )}
      <InputArea>
        <Controller
          as={
            <DropdownMenu
              defaultValue={
                getValue('budgets', 'budget', 'category').category[0] || ''
              }
            />
          }
          name="category"
          onChange={selected => {
            return selected;
          }}
          className="dropdown"
          width={150}
          shk={1}
          grow={0}
          list={[
            'Iluminação',
            'Móveis Planejados',
            'Reforma',
            'Projeto',
            'Rebaixamento de Gesso',
          ]}
        />
        {errors.category && (
          <p className="yup-warn">
            <MdError />
          </p>
        )}
        <Controller
          name="date"
          as={<SimpleDatePicker defaultValues={dateFormated} />}
          onChange={date => {
            return date;
          }}
          width={150}
          shk={1}
          grow={0}
          placeholderText="Para quando você quer?"
        />
        {errors.date && (
          <p className="yup-warn">
            <MdError />
          </p>
        )}
      </InputArea>
    </Container>
  );
}
