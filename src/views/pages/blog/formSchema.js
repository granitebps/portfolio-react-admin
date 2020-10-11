import * as Yup from 'yup';
import { validURL } from '../../../utility/helper';

const FILE_SIZE = 2048 * 1024;

const formSchema = (param) => {
  return Yup.object().shape({
    title: Yup.string()
      .required('Blog Title is Required')
      .max(255, 'Blog Title is too long. Max length is 255 characters'),
    body: Yup.string().required('Blog Content is Required'),
    image: Yup.mixed()
      .test('required', 'Blog Image is Required', (value) => {
        if (param) {
          return true;
        } else {
          if (!value) {
            return false;
          } else {
            return true;
          }
        }
      })
      .test('fileSize', 'Blog Image is too big. Max size is 2048KB', (value) => {
        if (validURL(value)) {
          return true;
        } else {
          return !value || (value && value.size <= FILE_SIZE);
        }
      }),
  });
};

export default formSchema;
