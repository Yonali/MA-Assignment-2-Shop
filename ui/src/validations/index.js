import * as Yup from "yup";

export const SigningForm = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('required'),
    password: Yup.string()
        .min(8, 'password must be at least 8 character')
        .max(50, 'Too Long!')
        .required('required'),
});

export const UpdateMe = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('required'),
    name: Yup.string().required('required'),
});

export const SignupSchema = Yup.object().shape({
    name: Yup.string().required('required'),
    email: Yup.string().email('Invalid email').required('required'),
    password: Yup.string()
        .min(8, 'password must be at least 8 character')
        .max(50, 'Too Long!')
        .required('required'),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'passwords must match')
        .required('required'),
});

export const ProductSchema = Yup.object().shape({
    name: Yup.string().required('required'),
    stock: Yup.string().required('required'),
    size: Yup.number().required('required'),
    // category:Yup.string().required('required'),
    price: Yup.string().required('required'),
    sku: Yup.string().required('required'),
    // description:Yup.string().required('required'),
});

export const Mobile = Yup.object().shape({
    phone: Yup.string().required('required')
        .min(9, 'please enter valid phone number')
        .max(10, 'please enter valid phone number')
});

export const BankCart = Yup.object().shape({
    name: Yup.string().required('required'),
    cart_no: Yup.string().required('required')
        .min(16, 'please enter valid card number')
        .max(16, 'please enter valid card number'),
    expiration: Yup.string().required('required')
        .min(5, 'expiration is invalid')
        .max(5, 'expiration is invalid'),
    security: Yup.string().required('required')
        .min(3, 'security is invalid')
        .max(3, 'security is invalid')
});