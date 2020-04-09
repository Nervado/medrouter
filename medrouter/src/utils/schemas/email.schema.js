import * as Yup from 'yup';

export const schema = Yup.object().shape({
  username: Yup.string().required(),

  email: Yup.string()
    .email()
    .required(),

  phonenumber: Yup.number()
    .min(7)
    .required(),

  type: Yup.string()
    .min(6)
    .required(),

  msg: Yup.string()
    .required()
    .min(10),
});
