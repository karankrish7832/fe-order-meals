import {useState, useEffect} from 'react';
import { InputField } from "../../Components/InputField"
import axios from 'axios';
import { API_BOOK } from '../../Service/endpoints';
import { useNavigate } from 'react-router';

export const MealsCategoryList = (props) => {
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelToken] = useState(axios.CancelToken.source())
    const navigateTo = useNavigate();
    
    useEffect(()=>{
        getCategoryList();
    }, [])

    const getCategoryList = async () => {
        const {MEALS_CATEGORY_LIST} = API_BOOK;
        await axios.get(MEALS_CATEGORY_LIST, cancelToken.token)
            .then((res)=>{
                if(res.status === 200) {
                    const {categories} = res.data;
                    let requiredItems = [...categories];
                    if(categories.length > 9) {
                        requiredItems = categories.slice(0, 9)
                    }

                    setCategoryList([...requiredItems])
                }
            })
            .catch((err)=>{
                alert(err.message)
            })
        setLoading(false);
    }

    return (
        <div className="container">
            <div className="row m-0">
                <div className="col-12 d-flex flex-column align-items-center">
                    <header className='d-block pt-2 pb-4'>
                        <h1 className='main-header'>Meals Category List</h1>
                    </header>
                </div>
                {
                    loading ?
                        <div className='d-flex justify-content-center align-items-center fw-bold fs-4'>. . . Just Getting Thinks Ready For You . . .</div>
                    :
                        <div className='col-md-12 py-3'>
                            <div className='row m-0'>
                                {
                                    categoryList?.length ?
                                        categoryList.map((curr, index)=>
                                            <div className='col-md-4 d-flex flex-column align-items-center pb-4' key={index}>
                                                <img 
                                                    src={curr.strCategoryThumb} 
                                                    alt="meals-category" 
                                                    className='category-thumbs-nail'
                                                    onClick={()=>navigateTo(`/meals-list/${curr.strCategory}`)}
                                                    role="button"
                                                />
                                                <div className='meals-name'>{curr.strCategory}</div>
                                            </div>
                                        )
                                    : ''
                                }
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}