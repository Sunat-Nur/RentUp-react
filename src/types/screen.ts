import { BoArticle } from "./boArticle";
import { Product } from "./product";
import {Member, Company} from "./user";
import {Follower, Following} from "./follow";


/** REACT app state **/
export interface AppRootState {
    homePage: HomePageState;
    ProductPage: ProductPageState;
    communityPage: CommunityPageState;
    memberPage: MemberPageState;
}

/** homePage  **/
export interface  HomePageState {
    topHomes: Product[];
    bestCompany: Company[];
    bestBoArticles: BoArticle[];
    luxuryProperty: Product[];
    trendBoArticles: BoArticle[];
    newsBoArticles: BoArticle[];
}

/** Product page **/
export interface ProductPageState{
    tartgetCompanys: Company[];
    targetAllProducts: Product[];
    randomCompanys: Company[];
    chosenCompany: Company | null;
    chosenProduct: Product | null;
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