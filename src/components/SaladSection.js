import React from 'react';

const SaladSection = props => {
    return (
        <div className="form-group">
            <label htmlFor={props.formName}>{props.formName}</label>
            <select required className="form-control" value={props.value} id={props.formName} onChange={props.handleSelect}>
                {props.children}
            </select>
            <div className="invalid-feedback">required, select one</div>
        </div>
    )
}

export default SaladSection;