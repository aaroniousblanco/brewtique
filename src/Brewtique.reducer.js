const INITIAL_STATE = {
    product_id: null, product_name: null, product_image: null, brewery: null, description: null, price: null, type: null, signup_message: '', duplicate_message: '',
    signup_info: {username: null, email_address: null, first_name: null, last_name: null, password: null, confirming_password: null},
    logging_in_info: {
        username: null,
        auth_token: null,
        first_name: null
    },
    login_message: ''
}

const brewtiqueReducer = (state = INITIAL_STATE, action) => {
    if (action.type === 'product-page') {
        return Object.assign({}, state, {
            product_name: action.payload.name,
            product_id: action.payload.id,
            product_image: action.payload.img,
            brewery: action.payload.brewery,
            description: action.payload.description,
            price: action.payload.price,
            type: action.payload.type
        });
    } else if (action.type === 'prelim-signup-entry') {
        let copy = state.signup_info;
        copy[action.text_field_name] = action.info;
        return Object.assign({}, state, {
            signup_info: copy
        }); //do i really need this step???
    } else if (action.type === 'sign-up') {
        return Object.assign({}, state, {
            signup_info: {username: action.payload.username,
            email_address: action.payload.email_address,
            first_name: action.payload.first_name,
            last_name: action.payload.last_name,
            password: null}
        });
    } else if (action.type === 'sign-up-error') {
        return Object.assign({}, state, {
            signup_message: action.signup_message
        });
    } else if (action.type === 'sign-up-duplicate-error') {
        return Object.assign({}, state, {
            duplicate_message: action.duplicate_message
        });
    } else if (action.type === 'prelim-login-entry') {
        let copy = state.logging_in_info;
        copy[action.text_field_name] = action.info;
        return Object.assign({}, state, {
            logging_in_info: copy
        });
    } else if (action.type === 'login') {
        return Object.assign({}, state, {
            logging_in_info: {username: action.payload.username,
            auth_token: action.payload.auth_token, first_name: action.payload.first_name}
        });
    } else if (action.type === 'login-error') {
        return Object.assign({}, state, {
            login_message: action.message
        });
    } else if (action.type === 'logout') {
        return Object.assign({}, state, {
            logging_in_info: {
                username: null,
                auth_token: null
            }
        });
    } else {
        return state;
    }
};

export default brewtiqueReducer;
