import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import * as action from '../../Redux/Actions/checkoutDetails';
import { bindActionCreators } from 'redux';
import home from '../../Assets/Images/home.png'

const CheckoutDetailsFunc = (props) => {
    const {checkoutDetails: data, toClearCheckoutDetails} = props;
    let navigateTo = useNavigate();

    useEffect(()=>{
        window.addEventListener("load", toClearReduxAndGoToHomePage);

        return () => {
            window.removeEventListener("load", toClearReduxAndGoToHomePage);
        }
    }, [])

    const toClearReduxAndGoToHomePage = async () => {
        await toClearCheckoutDetails();
        navigateTo('/home')
    }

    return (
        <div className='container'>
            <div className='row m-0'>
                <div className='col-md-12 fs-3 d-flex justify-content-center align-items-baseline py-3'>
                    <img src={home} className='pe-3' role='button' onClick={()=>navigateTo('/home')}/>
                    Purchased Successfully
                </div>
                <div className='col-md-3 fs-3 pt-0'>Checkout Details</div>
                <div className='col-md-7 pt-2'>
                    <div className='row m-0'>
                        <div className='col-md-6 pb-3 ps-1 d-flex'>
                            <div className='field-label pe-2'>Full Name : </div>
                            <div className='field-content'>{data?.fullName || '-'}</div>
                        </div>
                        <div className='col-md-6 pb-3 ps-1 d-flex'>
                            <div className='field-label pe-2'>Email Id : </div>
                            <div className='field-content'>{data?.emailId || '-'}</div>
                        </div>
                        <div className='col-md-6 pb-3 ps-1 d-flex'>
                            <div className='field-label pe-2'>Address : </div>
                            <div className='field-content'>{data?.address || '-'}</div>
                        </div>
                        <div className='col-md-6 pb-3 ps-1 d-flex ps-0'>
                            <div className='field-label pe-2'>City : </div>
                            <div className='field-content'>{data?.city || '-'}</div>
                        </div>
                        <div className='col-md-6 pb-3 ps-1 d-flex'>
                            <div className='field-label pe-2'>State : </div>
                            <div className='field-content'>{data?.state || '-'}</div>
                        </div>
                        <div className='col-md-6 pb-3 ps-1 d-flex'>
                            <div className='field-label pe-2'>Pincode : </div>
                            <div className='field-content'>{data?.pincode || '-'}</div>
                        </div>
                    </div>
                </div>
                <div className='col-md-2'></div>
            </div>
        </div>
    )
}

const mapStateFromProps = ({ checkoutDetails }) => {
    return {
        checkoutDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(action, dispatch)
}

export const CheckoutDetails = connect(mapStateFromProps, mapDispatchToProps)(CheckoutDetailsFunc)