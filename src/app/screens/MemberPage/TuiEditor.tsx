import React, {useCallback, useRef, useState} from "react";
import {Editor} from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import {BoArticleInput} from "../../../types/boArticle";

import {
    Box, Button, FormControl, MenuItem, Stack, Typography, Select, TextField
} from "@mui/material";
import CommunityApiService from "../../apiSservices/communityApiService";
import {serverApi} from "../../../lib/config";
import assert from "assert";
import {Definer} from "../../../lib/definer";
import {useHistory} from "react-router-dom";
import {sweetTopSmallSuccessAlert} from "../../../lib/sweetAlert";

export const TuiEditor = (props: any) => {
    /** HANDLERS */
    const {setValue, setArticlesRebuild} = props;
    const editorRef = useRef(null);
    const history = useHistory();
    const [communityArticleData, setCommunityArticleData] =
        useState<BoArticleInput>({
            art_subject: "",
            bo_id: "",
            art_content: "",
            art_image: "",
        });
    const events = {
        load: function (param: any) {
        }
    };
    const toolbarItems = [
        ["heading", "bold", "italic", "strike"],
        ["image", "table", "link"],
        ["ul", "ol", "task"],
    ];

    /** HANDLERS */
    const uploadImage = async (image: any) => {
        try {
            const communityService = new CommunityApiService();
            const image_name = await communityService.uploadImageToServer(image);
            communityArticleData.art_image = image_name;
            setCommunityArticleData({...communityArticleData});
            let source: string;
            source = `${serverApi}/${image_name}`;
            return source;
        } catch (err) {
            console.log(`ERROR ::: uploadImage, ${err}`);
        }
    };

    const changeCategoryHandler = useCallback(
        (e: any) => {
            communityArticleData.bo_id = e.target.value;
            setCommunityArticleData({...communityArticleData});
        },
        [communityArticleData.bo_id]
    );

    const changeTitleHandler = (e: any) => {
        communityArticleData.art_subject = e.target.value;
        setCommunityArticleData({...communityArticleData});
    };

    const handleRegisterButton = async () => {
        try {
            console.log("communityArticleData", communityArticleData);
            const editor: any = editorRef.current;
            const art_content = editor?.getInstance().getHTML();
            communityArticleData.art_content = art_content;
            assert.ok(
                communityArticleData.art_content !== "" &&
                communityArticleData.bo_id !== "" &&
                communityArticleData.art_subject !== "",
                Definer.input_err1
            );
            const communityService = new CommunityApiService();
            await communityService.createArticle(communityArticleData);
            await sweetTopSmallSuccessAlert("Article is created successfull");
            setValue("1");
            setArticlesRebuild(new Date());
        } catch (err) {
            console.log(`ERROR ::: handleRegisterButton, ${err}`);
        }
    };

    const addImageHook = {
        addImageBlobHook: async (image: any, callback: any) => {
            const uploadImageURL = await uploadImage(image);
            console.log("upload-image", uploadImageURL);
            callback(uploadImageURL);
            return false;
        },
    };

    return (
        <Stack className={"my_edit_page"}>
            <Stack>
                <Stack
                    className={"edit_page"}
                    direction="row"
                    style={{margin: "40px"}}
                    justifyContent="space-evenly"
                >
                    <Box className={"form_row"} sx={{width: "300px"}}>
                        {/*<Typography style={{color: "rgb(225 255 233)", margin: "10px"}} variant="h3">*/}
                        {/*    Category*/}
                        {/*</Typography>*/}
                        <FormControl sx={{width: "100%", background: "white"}}>
                            <Select
                                value={communityArticleData?.bo_id}
                                displayEmpty
                                inputProps={{"aria-label": "Without label"}}
                                onChange={changeCategoryHandler}
                            >
                                <MenuItem value="">chose category</MenuItem>
                                <MenuItem value={"celebrity"}>Famous</MenuItem>
                                <MenuItem value={"agency"}>Agency</MenuItem>
                                <MenuItem value={"story"}>my story</MenuItem>
                                <MenuItem value={"home"}>property</MenuItem>
                                <MenuItem value={"owner"}>owner post</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box className={"form_row"} style={{width: "300px"}}>
                        {/*<Typography style={{color: "rgb(225 255 233)", margin: "10px"}} variant="h3">*/}
                        {/*    Mavzu*/}
                        {/*</Typography>*/}
                        <TextField
                            id="filled-basic"
                            label="Mavzu"
                            variant="filled"
                            style={{width: "300px", background: "white"}}
                            value={communityArticleData?.art_subject}
                            onChange={changeTitleHandler}
                        />
                    </Box>
                </Stack>
                <Box className={"edit_box"}>
                    <Editor
                        ref={editorRef}
                        initialValue=" "
                        placeholder="Type here"
                        previewStyle="vertical"
                        height="640px"
                        toolbarItems={toolbarItems}
                        hooks={addImageHook}
                        events={events}
                        initialEditType="wysiwyg"
                        usageStatistics={false}
                    />
                </Box>
                <Stack direction="row" justifyContent="center">
                    <Button
                        variant="contained"
                        color="primary"
                        style={{margin: "30px", width: "250px", height: "45px"}}
                        onClick={handleRegisterButton}
                    >
                        Register
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};