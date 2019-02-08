import ComposeSaladModal from './ComposeSaladModal';
import SaladSection from './SaladSection';
import SaladCheckbox from './SaladCheckbox';
import Salad from '../Salad'
import React from 'react';


class ComposeSalad extends React.Component {
    constructor(props) {
        super(props);
        this.state = { //initialize selectors from props.
            selectedFoundation: Object.keys(this.props.inventory).filter(name => this.props.inventory[name].foundation)[0],
            selectedDressing: Object.keys(this.props.inventory).filter(name => this.props.inventory[name].dressing)[0],
            isChecked: {},
        }

        this.handleSelectFoundation = this.handleSelectFoundation.bind(this);
        this.handleSelectDressing = this.handleSelectDressing.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSelectFoundation(event) {
        this.setState({ selectedFoundation: event.target.value })
    }

    handleSelectDressing(event) {
        this.setState({ selectedDressing: event.target.value })
    }

    handleChecked(event) {
        const target = event.target;
        const name = target.type === 'checkbox' ? target.name : target.value
        this.setState({ isChecked: { ...this.state.isChecked, [name]: !this.state.isChecked[name] } });
    }

    handleSubmit(event) {
        event.preventDefault();
        //Call parent function, then reset state/form
        const salad = new Salad();
        const items = Object.keys(this.state.isChecked).filter(item => this.state.isChecked[item]);
        //add our selections
        items.push(this.state.selectedFoundation)
        items.push(this.state.selectedDressing)
        //Salad.js addSelection takes one object as input (with multiple items). Let's create one.
        const itemObject = {}
        items.forEach(item => {
            itemObject[item] = this.props.inventory[item];
        })
        salad.addSelection(itemObject);
        this.props.addSalad(salad);


        //set to default (there's prob a better way to do this.)
        const obj = {}
        Object.keys(this.props.inventory).filter(name => this.props.inventory[name].extra || this.props.inventory[name].protein).forEach(item => {
            obj[item] = false
        })
        this.setState({
            selectedFoundation: Object.keys(this.props.inventory).filter(name => this.props.inventory[name].foundation)[0],
            selectedDressing: Object.keys(this.props.inventory).filter(name => this.props.inventory[name].dressing)[0],
            isChecked: obj,
        })
    }


    render() {
        const foundations = Object.keys(this.props.inventory).filter(name => this.props.inventory[name].foundation);
        return (
            <ComposeSaladModal value={this.state.selectedFoundation} handleSubmit={this.handleSubmit}>
                <SaladSection handleSelect={this.handleChecked} formName='Choose foundation'>
                    {foundations.map(name => <option price={this.props.inventory[name].price} key={name} value={name}>{name} + {this.props.inventory[name].price} kr</option>)}
                </SaladSection>
                <div className="form-group" id="proteins">
                    <label htmlFor="proteins">Proteins</label>
                    {Object.keys(this.props.inventory).filter(name => this.props.inventory[name].protein).map(name => <SaladCheckbox key={name} price={this.props.inventory[name].price} name={name} isChecked={this.state.isChecked[name] ? this.state.isChecked[name] : false} handleChecked={this.handleChecked} />)}
                </div>
                <div className="form-group" id="extras">
                    <label htmlFor="extras"> Extras</label>
                    {Object.keys(this.props.inventory).filter(name => this.props.inventory[name].extra).map(name => <SaladCheckbox key={name} price={this.props.inventory[name].price} name={name} isChecked={this.state.isChecked[name] ? this.state.isChecked[name] : false} handleChecked={this.handleChecked} />)}
                </div>
                <SaladSection value={this.state.selectedDressing} handleSelect={this.handleChecked} formName='Choose dressing'>
                    {Object.keys(this.props.inventory).filter(name => this.props.inventory[name].dressing).map(name => <option price={this.props.inventory[name].price} key={name} value={name}>{name} + {this.props.inventory[name].price} kr</option>)
                    }
                </SaladSection>
            </ComposeSaladModal>

        )
    }
}

export default ComposeSalad;