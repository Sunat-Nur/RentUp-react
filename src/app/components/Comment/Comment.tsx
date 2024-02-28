
import {useRef, useState} from "react";
import {Box, Checkbox, Container, Rating, Stack, TextField,} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import {FaStar} from "react-icons/fa";
import {verifiedMemberData} from "../../apiSservices/verify";
import {useSelector} from "react-redux";
import {Definer} from "../../../lib/definer";
import assert from "assert";
import CommentApiService from "../../apiSservices/commentApiService";
import {sweetErrorHandling, sweetTopSmallSuccessAlert} from "../../../lib/sweetAlert";
import MemberApiService from "../../apiSservices/memberApiService";
import dayjs from "dayjs";
import "./comment.css";
import "dayjs/locale/en";
import relativeTime from "dayjs/plugin/relativeTime";
import {HiArrowSmLeft} from "react-icons/hi";
import {PrDetailRetriever} from "../../screens/ProductPage/userComment";
import {Favorite, FavoriteBorder} from "@mui/icons-material";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
};
const CommentExampleComment = (props: any) => {
    dayjs.locale("en");
    dayjs.extend(relativeTime);
    const [isFormOpen, setIsFormOpen] = useState<Boolean>(false);
    const [hasReplies, setHasReplies] = useState<Boolean>(false);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0);
    const [commentContent, setCommentContent] = useState<string>("");
    const label = {inputProps: {"aria-label": "Checkbox demo"}};
    const refs: any = useRef([]);
    const [replyInput, setReplyInput] = useState<string>("");
    const [openReplyFormForCommentId, setOpenReplyFormForCommentId] =
        useState<string>("");
    const [openRepliesForCommentId, setOpenRepliesForCommentId] =
        useState<string>("");
    const {comments} = useSelector(PrDetailRetriever);

    const handleClick = (value: any) => {
        setCurrentValue(value);
    };

    const handleMouseOver = (newHoverValue: any) => {
        setHoverValue(newHoverValue);
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined);
    };

    const formInputHandler = () => {
        setIsFormOpen(!isFormOpen);
    };

    const replyDivHandler = () => {
        setHasReplies(!hasReplies);
    };
    const createComment = async (e: any) => {
        e.preventDefault();

        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);
            const isFormValid = commentContent.length > 0;
            assert.ok(isFormValid, Definer.general_err2);
            const comment_data = {
                comment_ref_id: props?.id,
                comment_group: "product",
                comment_content: commentContent,
                comment_stars: currentValue,
                comment_owner: verifiedMemberData,
            };

            const commentService = new CommentApiService();
            await commentService.createCommentRequest(comment_data);
            await sweetTopSmallSuccessAlert("success", 700, false);
            props.setProductRebuild(new Date());
            setCommentContent("");
            setCurrentValue(0);
        } catch (err: any) {
            console.log("Error: signupHandler", err);
            setCommentContent("");
            setCurrentValue(0);
            sweetErrorHandling(err).then();
        }
    };

    const commentLikeHandler = async (e: any) => {
        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);
            const memberService = new MemberApiService(),
                like_result: any = await memberService.memberLikeTarget({
                    like_ref_id: e.target.id,
                    group_type: "comment",
                });
            console.log("like_result", like_result);
            assert.ok(like_result, Definer.general_err1);
            await sweetTopSmallSuccessAlert("success", 700, false);
            props.setProductRebuild(new Date());
        } catch (err: any) {
            console.log("targetLikeTopStore, ERROR:", err);
            sweetErrorHandling(err).then();
        }
    };

    const replyToComment = async (e: any, id: string) => {
        e.preventDefault();
        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);
            const isReplyFormValid = replyInput.length > 0;
            assert.ok(isReplyFormValid, Definer.general_err2);

            const reply_data = {
                reply_comment_id: id,
                reply_content: replyInput,
                reply_owner: verifiedMemberData,
            };

            const commentService = new CommentApiService();
            await commentService.replyToSpecificComment(reply_data);
            await sweetTopSmallSuccessAlert("success", 700, false);
            props.setProductRebuild(new Date());
            setReplyInput("");
            setIsFormOpen(!isFormOpen);
            setHasReplies(!hasReplies);
            setOpenRepliesForCommentId(id);
        } catch (err: any) {
            console.log("Error: ", err);
            sweetErrorHandling(err).then();
        }
    };
    let userHasCommented;

    return (
        <Container className="product_comments">
            <Stack
                style={{
                    fontSize: "20px",
                    textAlign: "center",
                    marginBottom: "2rem",
                }}
            >
                Customer Opinions On The Product
            </Stack>
            {comments ? (
                <div className="comment_cover">
                    {comments?.map((comment: any) => {
                        const image_url = comment?.comment_owner
                            ? `${comment?.comment_owner?.mb_image}`
                            : "/auth/odamcha.svg";
                        const formattedCreatedAt = dayjs(comment?.createdAt).fromNow();

                        userHasCommented = comments?.some(
                            (comment: any) =>
                                comment?.comment_owner?._id === verifiedMemberData?._id
                        );
                        return (
                            <>
                                <Box className={"flex justify-between w-3/4 items-center"} >
                                    <Box
                                        className={"comment_owner font-sans gap-3 w-[240px]"}
                                        key={comment?._id}
                                        sx={{ marginBottom: "10px"}}
                                    >
                                        <div className="comment_img ">
                                            <img src={image_url} alt=""/>
                                        </div>
                                        <div className="comment_auth">
                                            {comment?.comment_owner?.mb_nick}
                                        </div>
                                        <div
                                            className="comment_time text-sm"
                                            style={{color: "#aaa"}}
                                        >
                                            {formattedCreatedAt}
                                        </div>
                                    </Box>
                                    <Rating name="read-only" value={comment?.stars} readOnly/>
                                </Box>
                                <Box className="comment_content">
                                    <div className="content_like">
                                        <p className="comment_detail text-black">
                                            {comment?.comment_content}
                                        </p>

                                        <Checkbox
                                            {...label}
                                            icon={<FavoriteBorder style={{color: "gray"}}/>}
                                            id={comment?._id}
                                            onClick={commentLikeHandler}
                                            checkedIcon={<Favorite style={{color: "red"}}/>}
                                            checked={
                                                comment?.me_liked && comment?.me_liked[0]?.my_favorite
                                                    ? true
                                                    : false
                                            }
                                        />
                                    </div>
                                    <div className="comment_reply">
                                        <div style={{display: "flex", color: "#aaa"}}>
                                            <div
                                                ref={(element) =>
                                                    (refs.current[comment?._id] = element)
                                                }
                                                className="likes"
                                            >
                                                {comment?.comment_likes}
                                            </div>
                                            <span style={{marginLeft: "15px"}}>{"likes"}</span>
                                        </div>
                                        <div
                                            className="reply_btn"
                                            style={{color: "#aaa"}}
                                            onClick={formInputHandler}
                                        >
                                            <div
                                                className="reply_btn text-sm"
                                                onClick={() =>
                                                    setOpenReplyFormForCommentId(comment?._id)
                                                }
                                            >
                                                <ReplyIcon className="w-[18px]"/> <span>reply</span>
                                            </div>
                                        </div>
                                    </div>
                                    {isFormOpen && openReplyFormForCommentId === comment?._id ? (
                                        <Box className="reply_form">
                                            <input
                                                required
                                                value={replyInput}
                                                onChange={(e) => setReplyInput(e.target.value)}
                                                type="text"
                                                placeholder="reply..."
                                            />
                                            <div className="reply_button">
                                                <button
                                                    onClick={(e) => replyToComment(e, comment?._id)}
                                                    type="button"
                                                >
                                                    <HiArrowSmLeft/>
                                                </button>
                                            </div>
                                        </Box>
                                    ) : null}
                                    <div className="replied_data" style={{marginLeft: "3rem"}}>
                                        <div
                                            onClick={replyDivHandler}
                                            className="view_reply"
                                            style={{color: "#aaa"}}
                                        >
                                            {comment?.comment_replies &&
                                                comment?.comment_replies?.length > 0 && (
                                                    <span
                                                        onClick={() => setOpenRepliesForCommentId(comment?._id)}
                                                        className="flex gap-2"
                                                    >
                                                        <span>view</span>
                                                        {comment?.comment_replies?.length}
                                                        <span>more{comment?.comment_replies?.length > 1 ? " replies" : " reply"}</span>
                                                    </span>
                                                )}
                                        </div>
                                        {hasReplies && openRepliesForCommentId === comment?._id ? (
                                            <div className="comment_cover" style={{width: "500px"}}>
                                                {comment?.comment_replies?.map((reply: any) => {
                                                    const reply_image = reply?.reply_owner?.mb_image
                                                        ? reply?.reply_owner?.mb_image
                                                        : "/auth/default_user.svg";

                                                    const formattedCreatedAt = dayjs(
                                                        reply?.createdAt
                                                    ).format("YYYY-MM-DD HH:mm");

                                                    return (
                                                        <div>
                                                            <Box className={"comment_owner gap-3 w-[240px]"}>
                                                                <div className="comment_img">
                                                                    <img src={reply_image} alt=""/>
                                                                </div>
                                                                <div className="comment_auth">
                                                                    {reply?.reply_owner?.mb_nick}
                                                                </div>
                                                                <div
                                                                    className="comment_time text-sm"
                                                                    style={{color: "#aaa"}}
                                                                >
                                                                    {formattedCreatedAt}
                                                                </div>
                                                            </Box>
                                                            <Box className="comment_content   ">
                                                                <h3 className="comment_detail font-thin text-sm text-black mx-4 my-2">
                                                                    {reply?.reply_content}
                                                                </h3>
                                                            </Box>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : null}
                                    </div>
                                </Box>
                            </>
                        );
                    })}
                </div>
            ) : (
                <h2>Write the first comment and evaluate the product!</h2>
            )}

            <Box className="create_comment p-4">
                <Box className={"comment_actions"}>
                    <form className="comment_form p-2 w-full">
                        <TextField
                            className=" outline-none w-full border-b-2 border-black"
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            id="standard-basic"
                            label="Comment"
                            variant="standard"
                            sx={{ marginLeft: "320px", marginBottom: "50px"}}
                        />
                    </form>
                    {!userHasCommented ? (
                        <div className="rate_product my-4">
                            <h4> Rate product</h4>
                            <div style={{display: "flex", flexDirection: "row"}}>
                                {stars.map((_, index) => {
                                    return (
                                        <FaStar
                                            key={index}
                                            size={16}
                                            onClick={() => handleClick(index + 1)}
                                            onMouseOver={() => handleMouseOver(index + 1)}
                                            onMouseLeave={handleMouseLeave}
                                            color={
                                                (hoverValue || currentValue) > index
                                                    ? colors.orange
                                                    : colors.grey
                                            }
                                            style={{
                                                marginRight: 10,
                                                cursor: "pointer",
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ) : null}

                    <div className="action_btn">
                        <button onClick={createComment} className="comment_btn">
                            Send Comment
                        </button>
                    </div>
                </Box>
            </Box>
        </Container>
    );
};

export default CommentExampleComment;
