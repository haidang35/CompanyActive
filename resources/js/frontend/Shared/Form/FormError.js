import React, {Component} from 'react';

class FormError extends Component{
    constructor(props) {
        super(props);
        this.state={}
    }

    render() {
        const { isHidden, errorMessage } = this.props;
        const elmMessage = !isHidden ? (
            <div style={{color: "red", fontSize: "16px", marginTop: "10px"}}>
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
