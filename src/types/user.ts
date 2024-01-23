import { MeFollowed } from "./follow";

export interface Company {
    _id: string;
    mb_nick: string;
    mb_phone: string;
    mb_password: string;
    mb_type: string;
    mb_status: string;
    mb_address?: string;
    mb_description?: string;
    mb_image: string;
    mb_point: number;
    mb_top: string;
    mb_views: number;
    mb_likes: number;
    mb_follow_cnt: number;
    mb_subscriber_cnt: number;
    createdAt: Date;
    me_liked: Meliked[];
}

export interface Member {
    _id: string;
    mb_nick: string;
    mb_phone: string;
    mb_password: string;
    mb_type: string;
    mb_status: string;
    mb_address?: string;
    mb_description?: string;
    mb_image?: string;
    mb_point?: number;
    mb_top?: string;
    mb_views: number;
    mb_likes: number;
    mb_follow_cnt: number;
    mb_subscriber_cnt: number;
    createdAt: Date;
    me_liked: Meliked[];
    me_followed: MeFollowed[];
}

export interface Meliked {
    mb_id: string;
    like_ref_id: string;
    my_favorite: boolean;
}

export interface AuthenticationModalProps {
    signUpOpen: boolean;
    loginOpen: boolean;
    handleLoginOpen: () => void;
    handleSignUpOpen: () => void;
}


export interface MemberUpdateData {
    mb_nick?: string;
    mb_phone?: string;
    mb_address?: string;
    mb_description?: string;
    mb_image?: string | null;
}