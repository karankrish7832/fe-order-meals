let routers = [
    {
        path: "*",
        redirect: "/home"
    },
    {
        path: "/home",
        exact: false,
        element: "MealsCategoryList",
        children: []
    },
    {
        path: "/meals-list/:strCategory",
        exact: false,
        element: "MealsList",
        children: []
    },
    {
        path: "/meals-details/:idMeal",
        exact: false,
        element: "MealsDetails",
        children: []
    },
    {
        path: "/checkout-details",
        exact: false,
        element: "CheckoutDetails",
        children: []
    }
]

export {routers};