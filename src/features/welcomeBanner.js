import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../affirmLogo.svg'

class WelcomeBanner extends Component {
    constructor(props){
        super(props);
        this.state = {
            error : null,
            isLoaded : true,
        };
    }

    componentDidMount() {

    }

    render() {

        return(
            <div>
                <h1>The Daily Burger</h1>
                <img src={logo} className="App-logo" alt="logo" />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(WelcomeBanner);