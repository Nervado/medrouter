import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { newBudgetRequestSuccess, newBudgetRequestFailure } from './actions';

export function* budgetPostRequest({ payload }) {
  const { budget } = payload;

  const {
    username,
    surname,
    email,
    phoneNumber,
    description,
    cep,
    streetName,
    houseNumber,
    complement,
    neighborhood,
    city,
    fu,
    date,
    category,
    numberOfFloors,
    numberOfRooms,
    height,
    width,
    deepness,
    numberOflights,
    numberOfWalls,
    numberOfDoors,
    numberOfWindows,
  } = budget;

  try {
    yield call(api.post, '/budgets/promo', {
      user: {
        username,
        surname,
        email,
        phoneNumber,
      },
      address: {
        cep,
        streetName,
        houseNumber,
        complement,
        neighborhood,
        city,
        fu,
      },
      description,
      desirableTime: date && date[0],
      category: category && category[0],
      numberOfFloors: parseInt(numberOfFloors, 10),
      numberOfRooms: parseInt(numberOfRooms, 10),
      height: parseInt(height, 10),
      width: parseInt(width, 10),
      deepness: parseInt(deepness, 10),
      numberOflights: parseInt(numberOflights, 10),
      numberOfWalls: parseInt(numberOfWalls, 10),
      numberOfDoors: parseInt(numberOfDoors, 10),
      numberOfWindows: parseInt(numberOfWindows, 10),
    });

    yield put(newBudgetRequestSuccess());

    toast.success('Pedido de orçamento Enviado!');

    history.push('/');
  } catch (err) {
    if (err.response.data.status === 302) {
      toast.warn(err.response.data.error);
      history.push('/signin');
    } else {
      toast.error('Falha no envio, verifique os campos!');
    }

    yield put(newBudgetRequestFailure(payload));
  }
}

export default all([
  takeLatest('@budgets/NEW_BUDGET_REQUEST', budgetPostRequest),
]);
