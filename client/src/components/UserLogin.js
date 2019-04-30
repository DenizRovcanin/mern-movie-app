import React, {Component} from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import authActions from "../actions/authActions";

class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onHandleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });
    };

    handleNavigation = () => {
        if(!!localStorage.getItem('token')) {
            this.props.history.push('/movies');
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        const userLoginDetails = {
            username: this.state.username,
            password: this.state.password,
        };

        this.props.userLogin(userLoginDetails, () => this.handleNavigation());
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
                    <button className="ui fluid large teal submit button">Login</button>
                </div>
            </form>
        )
    }
}

UserLogin.propTypes = {
    userLogin: PropTypes.func,
    history: PropTypes.object
};

const mapStateToProps = ({ auth }) => ({ auth });

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        userLogin: authActions.userLogin,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
