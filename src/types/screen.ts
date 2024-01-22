

import { BoArticle } from "./boArticle";
import { Product } from "./product";
import {Member, Company} from "./user";
import {Follower, Following} from "./follow";


/** REACT app state **/
export interface AppRootState {  // app dagi barcha interfacelarni integratsiya qilayopman. ularga biriktirilgan page lar va ularni typelari
    homePage: HomePageState;  // homepage => homepage typedan iborat;
    restaurantPage: RestaurantPageState;
    searchPage: SearchPageState;
    communityPage: CommunityPageState;
    memberPage: MemberPageState;
}

/** homePage  **/
// Homepage ichida kerakli data => typelar tashkillshtirib oldim.
export interface  HomePageState { //  homepageimning interfaceni hosil qilib oldim.
    topProperyts: Product[];  // type restaurant bulgan arraylardan iborat.
    bestAgency: Company[];
    luxuryHomes: Product[];
    bestBoArticles: BoArticle[];
    trendBoArticles: BoArticle[];
    newsBoArticles: BoArticle[];
}

/** restaurant page **/
export interface RestaurantPageState{
    tartgetCompanys: Company[];
    randomCompanys: Company[];
    chosenCompany: Company | null;
    targetProducts: Product[];
    chosenProduct: Product | null;
    chosenMember: Member | null;
}

export interface SearchPageState {
    tartgetCompanys: Company[];
    randomCompanys: Company[];
    chosenCompany: Company | null;
    targetProducts: Product[];
    chosenProduct: Product | null;
    chosenMember: Member | null;
}


/** community page **/
export interface CommunityPageState{
    targetBoArticles: BoArticle[];
}

/** Member page **/
export interface MemberPageState {
    chosenMember: Member | null;
    chosenMemberBoArticles: BoArticle[];
    chosenSingleBoArticle: BoArticle | null;
    memberFollowers: Follower[];
    memberFollowings: Following[];
}