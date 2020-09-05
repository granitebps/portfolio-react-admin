import React, { useState } from 'react';
import { Media, Button, Input, Label } from 'reactstrap';
import defaultImage from '../../../assets/img/default.png';
import { useFormikContext, getIn } from 'formik';

const InputImage = ({ name, image, label }) => {
  const [imagePreview, setImagePreview] = useState();
  const { setFieldValue, errors, touched } = useFormikContext();
  const error = getIn(errors, name);
  const touch = getIn(touched, name);

  const img = image ? image : defaultImage;

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const thumbnail = await toBase64(file);
        setImagePreview(thumbnail);
        setFieldValue(name, file);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <React.Fragment>
      <Label for={name}>{label}</Label>
      <Media>
        <Media className="mr-1" left>
          <Media
            className="rounded-circle"
            object
            src={imagePreview ? imagePreview : img}
            alt="User"
            height="64"
            width="64"
          />
        </Media>
        <Media className="mt-25" body>
          <div className="d-flex flex-sm-row flex-column justify-content-start px-0">
            <Button.Ripple tag="label" className="mr-50 cursor-pointer" color="primary" outline>
              Upload Photo
              <Input
                type="file"
                name={name}
                id="uploadImg"
                hidden
                onChange={handleChange}
                accept="image/*"
              />
            </Button.Ripple>
          </div>
          <p className="text-muted mt-50">
            <small>Allowed JPG, JPEG or PNG. Max size of 2048kB</small>
          </p>
        </Media>
      </Media>
      {error && touch && <div className="field-error text-danger">{error}</div>}
    </React.Fragment>
  );
};

export default InputImage;
