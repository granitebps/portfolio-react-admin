import * as Yup from "yup";

const formSchema = Yup.object().shape({
  company: Yup.string()
    .required("Company Name is Required")
    .max(255, "Company Name is too long. Max length is 255 characters"),
  position: Yup.string()
    .required("Position is Required")
    .max(255, "Position is too long. Max length is 255 characters"),
  desc: Yup.string().required("Description is Required"),
  current_job: Yup.boolean().required(),
  start_date: Yup.date().required("Start Date is Required"),
  end_date: Yup.date()
    .nullable()
    .when("current_job", {
      is: (current_job) => !current_job,
      then: Yup.date().required(
        "End Date is Required if My Current Job not checked"
      ),
    }),
});

export default formSchema;
