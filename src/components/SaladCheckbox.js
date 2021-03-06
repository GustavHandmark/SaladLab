import React from 'react';
import { Link } from 'react-router-dom'
class SaladCheckBox extends React.Component {

    render() {
        return (
            <div className="custom-control custom-checkbox mr-sm-2">
                <input type="checkbox" className="custom-control-input" checked={this.props.isChecked} id={this.props.name} name={this.props.name} protein = {this.props.protein} onChange={this.props.handleChecked} />
                <label className="custom-control-label" htmlFor={this.props.name}>
                    <Link to={`/view-ingredient/${this.props.name}`} >
                        {this.props.name} +{this.props.price} kr
                    </Link>
                </label>
            </div>
        )
    }
}

export default SaladCheckBox;