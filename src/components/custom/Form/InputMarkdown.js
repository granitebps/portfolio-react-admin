import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import { getIn, useFormikContext, ErrorMessage } from 'formik';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const InputMarkdown = ({ label, name }) => {
  const { values, setFieldValue } = useFormikContext();
  const value = getIn(values, name);

  const mdParser = new MarkdownIt(/* Markdown-it options */);

  const handleChange = ({ text }) => {
    setFieldValue(name, text);
  };

  return (
    <FormGroup>
      <Label for={name}>{label}</Label>
      <MdEditor
        value={value}
        style={{ height: '500px' }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleChange}
      />
      <ErrorMessage name={name}>
        {(msg) => <div className="field-error text-danger">{msg}</div>}
      </ErrorMessage>
    </FormGroup>
  );
};

export default InputMarkdown;
