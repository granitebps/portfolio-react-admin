import * as Yup from 'yup';

const formSchema = Yup.object().shape({
  name: Yup.string()
    .required('Certification Name is Required')
    .max(255, 'Certification Name is too long. Max length is 255 characters'),
  institution: Yup.string()
    .required('Institution is Required')
    .max(255, 'Institution is too long. Max length is 255 characters'),
  link: Yup.string()
    .required('Link is Required')
    .url('Link is must be a valid URL')
    .max(255, 'Link is too long. Max length is 255 characters'),
  published: Yup.date().required('Published Date is Required'),
});

export default formSchema;
