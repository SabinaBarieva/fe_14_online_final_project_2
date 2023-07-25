import * as Yup from 'yup';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'Min 2 letters required')
    .max(15, 'Max 15 letters allowed')
    .matches(/^[a-zA-Zа-яА-Я]*$/, 'The name must contain only letters')
    .required('This field is required!'),
  lastName: Yup.string()
    .min(2, 'Min 2 letters required')
    .max(15, 'Max 15 letters allowed')
    .matches(/^[a-zA-Zа-яА-Я]*$/, 'The name must contain only letters')
    .required('This field is required!'),
  login: Yup.string()
    .min(4, 'Min 4 letters required')
    .max(15, 'Max 15 letters allowed')
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
    .min(4, 'Min 4 letters required')
    .max(15, 'Max 15 letters allowed')
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
    .test(
      'password-format',
      'Password must contain valid characters',
      (value) => /^[a-zA-Z\d!@#$%^&*(),.?":{}|<>]+$/.test(value)
    )
    .test('min-length', 'Min 4 letters required', (value) => value.length >= 4)
    .test('max-length', 'Max 15 letters allowed', (value) => value.length <= 15)
    .test(
      'latin-letters',
      'Password must contain Latin letters only',
      (value) => /[a-zA-Z]/.test(value)
    )
    .test('number', 'Password must contain at least one number', (value) =>
      /\d/.test(value)
    )
    .test(
      'lowercase',
      'Password must contain at least one lowercase letter',
      (value) => /[a-z]/.test(value)
    )
    .test(
      'uppercase',
      'Password must contain at least one uppercase letter',
      (value) => /[A-Z]/.test(value)
    )
    .test(
      'special-character',
      'Password must contain at least one special character',
      (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value)
    )
    .test('spaces', 'Password must not contain spaces', (value) =>
      /^[a-zA-Z\d!@#$%^&*(),.?":{}|<>]*$/.test(value)
    )
    .test('password-match', 'Passwords must match', (value) => {
      const passwordFirst = this.resolve(Yup.ref('passwordFirst'));
      return value === passwordFirst;
    })
    .required('This field is required!'),
  telephone: Yup.string()
    .matches(
      /^\+380\s?\(\d{2}\)\s?\d{2}\s?\d{2}\s?\d{3}$/,
      'Invalid phone number'
    )
    .required('This field is required!'),
});

export default validationSchema;
