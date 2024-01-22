import React from "react";
import {Container, Stack, Box} from "@mui/material";

export function Posts() {
    return (
        <div className="owner_post_frame">
            <Container>
                <Stack className="owner_post_container">
                    <Stack className="owner_post_box">
                        <Stack className="owner_post">
                            <Box className="comp_advice">
                                <p>Hear It from</p>
                                <span>Our Happy Homeowners!</span>

                                <Box className="happy_homeowner">
                                    <img src={"/icons/star.svg"}/>
                                    <img src={"/icons/star.svg"}/>
                                    <img src={"/icons/star.svg"}/>
                                    <img src={"/icons/star.svg"}/>
                                </Box>

                                <Box className="owner_text">
                                    <span>
                                        Cras lacus risus, porta eget nulla quis, efficitur sodales diam. Pellentesque at blandit tortor. Morbi faucibus eu eros at ultrices. Duis vestibulum congue metus, ut commodo felis commodo at. Proin finibus hendrerit sodales. Nunc nec ipsum non metus consectetur pellentesque non eget sapien. Etiam leo ligula, molestie vel turpis id, eleifendt.
                                    </span>
                                </Box>
                                <Box className="name_img_box">
                                    <Box className="owner_img">
                                        <img src={"/home/home1.webp"}/>
                                    </Box>
                                    <Box>
                                        <p>
                                            @Sunat_Nur
                                        </p>
                                    </Box>

                                </Box>

                            </Box>


                        </Stack>

                    </Stack>
                </Stack>
            </Container>
        </div>
    )
}