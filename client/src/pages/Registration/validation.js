import * as Yup from 'yup';

const validationSchema = Yup.object({
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
  passwordFirst: Yup.string()
    .min(7, 'Min 7 letters required')
    .max(30, 'Max 30 letters allowed')
    .matches(/^[a-zA-Z]/, 'Password must contain Latin letters only')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    )
    .matches(
      /^[a-zA-Z\d!@#$%^&*(),.?":{}|<>]*$/,
      'Password must not contain spaces'
    )
    .required('This field is required!'),
  passwordSecond: Yup.string()
    .oneOf([Yup.ref('passwordFirst'), null], 'Passwords must match')
    .required('This field is required!'),
  telephone: Yup.string()
    .matches(
      /^\+380\s?\(\d{2}\)\s?\d{2}\s?\d{2}\s?\d{3}$/,
      'Invalid phone number'
    )
    .required('This field is required!'),
});

export default validationSchema;
