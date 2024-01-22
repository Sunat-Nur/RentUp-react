

import { BoArticle } from "./boArticle";
import { Product } from "./product";
import {Member, Company} from "./user";
import {Follower, Following} from "./follow";


/** REACT app state **/
export interface AppRootState {
    homePage: HomePageState;
    CompanyPage: CompanyPageState;
    searchPage: SearchPageState;
    communityPage: CommunityPageState;
    memberPage: MemberPageState;
}

/** homePage  **/
export interface  HomePageState {
    topProperyts: Product[];
    bestAgency: Company[];
    bestBoArticles: BoArticle[];
    luxuryProperty: Product[];
    trendBoArticles: BoArticle[];
    newsBoArticles: BoArticle[];
}

/** restaurant page **/
export interface CompanyPageState{
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