import * as Yup from "yup";

const FILE_SIZE = 2048 * 1024;

const formSchema = Yup.object().shape({
  image: Yup.array()
    .required("Images is Required")
    .test("fileSize", "Images is too large. Max size is 2048KB", (value) => {
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

export default formSchema;
