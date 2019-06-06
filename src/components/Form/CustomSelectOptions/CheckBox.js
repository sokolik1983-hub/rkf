import React from 'react'
import './styles.scss'

const CheckBoxOption = ({ innerProps, label, isDisabled, innerRef}) =>
  !isDisabled ? (
    <div ref={innerRef} {...innerProps}>{label}</div>
  ) : null;

export default CheckBoxOption