export interface Product {
    _id: string,
    product_name: string,
    product_collection: string,
    product_status: string,
    product_address: string,
    product_price: number,
    product_discount: number,
    product_left_cnt: number,
    product_size: string,
    product_value: string
    product_description: string,
    product_images: string[],
    product_likes: number,
    product_views: number,
    company_mb_id: string,
    createdAt: Date,
    updatedAt: Date,
    me_liked: Meliked[];
}


export interface Meliked {
    mb_id: string;
    like_ref_id: string;
    my_favorite: boolean;
}
