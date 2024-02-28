import {Route, Switch, useRouteMatch} from "react-router-dom";
import {AllProductPage} from "./allProduct";
import {ChosenProductPage} from "./chosenProduct/chosenProduct";
import "../../../css/product.css"
import "../../../css/home.css"


export function ProductPage(props: any) {
    let product = useRouteMatch();
    console.log(product);
    return (
        <div className="product_page_frame">
            <Switch>
                <Route path={`${product.path}/products/:product_id`}>
                    <ChosenProductPage onAdd={props.onAdd}/>
                </Route>
                <Route path={`${product.path}`}>
                    <AllProductPage/>
                </Route>
            </Switch>
        </div>
    )
}