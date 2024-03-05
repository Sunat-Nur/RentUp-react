import * as React from 'react';
import {CssVarsProvider} from "@mui/joy/styles";
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';


function PropertyType() {
    return (
        <CssVarsProvider>
            <FormControl sx={{mb: "70px"}}>
                <FormLabel>Property type</FormLabel>
                <RadioGroup defaultValue="medium" name="radio-buttons-group">
                    <Radio value="primary" label="Apartment" color="primary"/>
                    <Radio value="neutral" label="Villa" color="neutral"/>
                    <Radio value="danger" label="Studio" color="danger"/>
                    <Radio value="success" label="Office" color="success"/>
                    <Radio value="warning" label="House" color="warning"/>
                </RadioGroup>
            </FormControl>



        </CssVarsProvider>
    );
}

export default PropertyType;