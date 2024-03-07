import * as React from 'react';
import {CssVarsProvider} from "@mui/joy/styles";
import Price from "./Price";
import RoomCtn from "./RommCnt";
import PropertyType from "./PropertyType";
import Address from "./Address";


function Category() {
    return (
        <CssVarsProvider>
            <Address />
            <PropertyType />
            <RoomCtn/>
            <Price />

        </CssVarsProvider>
    );
}

export default Category;