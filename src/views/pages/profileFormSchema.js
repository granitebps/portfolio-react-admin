import * as Yup from 'yup';

import { validURL } from '../../utility/helper';

const FILE_SIZE = 2048 * 1024;

const formSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is Required')
    .max(255, 'Name is too long. Max length is 255 characters'),
  email: Yup.string()
    .required('Email is Required')
    .email('Email is must be a valid email')
    .max(255, 'Email is too long. Max length is 255 characters'),
  username: Yup.string()
    .required('Username is Required')
    .max(255, 'Username is too long. Max length is 255 characters'),
  about: Yup.string().required('About is Required'),
  age: Yup.number().required('Age is Required'),
  phone: Yup.string()
    .required('Phone is Required')
    .min('8', 'Phone number is too short. Min length is 8 characters')
    .max('13', 'Phone number is too long. Max length is 13 characters'),
  address: Yup.string().required('Address is Required'),
  nationality: Yup.string()
    .required('Nationality is Required')
    .max(255, 'Nationality is too long. Max length is 255 characters'),
  languages: Yup.array().required('Languages is Required'),
  instagram: Yup.string()
    .required('Instagram is Required')
    .url('Instagram Must Be Valid URL')
    .max(255, 'Instagram is too long. Max length is 255 characters'),
  facebook: Yup.string()
    .required('Facebook is Required')
    .url('Facebook Must Be Valid URL')
    .max(255, 'Facebook is too long. Max length is 255 characters'),
  twitter: Yup.string()
    .required('Twitter is Required')
    .url('Twitter Must Be Valid URL')
    .max(255, 'Twitter is too long. Max length is 255 characters'),
  linkedin: Yup.string()
    .required('Linkedin is Required')
    .url('Linkedin Must Be Valid URL')
    .max(255, 'Linkedin is too long. Max length is 255 characters'),
  github: Yup.string()
    .required('Github is Required')
    .url('Github Must Be Valid URL')
    .max(255, 'Github is too long. Max length is 255 characters'),
  youtube: Yup.string()
    .required('Youtube is Required')
    .url('Youtube Must Be Valid URL')
    .max(255, 'Youtube is too long. Max length is 255 characters'),
  medium: Yup.string()
    .required('Medium is Required')
    .url('Medium Must Be Valid URL')
    .max(255, 'Medium is too long. Max length is 255 characters'),
  cv: Yup.mixed().test(
    'fileSize',
    'CV is too big. Max size is 2048KB',
    (value) => !value || (value && value.size <= FILE_SIZE)
  ),
  avatar: Yup.mixed().test('fileSize', ' is too big. Max size is 2048KB', (value) => {
    if (validURL(value)) {
      return true;
    } else {
      return !value || (value && value.size <= FILE_SIZE);
    }
  }),
});

export default formSchema;
