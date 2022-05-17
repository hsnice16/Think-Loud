import PropTypes from "prop-types";
import { AddPhotoIcon } from "assets";
import styles from "./InputFile.module.css";
import { CustomIconButton } from "components";

export const InputFile = ({ inputName, handleChange }) => {
  return (
    <>
      <input
        type="file"
        accept="image/*"
        name={inputName}
        onChange={handleChange}
        id={`${inputName}-picker`}
        className={styles.input_file}
      />
      <label htmlFor={`${inputName}-picker`} className={styles.label_addPhoto}>
        <CustomIconButton disabled ariaLabel="add photo">
          <AddPhotoIcon />
        </CustomIconButton>
      </label>
    </>
  );
};

InputFile.propTypes = {
  inputName: PropTypes.string,
  handleChange: PropTypes.func,
};

InputFile.defaultProps = {
  inputName: "",
  handleChange: () => {},
};
