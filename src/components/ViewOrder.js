import React, { Component } from 'react';
import shortid from 'shortid';

const ViewOrder = (props) => {

    return (
        <ul className="list-group">
            {props.salads.map(salad => {
                return (
                    <li key={`div-${shortid.generate()}`} className="list-group-item d-flex justify-content-between align-items-center">
                        {salad.asString()}
                        <div>
                            <span style={{ margin: '5px' }} className="badge badge-primary badge-pill ">{salad.price()} kr</span>
                        </div>
                    </li>
                )
            })}
        </ul>
    )

}

export default ViewOrder;

/*
<button className="badge badge-primary">X</button>
*/