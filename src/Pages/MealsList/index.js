import {useState, useEffect, useCallback} from 'react';
import { InputField } from "../../Components/InputField"
import axios from 'axios';
import { API_BOOK } from '../../Service/endpoints';
import { useParams, useNavigate } from 'react-router';
import _ from 'lodash';
import home from '../../Assets/Images/home.png'

export const MealsList = (props) => {
    const [searchMealsName, setSearchMealsName] = useState('');
    const [mealsList, setMealsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelToken] = useState(axios.CancelToken.source());
    const [init, setInit] = useState(true);
    const {strCategory} = useParams();
    const navigateTo = useNavigate();

    useEffect(()=>{
        getMealsList();
        setInit();
    }, [])

    useEffect(()=>{
        if(!init && !searchMealsName) {
            getMealsList()
        }
    },[searchMealsName])

    const debounceLoadData = useCallback(_.debounce((data)=>{
        if(data) {
            getFilterData(data)
        }
    }, 1000), []);

    const getMealsList = async () => {
        const {MEALS_LIST_BASED_ON_CATEGORY} = API_BOOK;
        let requestPayload = {
            url: MEALS_LIST_BASED_ON_CATEGORY,
            method: 'GET',
            params: { c: strCategory }
        }
        setLoading(true);
        await axios.request(requestPayload)
            .then((res)=>{
                if(res.status === 200) {
                    const {meals} = res.data;
                    let mealsList = meals?.length ? meals : [];
                    if(meals?.length > 12) {
                        mealsList = meals.slice(0, 12);
                    }
                    setMealsList([...mealsList]);
                } else {
                    alert(res.message)
                }
            })
            .catch((err)=>{
                alert(err.message)
            });
        setLoading(false);
    }

    const getFilterData = async (data) => {
        const {MEALS_DETAILS_BY_NAME} = API_BOOK;
        let requestPayload = {
            url: MEALS_DETAILS_BY_NAME,
            method: 'GET',
            params: { s: data }
        }
        setLoading(true);
        await axios.request(requestPayload)
            .then((res)=>{
                if(res.status === 200) {
                    const {meals} = res.data;
                    let mealsList = meals?.length ? meals : [];
                    if(meals?.length > 12) {
                        mealsList = meals.slice(0, 12);
                    }
                    setMealsList([...mealsList]);
                } else {
                    alert(res.message)
                }
            })
            .catch((err)=>{
                alert(err.message)
            });
        setLoading(false);
    }

    return (
        <div className="container">
            <div className="row m-0">
                <div className="col-12 d-flex flex-column align-items-center pb-4">
                    <header className='d-flex align-items-center py-2'>
                        <h1 className='main-header pl-2 d-flex align-items-baseline'>
                            <img src={home} className='pe-3' role='button' onClick={()=>navigateTo('/home')}/>
                            Meals List
                        </h1>
                    </header>
                    <InputField
                        type="string"
                        name="searchMealsName"
                        value={searchMealsName}
                        placeholder="Search By Meals Name"
                        onChange={(name, value)=>{
                            setSearchMealsName(value);
                            debounceLoadData(value);
                        }}
                    />
                </div>
                <div className='col-md-12 py-3'>
                    {
                        loading ?
                            <div className='d-flex justify-content-center align-items-center fw-bold fs-4'>
                                . . . Just Getting Thinks Ready For You . . .
                            </div>
                        :
                            <div className='row m-0'>
                                {
                                    mealsList?.length ?
                                        mealsList.map((curr, index)=>
                                            <div className='col-md-4 d-flex flex-column align-items-center pb-5' key={index}>
                                                <img 
                                                    src={curr.strMealThumb} 
                                                    alt="meals" 
                                                    className='meals-thumbs-nail'
                                                    onClick={()=>navigateTo(`/meals-details/${curr.idMeal}`)}
                                                    role="button"
                                                />
                                                <div className='meals-name pt-3 fw-bold'>{curr.strMeal}</div>
                                            </div>
                                        )
                                    : <p className='d-flex justify-content-center align-items-center vw-100 vh-100 fw-bold fs-4'>No Meals Yet To Show</p>
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}