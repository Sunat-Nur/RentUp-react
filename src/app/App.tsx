// @ts-ignore
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import React, {useEffect, useState,} from 'react';
import AOS, {AosOptions} from "aos";
import {CommunityPage} from "./screens/CommunityPage";
import {MemberPage} from "./screens/MemberPage";
import {HelpPage} from "./screens/HelpPage";
import {LoginPage} from "./screens/LoginPage";
import {HomePage} from "./screens/HomePage";
import {Footer} from "./components/footer";
import AuthenticationModal from "./components/auth";
import MemberApiService from "./apiSservices/memberApiService";
import {sweetFailureProvider, sweetTopSmallSuccessAlert} from "../lib/sweetAlert";
import {Definer} from "../lib/definer";

import "../app/apiSservices/verify";
import {NavbarHome} from "./components/header";
import {AgencyPage} from "./screens/AgencyPage";
import "../css/App.css";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/page.css";
import "../css/chatting.css";
import "aos/dist/aos.css";
import ScrollToTop from "./components/scrollTop/scrollTop";
import {ProductPage} from "./screens/ProductPage";


interface CustomAosOptions extends AosOptions {
    offset: number;
    duration: number;
    delay: number;
    container?: string;
}


function App() {
    /** INITIALIZATION **/
        // const [verifiedMemberData, setVerifiedMemberData] = useState<Member | null>(null);
    const [path, setPath] = useState();
    const main_path = window.location.pathname;
    const [signUpOpen, setSignUpOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    // const { pathname } = useLocation();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    /** HANDLERS **/
    const handleSignUpOpen = () => setSignUpOpen(true);
    const handleSignUpClose = () => setSignUpOpen(false);
    const handleLoginOpen = () => setLoginOpen(true);
    const handleLoginClose = () => setLoginOpen(false);

    const handleLogOutClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseLogOut = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(null);
    };
    const handleLogOutRequest = async () => {
        try {
            let member_data: any = null;
            const memberApiService = new MemberApiService();
            await memberApiService.logOutRequest();
            await sweetTopSmallSuccessAlert('success', 700, true);
        } catch (err: any) {
            console.log(err);
            sweetFailureProvider(Definer.general_err1);
        }
    };

    useEffect(() => {
        const aosOptions: CustomAosOptions = {
            offset: 100,
            duration: 800,
            easing: "ease-in-sine",
            delay: 100,
            container: ".custom-scroll-container",
        };

        AOS.init(aosOptions);
        AOS.refresh();
    }, [main_path]);


    return (
        <Router>
            <ScrollToTop/>
            <NavbarHome
                handleLogOutRequest={handleLogOutRequest}
                handleCloseLogOut={handleCloseLogOut}
                handleLogOutClick={handleLogOutClick}
                handleSignUpOpen={handleSignUpOpen}
                handleLoginOpen={handleLoginOpen}
                anchorEl={anchorEl}
                setPath={setPath}
                open={open}
            />
            <Switch>
                <Route path="/company">
                    < ProductPage />
                </Route>
                <Route path="/agency">
                    < AgencyPage/>
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
            <AuthenticationModal
                loginOpen={loginOpen}
                handleLoginOpen={handleLoginOpen}
                handleLoginClose={handleLoginClose}
                signUpOpen={signUpOpen}
                handleSignUpOpen={handleSignUpOpen}
                handleSignUpClose={handleSignUpClose}
            />
        </Router>
    );
}

export default App;
