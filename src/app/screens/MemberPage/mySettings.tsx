import Button from "@mui/material/Button";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {Box, Stack} from "@mui/system";
import "../../../css/my_page.css";
import React, {useState} from "react";
import {verifiedMemberData} from "../../apiSservices/verify";
import {MemberUpdateData} from "../../../types/user";
import assert from "assert";
import {Definer} from "../../../lib/definer";
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../lib/sweetAlert";
import MemberApiService from "../../apiSservices/memberApiService";


/** REDUX SLICE */


/** REDUX SELECTOR **/

export function MySettings(props: any) {
    /** INITIALIZATIONS */
    const [file, setFile] = useState(verifiedMemberData?.mb_image);
    const [memberUpdate, setMemberUpdate] = useState<MemberUpdateData>({
        mb_nick: "",
        mb_phone: "",
        mb_address: "",
        mb_description: "",
        mb_image: "",
    });

    /** HANDLERS */
    const handleNickChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        memberUpdate.mb_nick = e.target.value;
        setMemberUpdate({...memberUpdate});
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        memberUpdate.mb_phone = e.target.value;
        setMemberUpdate({...memberUpdate});
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        memberUpdate.mb_address = e.target.value;
        setMemberUpdate({...memberUpdate});
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        memberUpdate.mb_description = e.target.value;
        setMemberUpdate({...memberUpdate});
    };

    const handleImageChange = (e: any) => {
        try {
            const file = e.target.files[0];
            const fileType = file["type"],
                validTypes = ["image/jpg", "image/jpeg", "image/png"];
            assert.ok(file && validTypes.includes(fileType), Definer.input_img);
            memberUpdate.mb_image = file;
            setMemberUpdate({...memberUpdate});
            setFile(URL.createObjectURL(file));
        } catch (err) {
            console.log(`ERROR ::: handleImageChange ${err}`);
            sweetErrorHandling(err).then();
        }
    };
    const handleSubmitButton = async () => {
        try {
            const memberService = new MemberApiService();
            const result = await memberService.updateMemberData(memberUpdate);
            assert.ok(result, Definer.general_err1);
            await sweetTopSmallSuccessAlert(
                "Information modified successfully!", 700, false);
            window.location.reload();
        } catch (err) {
            console.log(`ERROR ::: handleSubmitButton ${err}`);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <Stack className={"my_settings"}>
            <Stack className={"my_settings_page"}>
                <Box className={"member_media_frame"}>
                    <img
                        src={file}
                        className={"mb_image"}
                        style={{borderRadius: "50%",}}
                        width={"100px"}
                        height={"100px"}
                    />
                    <div className={"media_change_box"}>
                        <span>Rasm Yuklash</span>
                        <p>JPG, JPEG, PNG rasmlarini yuklay olasiz!</p>
                        <Box className={"up_del_box"}>
                            <Button
                                onChange={handleImageChange}
                                component="label"
                                style={{minWidth: "0", height: "25px"}}
                            >
                                <CloudDownloadIcon/>
                                <input type="file" hidden/>
                            </Button>
                        </Box>
                    </div>
                </Box>
                <Box className={"input_frame"}>
                    <div className={"long_input"}>
                        <label className={"spec_label"}>Ism</label>
                        <input
                            onChange={handleNickChange}
                            className={"spec_input_mb_nick"}
                            type={"text"}
                            placeholder={verifiedMemberData?.mb_nick}
                            name="mb_nick"
                        />
                    </div>
                </Box>
                <Box className={"input_frame"}>
                    <div className={"short_input"}>
                        <label className={"spec_label"}>Telefon Raqam</label>
                        <input
                            onChange={handlePhoneChange}
                            className={"spec_input_mb_phone"}
                            type={"text"}
                            placeholder={verifiedMemberData?.mb_phone}
                            name="mb_phone"
                        />
                    </div>
                    <div className={"short_input"}>
                        <label className={"spec_label"}>Manzil</label>
                        <input
                            onChange={handleAddressChange}
                            className={"spec_input_mb_address"}
                            type={"text"}
                            placeholder={verifiedMemberData?.mb_address ?? "not have"}
                            name="mb_address"
                        />
                    </div>
                </Box>
                <Box className={"input_frame"}>
                    <div className={"long_input"}>
                        <label className={"spec_label"}>Ma'lumot</label>
                        <textarea
                            onChange={handleDescriptionChange}
                            className={"spec_textarea_mb_description"}
                            placeholder={verifiedMemberData?.mb_description ?? "not have"}
                            name="mb_description"
                        />
                    </div>
                </Box>
                <Box
                    display={"flex"}
                    justifyContent={"flex-end"}
                    sx={{mt: "25px"}}
                    onClick={handleSubmitButton}
                >
                    <Button variant={"contained"}>save</Button>
                </Box>
            </Stack>
        </Stack>
    );
}