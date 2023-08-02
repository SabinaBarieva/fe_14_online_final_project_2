import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Min 2 letters required')
    .max(25, 'Max 25 letters allowed')
    .matches(/^[a-zA-Zа-яА-Я]*$/, 'The name must contain only letters')
    .required('This field is required!'),
  lastName: Yup.string()
    .min(2, 'Min 2 letters required')
    .max(25, 'Max 25 letters allowed')
    .matches(/^[a-zA-Zа-яА-Я]*$/, 'The name must contain only letters')
    .required('This field is required!'),
  login: Yup.string()
    .min(4, 'Min 4 letters required')
    .max(10, 'Max 10 letters allowed')
    .matches(
      /^[a-zA-Z0-9]*$/,
      'Login must contain Latin letters and numbers only, without spaces'
    )
    .required('This field is required!'),
  email: Yup.string()
    .email('Invalid email address')
    .min(6, 'Min 6 letters required')
    .max(30, 'Max 30 letters required')
    .required('This field is required!'),
  telephone: Yup.string()
    .matches(/^\+380\d{3}\d{2}\d{2}\d{2}$/, 'Invalid phone number')
    .required('This field is required!'),
});

export default validationSchema;
