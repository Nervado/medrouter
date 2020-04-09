import { store } from '../../store/index';

export function getValues(state, obj) {
  const data = store.getState()[state][obj];

  if (!data) {
    return null;
  }

  const values = [];
  Object.keys(data).forEach(k => {
    const o = {};
    o[k] = data[k];
    values.push(o);
  });

  return values;
}

export function getValue(state, obj, property) {
  const data = getValues(state, obj);
  if (!data) {
    return null;
  }

  const search = data.filter(el => Object.keys(el)[0] === property);

  if (!search) {
    return null;
  }

  return search[0];
}
