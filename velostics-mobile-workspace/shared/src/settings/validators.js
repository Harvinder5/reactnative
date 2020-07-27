import * as yup from 'yup';

const phoneRegExp = /(^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$)|(^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@\"]{2,4})$)/;
const emailRegExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@\"]{2,4})$/;
const phoneNumberRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const phoneValidation = yup
  .string()
  .matches(phoneNumberRegExp, 'error.mustbephone')
  .min(10, 'error.mustbephone')
  .max(13, 'error.mustbephone')
  .typeError('error.mustbephone');

export const loginValidationSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(phoneNumberRegExp, 'error.mustbephone')
    .min(10, 'error.mustbephone')
    .max(13, 'error.mustbephone')
    .typeError('error.mustbephone')
    .required('error.username.required')
});

/**
 *  name: "",
  l_name: "",
  phone: "",
  email: "",
  password: "",
  confirm_password: "",
  picture_url: "",
  driver: {
    license: "",
    state: "",
    carrier_id: ""
  },
  truck: {
    name: "",
    license_plate: "",
    model: "",
    photos: []
  }
 */

// driver: {
//   licence: null,
//   state: null,
//   carrier_id: null
// },
// truck: {
//   name: null,
//   licence_plate: null,
//   model: null,
//   photos: []
// }
export const signUpValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('error.signup.firstname')
    .min(2, 'error.signup.firstname')
    .max(30, 'error.signup.firstname')
    .trim(),
  l_name: yup.string(),
  phone: phoneValidation.required('error.phone.required'),
  email: yup
    .string()
    .email('error.signup.email')
    .trim()
    .required('error.signup.email.required'),
  driver: yup.object().shape({
    licence: yup
      .string()
      .matches(/^[a-zA-Z0-9 ]*$/i, 'error.signup.driver.licence')
      .max(50, 'error.signup.driver.licence.length')
      .trim()
      .nullable(true)
  }),
  truck: yup.object().shape({
    licence_plate: yup
      .string()
      .matches(/^[a-zA-Z0-9 ]*$/i, 'error.signup.truck.licence')
      .max(50, 'error.signup.driver.licence.length')
      .trim()
      .nullable(true)
  })
});
export const otpValidationSchema = yup.object().shape({
  otp: yup
    .string()
    .min(6, 'error.signin.otp.minlength')
    .required('error.signin.otp.requried')
});
export const updateShipmentValidationSchema = yup.object().shape({
  quoted_cost: yup.number().nullable(),
  actual_cost: yup.number().nullable(),
  items: yup.array().of(
    yup.object().shape({
      package_no: yup.string().required(),
      description: yup
        .string()
        .nullable(true)
        .min(1, 'Too Short')
        .trim()
        .required(),
      quantity: yup
        .number()
        .typeError('Must be a number')
        .required(),
      length: yup.number().required('Required'),
      width: yup.number().required('Required'),
      height: yup.number().required('Required'),
      weight: yup.number().required('Required')
    })
  )
});

export const createShipmentValidationSchema = yup.object().shape({
  po_no: yup
    .string()
    .min(4, 'Min of 4 characters')
    .required('Required')
    .trim(),
  type: yup.string().required(),
  name: yup.string().min(4)
});
export const shipmentLocationFormValidationSchema = yup.object().shape({
  name: yup.string().required('Required'),
  zip_code: yup
    .number()
    .lessThan(99999)
    .moreThan(10000)
    .required(),
  city: yup.string().required('Required'),
  state: yup.string().required('Required'),
  address1: yup.string().required('Required'),
  address2: yup.string(),
  country: yup.string().required(),
  company: yup.object().shape({
    name: yup.string().required('Required')
  }),
  contacts: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required(),
        phone: yup
          .number()
          .lessThan(9999999999)
          .moreThan(1000000000)
          .typeError('Must be a number')
          .required()
      })
    )
    .min(1)
});

export const shipmentCarrierFormValidationSchema = yup.object().shape({
  name: yup.string().required('Requested'),
  email: yup
    .string()
    .email()
    .required('Required'),
  phone: yup
    .number()
    .lessThan(9999999999)
    .moreThan(1000000000)
    .required('Required'),
  zip_code: yup
    .number()
    .lessThan(99999)
    .moreThan(10000)
    .required(),
  city: yup.string().required('Required'),
  state: yup.string().required('Required'),
  address1: yup.string().required('Required'),
  address2: yup.string(),
  country: yup.string().required(),
  contacts: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required(),
        phone: yup
          .number()
          .lessThan(9999999999)
          .moreThan(1000000000)
          .typeError('Must be a number')
          .required()
      })
    )
    .min(0)
});

export const driverAndTruckValidationSchema = yup.object().shape({
  driver: yup.object().shape({
    name: yup.string().required('Required'),
    phone: yup.string().required('Required'),
    email: yup
      .string()
      .email()
      .nullable(true),
    driver: yup.object().shape({
      licence: yup.string().required()
    })
  }),
  truck: yup.object().shape({
    licence_plate: yup.string().required('Required'),
    make: yup.string().required('Required'),
    type: yup.string().required('Required'),
    company: yup.string().required('Required'),
    dot_no: yup.string().required('Required'),
    model: yup.string().required('Required'),
    capacity: yup
      .number()
      .typeError('Must be a number')
      .required('Required')
  })
});
export const driverInfoValidationSchema = yup.object().shape({
  name: yup.string().required('error.profileupdate.name.required'),
  driver: yup.object().shape({
    licence: yup.string().required('error.required')
  }),
  phone: phoneValidation,
  email: yup
    .string()
    .trim()
    .email('error.valid.email')
    .nullable()
});

export const driverTruckInfoValidationSchema = yup.object().shape({
  truck: yup.object().shape({
    licence_plate: yup.string().required('error.required'),
    make: yup.string().nullable(),
    model: yup.string().nullable(),
    capacity: yup
      .string()
      .matches(/^(\s*|\d+)$/, 'error.validnumber')
      .nullable()
  })
});
