import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { getIn, useFormikContext, ErrorMessage } from 'formik';
import Flatpickr from 'react-flatpickr';

import 'flatpickr/dist/themes/light.css';
import '../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss';

const DatePicker = ({ label, name, ...props }) => {
  const { values, setFieldValue } = useFormikContext();
  const value = getIn(values, name);

  const handleChange = (date) => {
    setFieldValue(name, new Date(date));
  };

  return (
    <FormGroup>
      <Label for={name}>{label}</Label>
      <Flatpickr
        className="form-control"
        value={value}
        options={{ altInput: true, altFormat: 'j F Y', dateFormat: 'Y-m-d' }}
        onChange={(date) => handleChange(date)}
        {...props}
      />
      <ErrorMessage name={name}>
        {(msg) => <div className="field-error text-danger">{msg}</div>}
      </ErrorMessage>
    </FormGroup>
  );
};

export default DatePicker;
