/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm, FormContext } from 'react-hook-form';

import { FaCoins } from 'react-icons/fa';

import BudgetFields from '../BudgetFields';
import BudgetDetails from '../BudgetDetails';
import BudgetFooter from '../BudgetFooter';

import { Container } from './styles';

export default function NewBudget() {
  const methods = useForm();

  const onSubmit = data => {
    //  console.log(data);
    return data;
  };

  const [fieldsProgress, setFieldsProgress] = useState(false);

  return (
    <FormContext {...methods}>
      <Container onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="header">
          <h1>
            <FaCoins color="#df7e38" />
            <span>Novo orçamento</span>
          </h1>
        </div>
        <BudgetFields hidden={fieldsProgress} />
        <BudgetDetails hidden={!fieldsProgress} />
        <BudgetFooter
          logged
          setFieldsProgress={setFieldsProgress}
          fieldsProgress={fieldsProgress}
        />
      </Container>
    </FormContext>
  );
}
