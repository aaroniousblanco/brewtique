import $ from 'jquery';

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
}
