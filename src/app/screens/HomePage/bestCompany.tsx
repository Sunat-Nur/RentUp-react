import * as React from 'react';
import {Box, Container, Stack} from "@mui/material";
import {Favorite, Visibility} from "@mui/icons-material";
import Typography from '@mui/joy/Typography';
// OTHERS
import {serverApi} from '../../../lib/config';
import {useHistory} from "react-router-dom";
// REDUX
import {useSelector} from "react-redux";
import {createSelector} from "reselect";
import {retrieveBestCompany, retrieveTopHomes} from "./selector";
import {Product} from "../../../types/product";
import {Company} from "../../../types/user";


/** REDUX SELECTOR */
const bestCompanyRetriever = createSelector(
    retrieveBestCompany,
    (bestCompany) => ({
        bestCompany,
    })
);


export function BestCompany() {
    /** INITIALIZATION */
    const history = useHistory();
    const {bestCompany} = useSelector(bestCompanyRetriever);

    const visitMemberHandler = (mb_id: string) => {
        history.push(`/member-page/other?mb_id=${mb_id}`);
        document.location.reload();
    };

    return (
        <div className="best_agency_frame">
            <Container>
                <Stack className="agency_frame_box">
                    <Box className="agency_define">
                        <Box className="property_partner" >
                            <p>
                                Property Partners
                            </p>
                            <h1>
                                Meet Our Expert Agents.
                            </h1>
                        </Box>
                    </Box>
                    <Box className="best_agency_main_box_scroll" sx={{flexDirection: "column"}}>
                        <Box className="agencybox_1">

                            {bestCompany.map((ele: Company) => {
                                const image_path = `${serverApi}/${ele.mb_image}`;
                                return (
                                    <Box
                                        onClick={() => visitMemberHandler(ele._id)}
                                    >
                                        <Box className="best_agency_main_box">
                                            <img src={image_path}/>
                                        </Box>
                                        <Box className="best_agency_name" sx={{marginLeft: "20px"}}>
                                            <p>{ele.mb_nick}</p>
                                            <span> {ele.mb_address} </span>
                                        </Box>
                                    </Box>
                                )
                            })}

                        </Box>
                    </Box>

                </Stack>

            </Container>
        </div>
    )
}