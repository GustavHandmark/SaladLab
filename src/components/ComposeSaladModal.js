import React from 'react';
import $ from 'jquery';

class ComposeSaladModal extends React.Component {
    constructor(props) {
        super(props);

        this.hide = this.hide.bind(this);
    }


    hide() {
        $('#modal').modal('hide');
    }

    render() {
        return (
            <div className="container">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal">
                    Compose salad
                </button>

                <form onSubmit={(event) => {this.props.handleSubmit(event);this.hide()}}>
                    <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Make your salad</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {this.props.children}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Add selections</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default ComposeSaladModal;
