import * as Yup from "yup";

const FILE_SIZE = 1024 * 1024 * 100;

const formSchema = Yup.object().shape({
  file: Yup.mixed()
    .required("File is Required")
    .test("fileSize", "File is too large. Max size is 100MB", (value) => {
      if (value) {
        if (value.size >= FILE_SIZE) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    }),
});

export default formSchema;
