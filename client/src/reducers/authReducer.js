const initialState = {
    userSignup: {},
    userLogin: {}
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'USER_SIGNED_UP':
            return {
                ...state,
                userSignup: action.data
            };
        case 'USER_LOGIN':
            return {
                ...state,
                userLogin: action.data,
            };
        case 'USER_LOGGED_OUT':
            return initialState;
        default:
            return state;
    }
}
