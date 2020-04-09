import * as Yup from 'yup';

export const schema = Yup.object().shape({
  // profile
  username: Yup.string().required(),
  surname: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  phoneNumber: Yup.number()
    .min(9)
    .required(),

  // budget
  description: Yup.string()
    .min(6)
    .required(),
  category: Yup.array(),
  date: Yup.date(),

  // Address
  cep: Yup.string().required(),
  streetName: Yup.string().required(),
  houseNumber: Yup.number().required(),
  complement: Yup.string(),
  neighborhood: Yup.string().required(),
  city: Yup.string().required(),
  fu: Yup.string().required(),

  // Aditional budget fields
  numberOfFloors: Yup.number()
    .min(0)
    .max(1000),
  numberOfRooms: Yup.number()
    .min(0)
    .max(1000),
  hight: Yup.number()
    .min(0)
    .max(1000),
  width: Yup.number()
    .min(0)
    .max(1000),
  deepness: Yup.number()
    .min(0)
    .max(1000),
  numberOflights: Yup.number()
    .min(0)
    .max(1000),
  numberOfWalls: Yup.number()
    .min(0)
    .max(1000),
  numberOfDoors: Yup.number()
    .min(0)
    .max(1000),
  numberOfWindows: Yup.number()
    .min(0)
    .max(1000),
});
