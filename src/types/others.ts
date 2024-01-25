export interface SearchObj {
    page: number;
    limit: number;
    order: string;
}

export interface ProductSearchObj {
    page: number;
    limit: number;
    order?: string;
    company_mb_id?: string;
    product_collection?: string;
    product_address?: string;
    product_value?: string;
    product_size?: string;
}

export interface MemberLiken {
    like_group: string,
    like_status: number,
    like_ref_id: string
}

export interface CartItem {
    _id: string,
    quantity: number,
    name: string,
    price: number,
    image: string,
}

export interface ChatMessage {
    msg: string;
    mb_id: string;
    mb_nick: string;
    mb_image: string;
}

export interface ChatGreetMsg {
    text: string;
}

export interface ChatInfoUsers {
    total: number;
}

export interface NewMessageProps {
    data: ChatMessage;
    key: number;
}