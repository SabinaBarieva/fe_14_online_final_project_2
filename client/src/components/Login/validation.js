import * as Yup from 'yup';

const validationSchema = Yup.object({
  loginOrEmail: Yup.string()
    .min(4, 'Min 4 letters required')
    .max(30, 'Max 15 letters allowed')
    // .matches(
    //   /^[a-zA-Z0-9]*$/,
    //   'Login must contain Latin letters and numbers only, without spaces'
    // )
    .required('This field is required!'),
  password: Yup.string()
    .min(4, 'Min 4 letters required')
    .max(15, 'Max 15 letters allowed')
    // .matches(/^[a-zA-Z]/, 'Password must contain Latin letters only')
    // .matches(/\d/, 'Password must contain at least one number')
    // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .matches(
    //   /[!@#$%^&*(),.?":{}|<>]/,
    //   'Password must contain at least one special character'
    // )
    // .matches(
    //   /^[a-zA-Z\d!@#$%^&*(),.?":{}|<>]*$/,
    //   'Password must not contain spaces'
    // )
    .required('This field is required!'),
});

export default validationSchema;
