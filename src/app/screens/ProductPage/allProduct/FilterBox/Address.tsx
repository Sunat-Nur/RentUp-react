import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import {CssVarsProvider} from "@mui/joy/styles";
import {Box} from "@mui/material";


function Address() {




    return (
        <CssVarsProvider>
            <Box sx={{mb: "20px"}}>
                Address:
            </Box>
            <Select
                placeholder="Select address"
                sx={{width: 240, marginBottom: "40px"}}
                slotProps={{
                    listbox: {
                        placement: 'bottom-start',
                    },
                }}
            >
                <Option value="1">
                    Tashkent
                </Option>
                <Option value="2">
                    samarkand
                </Option>
                <Option value="3">
                    termiz
                </Option>
                <Option value="3">
                    Andijan
                </Option>
                <Option value="3">
                    Navoiy
                </Option>
            </Select>
        </CssVarsProvider>
    );
}

export default Address;