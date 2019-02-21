import { Link } from 'react-router-dom';
import SaladSection from './SaladSection';
import SaladCheckbox from './SaladCheckbox';
import Salad from '../Salad'
import React from 'react';


class ComposeSalad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formErrors: {
                hasSubmitted: false,
                submissionFailedProtein: false,
                submissionFailedExtras: false,
                extras: true,
                proteins: true,
            },
            selectedFoundation: '',
            selectedDressing: '',
            isChecked: {
                proteins: {},
                extras: {}
            },
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

    validateProteins() {
        const len = Object.keys(this.state.isChecked.proteins).filter(item => this.state.isChecked.proteins[item]).length;
        if (len === 1 || len === 2) {
            this.setState({
                formErrors: {
                    ...this.state.formErrors,
                    proteins: false,
                    submissionFailedProteins: false,
                }
            })
        } else if (this.state.formErrors.hasSubmitted) {
            this.setState({
                formErrors: {
                    ...this.state.formErrors,
                    proteins: true,
                    submissionFailedProteins: true,
                }
            })
        } else {
            this.setState({
                formErrors: {
                    ...this.state.formErrors,
                    proteins: true,
                }
            })
        }
    }

    validateExtras() {
        const len = Object.keys(this.state.isChecked.extras).filter(item => this.state.isChecked.extras[item]).length;
        if (len >= 3 && len <= 15) {
            this.setState({
                formErrors: {
                    ...this.state.formErrors,
                    submissionFailedExtras: false,
                    extras: false,
                }
            })
        } else if (this.state.formErrors.hasSubmitted) {
            this.setState({
                formErrors: {
                    ...this.state.formErrors,
                    extras: true,
                    submissionFailedExtras: true,
                }
            })
        } else {
            this.setState({
                formErrors: {
                    ...this.state.formErrors,
                    extras: true,
                }
            })
        }
    }
    handleChecked(event) {
        const target = event.target;
        const name = target.type === 'checkbox' ? target.name : target.value
        const protein = event.target.getAttribute('protein')
        if (protein === "true") {
            this.setState({
                isChecked: {
                    ...this.state.isChecked,
                    proteins: {
                        ...this.state.isChecked.proteins,
                        [name]: !this.state.isChecked.proteins[name]
                    }
                }
            }, () => { this.validateProteins() })
        }
        if (protein === "false") {
            this.setState({
                isChecked: {
                    ...this.state.isChecked,
                    extras: {
                        ...this.state.isChecked.extras,
                        [name]: !this.state.isChecked.extras[name]
                    }
                }
            }, () => { this.validateExtras() })

        }
    }

    handleSubmit(event) {
        event.preventDefault();
        event.target.classList.add("was-validated")
        if (event.target.checkValidity()) {

            //Call parent function, then reset state/form
            const salad = new Salad();
            const proteins = Object.keys(this.state.isChecked.proteins).filter(item => this.state.isChecked.proteins[item]);
            const extras = Object.keys(this.state.isChecked.extras).filter(item => this.state.isChecked.extras[item]);
            const items = [...proteins, ...extras]
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
                selectedFoundation: '',
                selectedDressing: '',
                isChecked: obj,
            })
            this.props.history.push('/view-order');
        }
        else {
            if (this.state.isChecked)
                this.setState({
                    formErrors: {
                        ...this.state.formErrors,
                        hasSubmitted: true,
                        submissionFailedProteins: true,
                        submissionFailedExtras: true,
                    }
                })
        }
    }

    saladCheckBoxRender = (name) => {
        return (
            <Link className="nav-link" to={`/view-ingredient/${name}`} >
                <SaladCheckbox key={name} price={this.props.inventory[name].price} name={name} isChecked={this.state.isChecked[name] ? this.state.isChecked[name] : false} handleChecked={this.handleChecked} />
            </Link>
        )
    }


    render() {
        const foundations = Object.keys(this.props.inventory).filter(name => this.props.inventory[name].foundation);
        return (
            <div className="container">
                <div>
                    Compose your salad, click on the ingredient for more info. Resets state :(
                </div>
                <br />
                <form onSubmit={(event) => this.handleSubmit(event)} noValidate>
                    <SaladSection value={this.state.selectedFoundation} handleSelect={this.handleSelectFoundation} formName='Choose foundation'>
                        <option value=''>Select a foundation</option>
                        {foundations.map(name => <option price={this.props.inventory[name].price} key={name} value={name}>{name} + {this.props.inventory[name].price} kr </option>)}
                    </SaladSection>
                    <div className="form-group" id="proteins">
                        <label htmlFor="proteins">Proteins</label>
                        {Object.keys(this.props.inventory).filter(name => this.props.inventory[name].protein).map(name => {
                            return (
                                <SaladCheckbox protein={"true"} key={name} price={this.props.inventory[name].price} name={name} isChecked={this.state.isChecked.proteins[name] ? this.state.isChecked.proteins[name] : false} handleChecked={this.handleChecked} />
                            )
                        })}
                        {(this.state.formErrors.submissionFailedProteins && this.state.formErrors.proteins) ?
                            <div className="alert alert-danger" role="alert">Please choose at least one but no more than two proteins</div>
                            : <div />
                        }
                    </div>
                    <div className="form-group" id="extras">
                        <label htmlFor="extras"> Extras</label>
                        {Object.keys(this.props.inventory).filter(name => this.props.inventory[name].extra).map(name => {
                            return (
                                <SaladCheckbox protein={"false"} key={name} price={this.props.inventory[name].price} name={name} isChecked={this.state.isChecked.extras[name] ? this.state.isChecked.extras[name] : false} handleChecked={this.handleChecked} />
                            )
                        })}
                        {(this.state.formErrors.submissionFailedExtras && this.state.formErrors.extras) ?
                            <div className="alert alert-danger" role="alert">Please select at least three, but not more than 15. </div>
                            : <div />}
                    </div>
                    <SaladSection value={this.state.selectedDressing} handleSelect={this.handleSelectDressing} formName='Choose dressing'>
                        <option value=''>Select a dressing</option>
                        {Object.keys(this.props.inventory).filter(name => this.props.inventory[name].dressing).map(name => <option price={this.props.inventory[name].price} key={name} value={name}>{name} + {this.props.inventory[name].price} kr</option>)
                        }
                    </SaladSection>
                    <button type="submit" className="btn mb-10 btn-primary float-right">Add selections</button>
                </form>
            </div>

        )
    }
}


export default ComposeSalad;