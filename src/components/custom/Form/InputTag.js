import React from 'react';
import { getIn, useFormikContext, ErrorMessage } from 'formik';
import { FormGroup, Label } from 'reactstrap';
import CreatableSelect from 'react-select/creatable';

const InputTag = ({ name, label, ...props }) => {
  const { values, setFieldValue } = useFormikContext();
  const value = getIn(values, name);

  const defaultValue = value.map((d) => ({ value: d, label: d }));

  const handleChange = (e) => {
    if (e) {
      const data = e.map((a) => a.value);
      setFieldValue(name, data);
    }
  };
  return (
    <FormGroup>
      <Label for={name}>{label}</Label>
      <CreatableSelect
        className="React"
        classNamePrefix="select"
        name={name}
        options={[]}
        defaultValue={defaultValue}
        onChange={handleChange}
        isMulti={true}
        noOptionsMessage={() => null}
        components={{ DropdownIndicator: () => null }}
        {...props}
      />
      <ErrorMessage name={name}>
        {(msg) => <div className="field-error text-danger">{msg}</div>}
      </ErrorMessage>
    </FormGroup>
  );
};

export default InputTag;
