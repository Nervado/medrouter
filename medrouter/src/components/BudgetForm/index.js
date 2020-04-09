/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import { useForm, FormContext } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import { store } from '../../store/index';
// import * as Yup from 'yup';

import { schema } from '../../utils/schemas/budget.schema';

// import { differenceInCalendarDays } from 'date-fns';
// import { parseISO } from 'date-fns/esm';

import {
  budgetRequest,
  budgetUpdate,
} from '../../store/modules/budgets/actions';

import { Container } from './styles';
import logo from '~/assets/logo.svg';

import BudgetFields from '../BudgetFields';
import BudgetDetails from '../BudgetDetails';
import BudgetFooter from '../BudgetFooter';

export default function BudgetForm() {
  const [change, SetChange] = useState(false);
  const methods = useForm({
    // mode: 'onBlur',
    validationSchema: schema,
    defaultValues: store.getState().budgets.budget,
  });

  const dispatch = useDispatch();

  const update = () => {
    SetChange(!change);
    dispatch(budgetUpdate(methods.getValues()));
  };

  useEffect(() => {}, [change]);

  const onSubmit = async () => {
    dispatch(budgetUpdate(methods.getValues()));
    dispatch(budgetRequest(store.getState().budgets.budget));
  };

  return (
    <FormContext {...methods}>
      <Container onSubmit={methods.handleSubmit(onSubmit)}>
        <NavLink to="/">
          <img src={logo} alt="logo" width="163px" height="134px" />
        </NavLink>
        <Switch>
          <Route path="/budgets/details">
            <BudgetDetails />
          </Route>
          <Route path="/budgets">
            <BudgetFields />
          </Route>
        </Switch>
        <BudgetFooter update={update} onSubmit={onSubmit} />
      </Container>
    </FormContext>
  );
}
