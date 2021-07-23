import React, {Component} from 'react';

class FormError extends Component{
    constructor(props) {
        super(props);
        this.state={}
    }

    render() {
        const { errorMessage } = this.props;
        const elmMessage = errorMessage.length > 0 ? (
            <div style={{color: "red", fontSize: "16px", marginTop: "10px", fontStyle: "italic"}}>
                {errorMessage}
            </div>
        ) : "";
        return(
            <div className="col-md-12">
                {elmMessage}
            </div>

        );
    }
}

export default FormError;
