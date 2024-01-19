import React, {useState} from 'react';
import '../css/App.css';
import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";

import {CompanyPage} from "./screens/CompanyPage";
import {SearchPage} from "./screens/SearchPage";
import {CommunityPage} from "./screens/CommunityPage";
import {MemberPage} from "./screens/MemberPage";
import {HelpPage} from "./screens/HelpPage";
import {LoginPage} from "./screens/LoginPage";
import {HomePage} from "./screens/HomePage";
import {Footer} from "./components/footer";
import {NavbarHome} from "./components/header/home";
import {NavbarAgency} from "./components/header/agency";
import {NavbarOthers} from "./components/header/others";
import "../css/navbar.css";
import "../css/footer.css";

function App() {
    const [path, setPath] = useState();
    const main_path = window.location.pathname;
    const [signUpOpen, setSignUpOpen] = useState(false); // boshlang'ish qiymat false
    const [loginOpen, setLoginOpen] = useState(false); // boshlang'ish qiymat false
    const [orderRebuild, setOrderRebuild] = useState<Date>(new Date());

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const cartJson: any = localStorage.getItem("cart_data");
    // const current_cart: [] = JSON.parse(cartJson) ?? [];
    // const [cartItems, setCartItems] = useState<CartItem[]>(current_cart);



    return (
        <Router>
            {main_path === "/" ? (
                <NavbarHome />
            ): main_path.includes("agency") ? (
                <NavbarAgency/>
            ) : (
                <NavbarOthers />
            )}

            <Switch>
                <Route path="/company">
                    < CompanyPage/>
                </Route>
                <Route path="/search">
                    < SearchPage/>
                </Route>
                <Route path="/community">
                    < CommunityPage/>
                </Route>
                <Route path="/member-page">
                    < MemberPage/>
                </Route>
                <Route path="/help">
                    < HelpPage/>
                </Route>
                <Route path="/login">
                    < LoginPage/>
                </Route>
                <Route path="/">
                    < HomePage/>
                </Route>
            </Switch>
            <Footer/>

        </Router>
    );
}

export default App;
