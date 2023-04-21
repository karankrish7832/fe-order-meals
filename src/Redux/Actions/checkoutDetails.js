import { CHECKOUT_DETAILS } from "../ActionTypes/checkoutDetails";

export const toClearCheckoutDetails = () =>
    async (dispatch, getState) => {
        dispatch({
            type: CHECKOUT_DETAILS.RESET_CHECKOUT_DETAILS,
            payload: null
        })
    }

export const getCheckoutDetails = (data) =>
    async (dispatch, getState) => {
        dispatch({
            type: CHECKOUT_DETAILS.CAPTURE_DETAILS,
            payload: data
        })
    }