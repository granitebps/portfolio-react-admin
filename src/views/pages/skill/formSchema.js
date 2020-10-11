import * as Yup from 'yup';

const formSchema = Yup.object().shape({
  name: Yup.string()
    .required('Skill Name is Required')
    .max(255, 'Skill Name is Too Long. Max length is 255 characters'),
  percentage: Yup.number()
    .required('Skill Percentage is Required')
    .min(1, 'Skill Percentage is too small. Min number is 1')
    .max(100, 'Skill Percentage is too big. Max number is 100'),
});

export default formSchema;
