import { CHECKOUT_DETAILS } from "../ActionTypes/checkoutDetails";

const initialState = {
    "fullName": null,
    "emailId": null,
    "address": null,
    "city": null,
    "state": null,
    "zip":null
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case CHECKOUT_DETAILS.CAPTURE_DETAILS:
            return {
                ...state,
                ...payload
            }
        case CHECKOUT_DETAILS.RESET_CHECKOUT_DETAILS:
            return {
                ...initialState
            }
        default:
            return state
    }

}