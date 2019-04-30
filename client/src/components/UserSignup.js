import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import authActions from '../actions/authActions';

class UserSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onHandleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const userSignupDetails = {
            username: this.state.username,
            password: this.state.password,
        };

        this.props.userSignup(userSignupDetails);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="ui large form">
                <div className="ui stacked segment">
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="username" placeholder="Please type your username" onChange={this.onHandleChange} />
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Please type your password" onChange={this.onHandleChange} />
                    </div>
                    <button className="ui fluid large teal submit button">Register</button>
                </div>
            </form>
        )
    }
}

UserSignup.propTypes = {
    userSignup: PropTypes.func
};

const mapStateToProps = ({ auth }) => ({ auth });

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        userSignup: authActions.userSignup,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSignup);
