import React from 'react';

class SaladCheckBox extends React.Component {

    render() {
        return (
            <div className="custom-control custom-checkbox mr-sm-2">
                <input type="checkbox" className="custom-control-input" checked={this.props.isChecked} id={this.props.name} name={this.props.name} onChange={this.props.handleChecked} />
                <label className="custom-control-label" htmlFor={this.props.name}>{this.props.name} +{this.props.price} kr</label>
            </div>
        )
    }
}

export default SaladCheckBox;