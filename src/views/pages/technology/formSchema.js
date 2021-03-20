import * as Yup from "yup";

import { validURL } from "../../../utility/helper";

const FILE_SIZE = 2048 * 1024;

const formSchema = (param) => {
  return Yup.object().shape({
    name: Yup.string()
      .required("Technology Name is Required")
      .max(255, "Technology Name is Too Long. Max length is 255 characters"),
    pic: Yup.mixed()
      .test("required", "Image is Required", (value) => {
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
      .test(
        "fileSize",
        "Image size is too big. Max size is 2048KB",
        (value) => {
          if (validURL(value)) {
            return true;
          } else {
            return !value || (value && value.size <= FILE_SIZE);
          }
        }
      ),
  });
};

export default formSchema;
