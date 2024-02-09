import React from "react";
import {Box, Link, Stack} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import {BoArticle} from "../../../types/boArticle";
import {serverApi} from "../../../lib/config";
import Checkbox from "@mui/material/Checkbox";
import {Favorite} from "@mui/icons-material";
import {Definer} from "../../../lib/definer";
import assert from "assert";
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../lib/sweetAlert";
import MemberApiService from "../../apiSservices/memberApiService";
import {verifiedMemberData} from "../../apiSservices/verify";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


export function TargetArticles(props: any) {
    const {setArticlesRebuild} = props;

    /** HANDLERS **/
    const targetLikeHandler = async (e: any) => {
        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);
            const memberService = new MemberApiService();
            const like_result = await memberService.memberLikeTarget({
                like_ref_id: e.target.id,
                group_type: "community"
            });
            assert.ok(like_result, Definer.general_err1);
            await sweetTopSmallSuccessAlert("success", 700, false);
            setArticlesRebuild(new Date);
        } catch (err: any) {
            console.log(err);
            sweetErrorHandling(err).then();
        }
    };


    return (
        <div data-aos="zoom-in">
            <Stack className={"article_box"} sx={{flexDirection: "row"}}>
                {props.targetBoArticles?.map((article: BoArticle) => {
                    const art_image_url = article?.art_image
                        ? `${serverApi}/${article?.art_image}`
                        : "/auth/default_user.svg";
                    const userImage = article?.member_data?.mb_image
                        ? `${serverApi}/${article?.member_data?.mb_image}`
                        : "/auth/odamcha.svg";

                    console.log("mb_image", userImage);

                    return (
                        <Link
                            key={article?._id}
                            // className="all_article_box"
                            href={`/member-page/other?mb_id=${article?.mb_id}&art_id=${article?._id}`}
                        >
                            <Card
                                sx={{
                                    width: "350px",
                                    height: "420px",
                                    borderRadius: "15px",
                                    marginLeft: "20px",
                                    marginBottom: "30px",
                                    marginRight: "20px",
                                }}
                            >
                                <CardHeader className={"article_user_name"}
                                            avatar={
                                                <Avatar className={"img_avatar"} aria-label="recipe">
                                                    <img
                                                        src={userImage}
                                                    />
                                                </Avatar>
                                            }
                                            title={article?.member_data.mb_nick}
                                />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    sx={{backgroundImage: `url(${art_image_url})`}}
                                />
                                <CardContent sx={{marginBottom: "1px"}}>
                                    <Typography variant="body2" color="#000" sx={{fontFamily: "sans-serif"}}>
                                        {article?.art_subject} nice place form central city. close to parking and
                                        shoppingMall
                                    </Typography>
                                </CardContent>

                                <CardActions disableSpacing sx={{marginTop: "1px"}}>
                                    <IconButton aria-label="add to favorites">
                                        <Checkbox
                                            onChange={targetLikeHandler}
                                            icon={<FavoriteBorder/>}

                                            checkedIcon={<Favorite style={{fill: "red"}}/>}
                                            id={article?._id}
                                            checked={
                                                article?.me_liked && article?.me_liked[0]?.my_favorite
                                                    ? true
                                                    : false
                                            }
                                        />
                                        <span className="like_cont">{article?.art_likes}</span>
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <Box className="eye_icon" onClick={(e) => e.stopPropagation()}>
                                            <RemoveRedEyeIcon/>
                                        </Box>
                                        <span className="view_cont">{article?.art_views}</span>
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Link>
                    );
                })}
            </Stack>
        </div>
    );
}