import {useState, useEffect} from 'react';
import { InputField } from "../../Components/InputField"
import axios from 'axios';
import { API_BOOK } from '../../Service/endpoints';
import { useNavigate, useParams } from 'react-router';
import { connect } from 'react-redux';
import * as action from '../../Redux/Actions/checkoutDetails';
import { bindActionCreators } from 'redux';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import home from '../../Assets/Images/home.png';

const MealsDetailsFunc = (props) => {
    const {getCheckoutDetails} = props;
    const [mealsData, setMealsData] = useState(null);
    const [ingredientsKeyList, setIngredientsKeyList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormShow, setIsFormShow] = useState(false);
    const [cancelToken] = useState(axios.CancelToken.source());
    const {idMeal} = useParams();
    const navigateTo = useNavigate();

    const initialState = {
        "fullName": '',
        "emailId": '',
        "address": '',
        "city": '',
        "state": '',
        "pincode":''
    }

    useEffect(()=>{
        getMealsDetails();
    }, [])

    const getMealsDetails = async () => {
        const {MEALS_DETAILS_BY_ID} = API_BOOK;
        let requestPayload = {
            url: MEALS_DETAILS_BY_ID,
            method: 'GET',
            params: { i: idMeal }
        }

        await axios.request(requestPayload)
            .then((res)=>{
                if(res.status === 200) {
                   const {meals} = res.data;
                   if(meals?.length) {
                        let ingredientsKeyList = Object.keys(meals[0]).filter((key, index)=>key.startsWith("strIngredient"));
                        setIngredientsKeyList([...ingredientsKeyList])
                        setMealsData(meals[0]);
                   }
                } else {
                    alert(res.message)
                }
            })
            .catch((err)=>{
                alert(err.message)
            });
        setLoading(false);
    }

    const onSubmit = async (data) => {
        await getCheckoutDetails(data);
        navigateTo(`/checkout-details`)
    }

    return (
        <div className="container">
            <div className="row m-0">
                <div className="col-12 d-flex flex-column align-items-center">
                    <header className='d-block pt-2 pb-4'>
                        <h1 className='main-header d-flex align-items-baseline'>
                            <img src={home} className='pe-3' role='button' onClick={()=>navigateTo('/home')}/>
                            Meals Details
                        </h1>
                    </header>
                </div>
                {
                    loading ?
                        <div className='d-flex justify-content-center align-items-center vw-100 vh-100 fw-bold fs-4'>. . . Just Getting Thinks Ready For You . . .</div>
                    :
                        <div className='col-md-12 py-3'>
                            <div className='row m-0'>
                                <div className='col-md-4 d-flex flex-column align-items-start pb-4'>
                                    <div className='meals-name py-3 fw-bold fs-3'>{mealsData?.strMeal}</div>
                                    <img 
                                        src={mealsData?.strMealThumb} 
                                        alt="meals" 
                                        className='meals-thumbs-nail rounded-0'
                                        role="button"
                                    />
                                    <button onClick={()=>setIsFormShow(true)} className='mt-3 checkout-btn'>Click To Checkout</button>
                                </div>
                                <div className='col-md-8'>
                                    <div className='meals-name py-3 fw-bold fs-3'>Ingredients</div>
                                    {
                                        ingredientsKeyList?.length ?
                                            <div className='row m-0'>
                                                {
                                                    ingredientsKeyList.map((curr, i)=>
                                                        <div className='col-md-3 pb-3 fs-5' key={i}>{mealsData?.[curr]}</div>
                                                    )
                                                }
                                            </div>
                                        :
                                            ""
                                    }
                                </div>
                                {
                                    isFormShow ?
                                        <div className='col-md-12 py-3'>
                                            <Formik
                                                initialValues={initialState}
                                                validationSchema={
                                                    yup.object().shape({
                                                        "fullName": yup.string().nullable(true).required('This field is required'),
                                                        "emailId": yup.string().email().nullable(true).required('This field is required'),
                                                        "address": yup.string().nullable(true).required('This field is required'),
                                                        "city": yup.string().nullable(true).required('This field is required'),
                                                        "state": yup.string().nullable(true).required('This field is required'),
                                                        "pincode": yup.number().nullable(true).required('This field is required').max(999999, 'Maximum 6 digits only')
                                                    })
                                                }
                                                onSubmit={(data)=>{
                                                    onSubmit(data);
                                                }}
                                            >
                                                {
                                                    formikProps=>{
                                                        return(
                                                            <Form>
                                                                <div className='row m-0'>
                                                                    <div className='col-md-4 pb-3 ps-0'>
                                                                        <InputField
                                                                            type='text'
                                                                            name='fullName'
                                                                            value={formikProps.values.fullName}
                                                                            onChange={(name, value)=>{
                                                                                formikProps.setFieldValue(name, value)
                                                                            }}
                                                                            label="Full Name"
                                                                        />
                                                                        {
                                                                            formikProps?.errors?.fullName ? <div className='text-danger fw-600 pt-1'>{formikProps.errors.fullName}</div> : ""
                                                                        }
                                                                    </div>
                                                                    <div className='col-md-4 pb-3'>
                                                                        <InputField
                                                                            type='email'
                                                                            name='emailId'
                                                                            value={formikProps.values.emailId}
                                                                            onChange={(name, value)=>{
                                                                                formikProps.setFieldValue(name, value)
                                                                            }}
                                                                            label="Email Id"
                                                                        />
                                                                        {
                                                                            formikProps?.errors?.emailId ? <div className='text-danger fw-600 pt-1'>{formikProps.errors.emailId}</div> : ""
                                                                        }
                                                                    </div>
                                                                    <div className='col-md-4 pb-3'>
                                                                        <InputField
                                                                            type='text'
                                                                            name='address'
                                                                            value={formikProps.values.address}
                                                                            onChange={(name, value)=>{
                                                                                formikProps.setFieldValue(name, value)
                                                                            }}
                                                                            label="Address"
                                                                        />
                                                                        {
                                                                            formikProps?.errors?.address ? <div className='text-danger fw-600 pt-1'>{formikProps.errors.address}</div> : ""
                                                                        }
                                                                    </div>
                                                                    <div className='col-md-4 pb-3 ps-0'>
                                                                        <InputField
                                                                            type='text'
                                                                            name='city'
                                                                            value={formikProps.values.city}
                                                                            onChange={(name, value)=>{
                                                                                formikProps.setFieldValue(name, value)
                                                                            }}
                                                                            label="City"
                                                                        />
                                                                        {
                                                                            formikProps?.errors?.city ? <div className='text-danger fw-600 pt-1'>{formikProps.errors.city}</div> : ""
                                                                        }
                                                                    </div>
                                                                    <div className='col-md-4 pb-3'>
                                                                        <InputField
                                                                            type='text'
                                                                            name='state'
                                                                            value={formikProps.values.state}
                                                                            onChange={(name, value)=>{
                                                                                formikProps.setFieldValue(name, value)
                                                                            }}
                                                                            label="State"
                                                                        />
                                                                        {
                                                                            formikProps?.errors?.state ? <div className='text-danger fw-600 pt-1'>{formikProps.errors.state}</div> : ""
                                                                        }
                                                                    </div>
                                                                    <div className='col-md-4 pb-3'>
                                                                        <InputField
                                                                            type='number'
                                                                            name='pincode'
                                                                            value={formikProps.values.pincode}
                                                                            onChange={(name, value)=>{
                                                                                formikProps.setFieldValue(name, value)
                                                                            }}
                                                                            label="Pincode"
                                                                        />
                                                                        {
                                                                            formikProps?.errors?.pincode ? <div className='text-danger fw-600 pt-1'>{formikProps.errors.pincode}</div> : ""
                                                                        }
                                                                    </div>
                                                                    <div className='col-md-4 pb-3 ps-0 pt-3'>
                                                                        <button
                                                                            type='submit'
                                                                        >
                                                                            Purchase
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </Form>
                                                        )
                                                    }
                                                }
                                            </Formik>
                                        </div>
                                    :
                                        ''
                                }
                                <div className='col-md-12'>
                                    <h4 className='mb-0 pb-3'>Instructions : -</h4>
                                    {
                                        mealsData?.strInstructions?.split('.').map((text, i)=>
                                            <p key={i} className={`pb-3 mb-1`}>
                                                {text}{text? '.' : ''}
                                            </p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                }
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

export const MealsDetails = connect(mapStateFromProps, mapDispatchToProps)(MealsDetailsFunc)