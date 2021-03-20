import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Label, FormGroup, Col, Row, Button, Spinner } from "reactstrap";
import { useFormikContext, getIn } from "formik";

import "../../../assets/scss/plugins/extensions/dropzone.scss";

const InputMultipleImage = ({
  name,
  images,
  label,
  removeDefaultPic = () => {},
  loadingRemoveDefaultPic = false,
}) => {
  const { setFieldValue, errors, isSubmitting } = useFormikContext();
  const [files, setFiles] = useState([]);
  const error = getIn(errors, name);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFieldValue(name, acceptedFiles);
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const handleRemoveThumb = (index) => {
    const oldFiles = [...files];
    oldFiles.splice(index, 1);
    setFiles(oldFiles);
    setFieldValue(name, oldFiles);
  };

  const thumbs = files.map((file, index) => (
    <Col md="1" key={file.name}>
      <img
        src={file.preview}
        className="img-thumbnail img-fluid"
        alt={file.name}
      />
      <Button
        color="danger"
        size="sm"
        tag="button"
        className="btn-block"
        onClick={() => handleRemoveThumb(index)}
      >
        Remove
      </Button>
    </Col>
  ));

  const defaultPictures = images.map((image, index) => (
    <Col md="2" key={index}>
      <a href={image.pic} target="_blank" rel="noopener noreferrer">
        <img src={image.pic} className="img-fluid img-thumbnail" alt={index} />
      </a>
      <Button
        color="danger"
        size="sm"
        tag="button"
        className="btn-block"
        onClick={() => removeDefaultPic(image.id)}
        disabled={loadingRemoveDefaultPic || isSubmitting}
      >
        {loadingRemoveDefaultPic ? (
          <Spinner color="white" size="sm" />
        ) : (
          "Remove"
        )}
      </Button>
    </Col>
  ));

  return (
    <FormGroup>
      <section className="pb-1">
        <Label for={name}>{label}</Label>
        {images.length > 0 && <Row className="mb-2">{defaultPictures}</Row>}
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} disabled={isSubmitting} />
          <p className="mx-1">
            <em>(Allowed JPG, JPEG or PNG. Max size of 2048kB)</em>
          </p>
        </div>
        <Row className="mt-1">{thumbs}</Row>
        {error && <div className="field-error text-danger">{error}</div>}
      </section>
    </FormGroup>
  );
};

export default InputMultipleImage;
