import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import WelcomeBanner from "./welcomeBanner";
import Affirmations from "./affirmations";

class FrontPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enter: true
        };
        this.handleTimer = this.handleTimer.bind(this)
    }
    handleTimer(){
        this.setState({enter:true});
    }
    render() {
        return (
            <div className="App">
                <div style={{height:window.innerHeight/16}}/>
                <WelcomeBanner/>
                <Affirmations/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(FrontPage);
