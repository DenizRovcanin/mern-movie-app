import React, {Component} from 'react';

import UserSignup from './UserSignup';
import UserLogin from './UserLogin';

import './styles/styles.scss'

class MainLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            haveAccount: false,
        };

        this.handleAlreadyHaveAccount = this.handleAlreadyHaveAccount.bind(this);
        this.handleNewAccount = this.handleNewAccount.bind(this);
    }

    handleAlreadyHaveAccount = () => {
        this.setState({
            haveAccount: true
        })
    };

    handleNewAccount = () => {
        this.setState({
            haveAccount: false
        })
    };

    render() {
        const haveAccount = this.state.haveAccount;
        let buttonSwitcher;

        if(haveAccount) {
            buttonSwitcher = <button className="ui left labeled icon button" onClick={this.handleNewAccount}>
                <i className="left arrow icon"/>
                I don't have an account
            </button>
        } else {
            buttonSwitcher = <button className="ui right labeled icon button" onClick={this.handleAlreadyHaveAccount}>
                <i className="right arrow icon"/>
                I already have an account
            </button>
        }

        return (
            <div id="formHolder" className="ui middle aligned center grid">
                <div className="column">
                    {!haveAccount ? <UserSignup /> : <UserLogin history={this.props.history}/> }
                    {buttonSwitcher}
                </div>
            </div>
        );
    }
}

export default MainLayout;
