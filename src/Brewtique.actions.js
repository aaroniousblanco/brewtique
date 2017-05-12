import $ from 'jquery';
import { hashHistory } from 'react-router';

const toProductPage = (data) => {
    return {type: 'product-page', payload: data};
};

export const fetchPageData = (query) => {
    let asyncAction = (dispatch) => {
        $.ajax({
            url: 'http://localhost:4000/api/products/' + query,
            method: 'GET'
        })
        .then(page_data => dispatch(toProductPage(page_data)))
        .catch(resp => dispatch(resp));
    }
    return asyncAction;
};

export const enteringSignUpInfo = (info, text_field_name) => {
    return {type: 'prelim-signup-entry', info: info, text_field_name: text_field_name};
};

const signUpUserAction = (data) => {
    return {type: 'sign-up', payload: data};
};

const signUpInfoDuplicateError = (resp) => {
    return {type: 'sign-up-duplicate-error', duplicate_message: 'Your username or email address already exists in our system. Please reenter.'}
};

export const signUpUserActionCreator = (info) => {
    //check password against confirming_password here
    if (info.confirming_password !== info.password) {
        return {type: 'sign-up-error', signup_message: 'Your password does not match. Please reenter it.'};
    } else {
        let asyncAction = (dispatch) => {
            $.ajax({
                url: 'http://localhost:4000/api/user/signup',
                data: JSON.stringify({info: info}),
                method: 'POST',
                dataType: 'JSON',
                contentType: 'application/json'
            })
            .then(data => {
                dispatch(signUpUserAction(data));
                hashHistory.push('/');
            })
            .catch(resp => {
                dispatch(signUpInfoDuplicateError(resp));
            });
        }
        return asyncAction;
    }
};

export const enteringLoginInfo = (info, text_field_name) => {
    return {type: 'prelim-login-entry', info: info, text_field_name: text_field_name};
};

const loginUserAction = (data) => {
    return {type: 'login', payload: data};
};

const loginError = (resp) => {
    return {type: 'login-error', message: 'Login failed.'};
}

export const loggingInActionCreator = (info) => {
    let asyncAction = (dispatch) => {
        $.ajax({
            url: 'http://localhost:4000/api/user/login',
            data: JSON.stringify({info: info}),
            method: 'POST',
            dataType: 'JSON',
            contentType: 'application/json'
        })
        .then(data => {
            dispatch(loginUserAction(data));
            hashHistory.push('/');
        })
        .catch(resp => {
            dispatch(loginError(resp));
        });
    }
    return asyncAction;
};

export const logout = () => {
    return {type: 'logout'};
}
