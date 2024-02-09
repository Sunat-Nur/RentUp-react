import React from "react";
import {Container, Stack, Box, PaginationItem} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Pagination from "@mui/material/Pagination";

export function Posts() {
    return (
        <div className="owner_post_frame" data-aos="fade-up"
             data-aos-anchor-placement="bottom-bottom">
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
                            <Pagination
                                // count={targetProductsSearchObj.page >= 3 ? targetProductsSearchObj.page + 1 : 3}
                                // page={targetProductsSearchObj.page}
                                renderItem={(item) => (
                                    <PaginationItem components={{
                                        previous: ArrowBackIcon,
                                        next: ArrowForwardIcon,
                                    }} sx={{color: "brown", ml: "200px"}} {...item}
                                    />
                                )}
                                // onChange={handlePaginationChange}
                            />

                        </Stack>

                    </Stack>
                </Stack>
            </Container>
        </div>
    )
}