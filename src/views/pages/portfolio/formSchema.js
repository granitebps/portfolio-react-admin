import * as Yup from 'yup';
import { validURL } from '../../../utility/helper';

const FILE_SIZE = 2048 * 1024;

const formSchema = (param) => {
  return Yup.object().shape({
    name: Yup.string()
      .required('Portfolio Name is Required')
      .max(255, 'Portfolio Name is too long. Max length is 255 characters'),
    desc: Yup.string().required('Portfolio Description is Required'),
    url: Yup.string()
      .url('Portfolio URL must be a valid URL')
      .nullable()
      .max(255, 'Portfolio URL is too long. Max length is 255 characters'),
    thumbnail: Yup.mixed()
      .test('required', 'Porfolio Thumbnail is Required', (value) => {
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
      .test('fileSize', 'Porfolio Thumbnail is too large. Max size is 2048KB', (value) => {
        if (validURL(value)) {
          return true;
        } else {
          return !value || (value && value.size <= FILE_SIZE);
        }
      }),
    pic: Yup.array()
      .test('required', 'Porfolio Pictures is Required', (value) => {
        if (param) {
          return true;
        } else {
          if (value.length === 0) {
            return false;
          } else {
            return true;
          }
        }
      })
      .test('fileSize', 'Porfolio Pictures is too large. Max size is 2048KB', (value) => {
        if (value.length > 0) {
          const check = value.find((file) => file.size >= FILE_SIZE);
          if (check) {
            return false;
          } else {
            return true;
          }
        }
        return true;
      }),
  });
};

export default formSchema;
