import * as Yup from 'yup';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'Min 2 letters required')
    .max(15, 'Max 15 letters allowed')
    .required('This field is required!'),
  lastName: Yup.string()
    .min(2, 'Min 2 letters required')
    .max(15, 'Max 15 letters allowed')
    .required('This field is required!'),
  email: Yup.string()
    .email('Invalid email address')
    .min(6, 'Min 6 letters required')
    .max(30, 'Max 30 letters required')
    .required('This field is required!'),
  address: Yup.string()
    .min(2, 'Min 2 letters required')
    .max(100, 'Max 100 letters allowed')
    .required('This field is required!'),
  phone: Yup.string()
    .matches(/^\+?[0-9]+\s?\(\d{3}\)\s?\d{4}\s?\d{4}$/, 'Invalid phone number')
    .required('This field is required!'),
  cardNumber: Yup.string()
    .typeError('Card number must be a number')
    .required('This field is required!')
    .test('luhn', 'Invalid card number', (val) => {
      if (val) {
        const cardNumberWithoutSpaces = val.replace(/\s/g, '');
        let sum = 0;
        let shouldDouble = false;
        for (let i = cardNumberWithoutSpaces.length - 1; i >= 0; i -= 1) {
          let digit = parseInt(cardNumberWithoutSpaces.charAt(i), 10);
          if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
              digit -= 9;
            }
          }
          sum += digit;
          shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0 && cardNumberWithoutSpaces.length === 16;
      }
      return true;
    }),
  expirationMonth: Yup.number()
    .min(1, 'Invalid expiration date')
    .max(12, 'Invalid expiration date')
    .required('This field is required!'),
  expirationYear: Yup.number()
    .min(23, 'Invalid expiration date')
    .max(28, 'Invalid expiration date')
    .required('This field is required!'),
  cvv: Yup.number()
    .integer('CVV must be an integer')
    .min(100, 'Invalid CVV')
    .max(999, 'Invalid CVV')
    .required('This field is required!'),
});

export default validationSchema;
