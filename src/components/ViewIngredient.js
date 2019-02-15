import React from 'react';

class ViewIngredient extends React.Component {
    render() {
        return (
            <div className="container border">
                {`Ingredient: ${this.props.match.params.name}`}
                {Object.keys(this.props.ingredient).map((key) => {return (
                   <div key = {key}>
                       {`${key} : ${this.props.ingredient[key]}`}
                    </div> 
                )})}
                </div>
        )
    }
}

export default ViewIngredient;
