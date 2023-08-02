import * as Yup from 'yup';

const validationSchema = Yup.object({
  loginOrEmail: Yup.string()
    .min(4, 'Min 4 letters required')
    .max(30, 'Max 30 letters allowed')
    .test('login-or-email', 'Invalid login or email', (value) => {
      const loginRegex = /^[a-zA-Z0-9]*$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return loginRegex.test(value) || emailRegex.test(value);
    })
    .min(4, 'Min 4 letters required')
    .max(30, 'Max 30 letters allowed')
    .required('This field is required!'),
  password: Yup.string()
    // .min(7, 'Min 7 letters required')
    // .max(30, 'Max 30 letters allowed')
    // .matches(/^[a-zA-Z]/, 'Password must contain Latin letters only')
    // .matches(/\d/, 'Password must contain at least one number')
    // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .matches(/^[a-zA-Z0-9]+$/, 'Password must not contain spaces')
    .required('This field is required!'),
});

export default validationSchema;
