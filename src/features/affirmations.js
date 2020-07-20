import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchAffirmation, sendAffirmation } from './../actions/appActions'

// var affirmations = [
//     "Today you woke up and that is a victory.",
//     "You are loved.",
//     "Don't forget to extend to yourself grace.",
//     "You are valuable.",
//     "You will survive this.",
//
// ]

class Affirmations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: {
                to: '',
                body: ''
            },
            prevNum: '',
            submitting: false,
            error: false
        };

        this.onSubmit = this.onSubmit.bind(this)
        this.onHandleChange = this.onHandleChange.bind(this)
        this.getFormattedPhoneNum = this.getFormattedPhoneNum.bind(this)
        this.regenerate = this.regenerate.bind(this)
    }

    onHandleChange(event) {
        const name = event.target.getAttribute('name');
        switch (name) {
            case "body":
                this.setState({
                    message: { ...this.state.message, [name]: event.target.value }
                });
                break;
            case "to":
                let lastEndChar = this.state.prevNum;
                this.setState({prevNum:event.target.value})
                let test = event.target.value.charAt(event.target.value.length - 1)
                let updateValue = event.target.value.replace(/\D/g,'');
                if(isNaN(test) && isNaN(lastEndChar)){
                    updateValue = updateValue.substring(0, updateValue.length-1);
                }else{

                }
                this.setState({
                    message: { ...this.state.message, [name]: updateValue }
                });
                break;
            default:
                break;
        }
        console.log(this.state.message.to)
    }

    onSubmit(event) {
        const { dispatch } = this.props;
        dispatch(sendAffirmation(this.state.message))
    }

    componentDidMount() {
        this.regenerate()
    }

    regenerate(){
        const { dispatch } = this.props;
        dispatch(fetchAffirmation()).then(
            this.setState({
                message: { ...this.state.message, body: this.props.affirmation }
            })
        )
    }

    getFormattedPhoneNum( input ) {
        let output = "";
        (this.state.message.to !== "")? output = "(" : output = ""
        input.replace( /^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/, function( match, g1, g2, g3 )
            {
                if ( g1.length ) {
                    output += g1;
                    if ( g1.length === 3 ) {
                        output += ")-";
                        if ( g2.length ) {
                            output += "" + g2;
                            if ( g2.length === 3 ) {
                                output += "-";
                                if ( g3.length ) {
                                    output += g3;
                                }
                            }
                        }
                    }
                }
            }
        );
        return output;
    }

    render() {
        return (
            <div className={this.state.error ? 'error sms-form' : 'sms-form'}>
                Sometimes we find ourselves at a loss for words.
                <h4>"{this.props.affirmation}"</h4>
                <div>
                    <div className={"affirm-buttons"}>
                        <div>
                            <button className="regenerate" type="regenerate" onClick={this.regenerate}>
                                Regenerate
                            </button>
                        </div>
                    </div>
                    <div>
                        <input
                            type="tel"
                            name="to"
                            id="to"
                            placeholder="(123)-456-7890"
                            value={this.getFormattedPhoneNum(this.state.message.to)}
                            onChange={this.onHandleChange}
                        />
                    </div>
                    <div className={"affirm-buttons"}>
                        <button className="submit" type="submit" disabled={this.state.submitting} onClick={this.onSubmit}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        affirmation: state.app.affirmation
    }
}

export default connect(mapStateToProps)(Affirmations);