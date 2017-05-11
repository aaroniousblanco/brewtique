const INITIAL_STATE = {
    product_id: null,
    product_name: null,
    product_image: null,
    brewery: null,
    description: null,
    price: null
}

const brewtiqueReducer = (state = INITIAL_STATE, action) => {
    if (action.type === 'product-page') {
        return Object.assign({}, state, {
            product_name: action.payload.name,
            product_id: action.payload.id,
            product_image: action.payload.img,
            brewery: action.payload.brewery,
            description: action.payload.description,
            price: action.payload.price
        });
    }
    else {
        return state;
    }
};

export default brewtiqueReducer;
