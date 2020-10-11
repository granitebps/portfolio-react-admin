import * as Yup from 'yup';

const formSchema = Yup.object().shape({
  name: Yup.string()
    .required('Education Name is Required')
    .max(255, 'Education Name is too long. Max length is 255 characters'),
  institute: Yup.string()
    .required('Education Institute is Required')
    .max(255, 'Education Institute is too long. Max length is 255 characters'),
  start_year: Yup.number()
    .required('Start Year is Required')
    .min(1900, 'Start Year is not valid. Min year is 1900')
    .max(9999, 'Start Year is not valid. Max year is 9999'),
  end_year: Yup.number()
    .required('End Year is Required')
    .min(1900, 'End Year is not valid. Min year is 1900')
    .max(9999, 'End Year is not valid. Max year is 9999'),
});

export default formSchema;
