import React from 'react'
import "../../scss/components/Order/_OrderModify.scss";

const FormOrder = ({
  label,
  inputValue,
  inputOnChange,
  onClickButton,
  onSubmitForm,
  valueInputSubmit,
}) => {
  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <label className="label-category" >{label}</label>

        <input
          className="input-category"
          value={inputValue}
          onChange={(e) => inputOnChange(e.target.value)}
        ></input>

        <input
          className="button-putcategory"
          type="submit"
          onClick={(e) => onClickButton(e)}
          value={valueInputSubmit}
        />
      </form>
    </div>
  );
};

export default FormOrder;
