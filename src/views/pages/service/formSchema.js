import * as Yup from "yup";

const formSchema = Yup.object().shape({
  name: Yup.string()
    .required("Service Name is Required")
    .max(255, "Service Name is too long. Max length is 255 characters"),
  icon: Yup.string()
    .required("Service Icon is Required")
    .max(255, "Service Icon is too long. Max length is 255 characters"),
  desc: Yup.string().required("Service Description is Required"),
});

export default formSchema;
