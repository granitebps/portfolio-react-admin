import * as Yup from "yup";

const formSchema = Yup.object().shape({
  old_password: Yup.string()
    .required("Old Password is Required")
    .min(8, "Old Password is too short. Min length is 8 characters")
    .max(255, "Old Password is too long. Max length is 255 characters"),
  password: Yup.string()
    .required("New Password is Required")
    .min(8, "New Password is too short. Min length is 8 characters")
    .max(255, "New Password is too long. Max length is 255 characters")
    .notOneOf(
      [Yup.ref("old_password"), null],
      "New Password Cannot Be Same To Old Password"
    ),
  password_confirmation: Yup.string()
    .required("New Password Verification is Required")
    .min(
      8,
      "New Password Verification is too short. Min length is 8 characters"
    )
    .max(
      255,
      "New Password Verification is too long. Max length is 255 characters"
    )
    .oneOf(
      [Yup.ref("password"), null],
      "New Password Verification is Not Match With New Password"
    ),
});

export default formSchema;
