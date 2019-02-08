import React from 'react';

const SaladSection = props => {
    return (
        <div className="form-group">
            <label htmlFor={props.formName}>{props.formName}</label>
            <select className="form-control" value={props.value} id={props.formName} onChange={props.handleSelect}>
                {props.children}
            </select>
        </div>
    )
}

export default SaladSection;