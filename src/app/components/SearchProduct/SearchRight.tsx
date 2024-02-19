import React from "react";
import Address from "./Searchitem/Address";
import Collection from "./Searchitem/Collection";
import Price from "./Searchitem/Price";
import Size from "./Searchitem/Size";

const SearchRight = () => {
    return (
        <div className="w-full flex flex-col gap-6">
            <Address />
            <Collection />
            <Price />
            <Size />
        </div>
    );
};

export default SearchRight;
