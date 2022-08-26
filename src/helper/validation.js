import * as yup from 'yup'
const validation = yup.object({
  email: yup.string().email().required(),
  cardNumber: yup
    .number()
    .required()
    .test('len', 'Invalid Card Number', (val) => val.toString().length === 16)
    .typeError('Card number is required'),
  expiryDate: yup.date().typeError('Expiry Date is required'),
  cvc: yup
    .number()
    .required()
    .test('len', 'Invalid CVC Number', (val) => val.toString().length === 3)
    .typeError('CVC number is required'),
})

export default validation
