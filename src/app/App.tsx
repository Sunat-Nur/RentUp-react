import React from 'react';
import '../css/App.css';
import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";

import {CompanyPage} from "./screens/CompanyPage";
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
    const main_path = window.location.pathname;

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
