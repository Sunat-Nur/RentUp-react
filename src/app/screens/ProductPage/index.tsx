import "../../../css/home.css"
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {AllProductPage} from "./allProduct";
import {ChosenProductPage} from "./chosenProduct";


export function ProductPage(props: any) {
    let product = useRouteMatch();
    console.log(product);
    return (
        <div className="product_page_frame">
            <Switch>
                <Route path={`${product.path}`}>
                    <AllProductPage/>
                </Route>
                <Route path={`${product.path}/product/:product_id`}>
                    <ChosenProductPage onAdd={props.onAdd}/>
                </Route>
            </Switch>
        </div>
    )
}