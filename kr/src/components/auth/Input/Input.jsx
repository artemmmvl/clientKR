
import React from 'react';


function Input(props) {
    return(
        <>
        {/*<label htmlFor={props.id}>{props.labelName}</label>*/}
        <input
            required={props.required}
            type={props.type}
            id={props.id}
            disabled={props.disabled}
            value={props.value}
            onChange={props.onChange}
            autoComplete={props.autoComplete}
            placeholder={props.labelName}
            minLength={props.minlength}
        />
        </>
    )

}
export default Input;