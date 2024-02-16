// @ts-ignore
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import React, {useEffect, useState,} from 'react';
import AOS, {AosOptions} from "aos";
import {CommunityPage} from "./screens/CommunityPage";
import {MemberPage} from "./screens/MemberPage";
import {HelpPage} from "./screens/HelpPage";
import {LoginPage} from "./screens/LoginPage";
import {HomePage} from "./screens/HomePage";
import {NavbarAgency} from "./components/header/agency";
import {NavbarOthers} from "./components/header/others";
import {Footer} from "./components/footer";
import AuthenticationModal from "./components/auth";
import MemberApiService from "./apiSservices/memberApiService";
import {sweetFailureProvider, sweetTopSmallSuccessAlert} from "../lib/sweetAlert";
import {Definer} from "../lib/definer";

import "../app/apiSservices/verify";
import {CartItem} from "../types/others";
import {Product} from "../types/product";
import {NavbarHome} from "./components/header";
import {ProductPage} from "./screens/ProductPage";
import {AgencyPage} from "./screens/AgencyPage";
import "../css/App.css";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/page.css";
import "aos/dist/aos.css";
import ScrollToTop from "./components/scrollTop/scrollTop";


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
    const [orderRebuild, setOrderRebuild] = useState<Date>(new Date());
    // const { pathname } = useLocation();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const cartJson: any = localStorage.getItem("cart_data");
    const current_cart: CartItem[] = JSON.parse(cartJson) ?? [];
    const [cartItems, setCartItems] = useState<CartItem[]>(current_cart);

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


    const onAdd = (product: Product) => {
        const exist: any = cartItems?.find(
            (item: CartItem) => item._id === product._id
        );
        if (exist) {
            const cart_updated = cartItems.map((item: CartItem) =>
                item._id === product._id
                    ? {...exist, quantity: exist.quantity + 1}
                    : item
            );
            setCartItems(cart_updated);
            localStorage.setItem("cart_data", JSON.stringify(cart_updated));
        } else {
            const new_item: CartItem = {
                _id: product._id,
                quantity: 1,
                price: product.product_price,
                image: product.product_images[0],
                name: product.product_name,
            };
            const cart_updated = [...cartItems, {...new_item}];
            console.log("new", cart_updated);
            setCartItems(cart_updated);
            localStorage.setItem("cart_data", JSON.stringify(cart_updated));
        }
    };


    const onRemove = (item: CartItem) => {
        const item_data: any = cartItems?.find(
            (ele: CartItem) => ele._id === item._id
        );
        if (item_data.quantity === 1) {
            const filter_items: CartItem[] = cartItems.filter(
                (ele) => ele._id !== item._id
            );
            setCartItems(filter_items);
            localStorage.setItem("cart_data", JSON.stringify(filter_items));
        } else {
            const cart_updated = cartItems?.map((ele: CartItem) =>
                ele._id === item_data._id
                    ? {...item_data, quantity: item_data.quantity - 1}
                    : item
            );
            console.log("rem", cart_updated);
            setCartItems(cart_updated);
            localStorage.setItem("cart_data", JSON.stringify(cart_updated));
        }
    };
    const onDelete = (item: CartItem) => {
        const deleted_items: CartItem[] = cartItems?.filter(
            (ele) => ele._id !== item._id
        );
        setCartItems(deleted_items);
        localStorage.setItem("cart_data", JSON.stringify(deleted_items));
    };
    const onDeleteAll = () => {
        setCartItems([]);
        localStorage.removeItem("cart_data");
    };


    return (
        <Router>
            <ScrollToTop/>
            {main_path == "/" ? (
                <NavbarHome
                    handleLogOutRequest={handleLogOutRequest}
                    handleCloseLogOut={handleCloseLogOut}
                    handleLogOutClick={handleLogOutClick}
                    handleSignUpOpen={handleSignUpOpen}
                    handleLoginOpen={handleLoginOpen}
                    setOrderRebuild={setOrderRebuild}
                    onDeleteAll={onDeleteAll}
                    cartItems={cartItems}
                    anchorEl={anchorEl}
                    onRemove={onRemove}
                    onDelete={onDelete}
                    setPath={setPath}
                    onAdd={onAdd}
                    open={open}
                />
            ) : main_path.includes("/company") ? (
                <NavbarAgency
                    handleLogOutRequest={handleLogOutRequest}
                    handleLogOutClick={handleLogOutClick}
                    handleCloseLogOut={handleCloseLogOut}
                    handleSignUpOpen={handleSignUpOpen}
                    handleLoginOpen={handleLoginOpen}
                    setOrderRebuild={setOrderRebuild}
                    onDeleteAll={onDeleteAll}
                    cartItems={cartItems}
                    onRemove={onRemove}
                    onDelete={onDelete}
                    anchorEl={anchorEl}
                    setPath={setPath}
                    onAdd={onAdd}
                    open={open}
                />
            ) : (
                <NavbarOthers
                    handleLogOutRequest={handleLogOutRequest}
                    handleLogOutClick={handleLogOutClick}
                    handleCloseLogOut={handleCloseLogOut}
                    handleSignUpOpen={handleSignUpOpen}
                    handleLoginOpen={handleLoginOpen}
                    setOrderRebuild={setOrderRebuild}
                    onDeleteAll={onDeleteAll}
                    cartItems={cartItems}
                    anchorEl={anchorEl}
                    onRemove={onRemove}
                    onDelete={onDelete}
                    setPath={setPath}
                    onAdd={onAdd}
                    open={open}
                />
            )}

            <Switch>
                <Route path="/company">
                    < ProductPage onAdd={onAdd}/>
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
