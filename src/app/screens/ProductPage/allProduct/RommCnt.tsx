import * as React from 'react';
import {CssVarsProvider} from "@mui/joy/styles";
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';

function RoomCtn() {

    const [value, setValue] = React.useState('female');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };


    return (
        <CssVarsProvider>
            <div>
                <Typography id="sandwich-group" level="body-sm" fontWeight="lg" mb={1}>
                    Room
                </Typography>
                <div role="group" aria-labelledby="sandwich-group">
                    <List size="sm">
                        <ListItem>
                            <Checkbox label="one room" defaultChecked/>
                        </ListItem>
                        <ListItem>
                            <Checkbox label="two room"/>
                        </ListItem>
                        <ListItem>
                            <Checkbox label="three room"/>
                        </ListItem>
                        <ListItem>
                            <Checkbox label="four room"/>
                        </ListItem>
                        <ListItem>
                            <Checkbox label="five room"/>
                        </ListItem>

                    </List>
                </div>
            </div>


        </CssVarsProvider>
    );
}

export default RoomCtn;