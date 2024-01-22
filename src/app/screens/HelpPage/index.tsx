import React, {useState} from "react";
import {Container, Box, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import AccordionDetails from "@mui/material/AccordionDetails"
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "../../../css/help.css";


export function HelpPage() {
    const [value, setValue] = useState("1");

    const faq = [
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
        {
            question: "the more obscure Latin words, consectetu?",
            answer: "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,"
        },
    ];

    const rules = [
        `It is a long established fact that a reader will be
         distracted by the readable content of a page when.`,
        `Looking at its layout. The point of using Lorem Ipsum 
         is that it has a more-or-less normal distribution.`,
        `ofletters, as opposed to using 'Content here, content 
         here', making it look like readable English. Many desktop.`,
        `publishing packages and web page editors now use Lorem 
         Ipsum as their default model text, and a search for 'lorem.`,
        `ipsum' will uncover many web sites still in 
         their infancy. Various versions have evolved over the years,`,
        `sometimes by accident, sometimes on purpose (injected humour 
         publishing packages and web page editors now use Lorem).`,
    ];

// HANDLERS

    const handleChange = (event: any, newValue: string) => {
        setValue(newValue);

    };

    return (
        <div className={"help_page"}>
            <Container maxWidth="lg" sx={{mt: "50px", mb: "50px"}}>
                <TabContext value={value}>
                    <Box className={"help_menu"}>
                        <Box sx={{borderBottom: 1, borderColor: "#ffffff"}}>
                            <TabList
                                // value={value}
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                style={{display: "flex", justifyContent: "space-between", marginBottom: "15px"}}
                            >
                                <Tab label="Qoidalar" value={"1"}/>
                                <Tab label="FAQ" value={"2"}/>
                                <Tab label="Adminga xat" value={"3"}/>
                            </TabList>
                        </Box>
                    </Box>
                    <Stack>
                        <Stack className={"help_main_content"}>
                            <TabPanel value="1">
                                <Stack className={"theRules_box"}>
                                    <Box className={"theRulesFrame"}>
                                        {rules.map((ele) => {
                                            return <p>{ele}</p>;

                                        })}
                                    </Box>
                                </Stack>
                            </TabPanel>
                            <TabPanel value={"2"}>
                                <Stack className={"accordian_menu"}>
                                    {faq.map((ele) => {
                                        return (
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon/>}
                                                    aria-controls="panella-content"
                                                    id="panella-header"
                                                >
                                                    <Typography
                                                        style={{
                                                            color: "#172B4D",
                                                            fontSize: "18px",
                                                            lineHeight: "120%"
                                                        }}
                                                    >
                                                        {ele.question}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography
                                                        style={{
                                                            color: "#616164",
                                                            fontSize: "18px",
                                                            lineHeight: "140%"
                                                        }}
                                                    >{ele.answer}</Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        );
                                    })}
                                </Stack>
                            </TabPanel>
                            <TabPanel value={"3"}>
                                <Stack className={"admin_letter_box"}>
                                    <Stack className={"admin_letter_frame"}>
                                        <Box className={"admin letter_frame"}>
                                            <span>Adminga Xabar Qoldirish</span>
                                            <p>
                                                Assalom Aleykum! Adminga xabar qolidirish uchun formani iltimos
                                                to'ldiring
                                            </p>
                                        </Box>
                                        <form
                                            action={"#"}
                                            method={"POST"}
                                            className={"admin_letter_frame"}
                                        >
                                            <div className={"admin_input_box"}>
                                                <label>Ism</label>
                                                <input
                                                    type={"text"}
                                                    name={"mb_nick"}
                                                    placeholder={"Ism"}
                                                />
                                            </div>
                                            <div className={"admin_input_box"}>
                                                <label>@_gmail</label>
                                                <input
                                                    type={"text"}
                                                    name={"mb_email"}
                                                    placeholder={"Elektron Manzil"}
                                                />
                                            </div>
                                            <div className={"admin_input_box"}>
                                                <label>Xabar</label>
                                                <textarea
                                                    name={"mb_msg"}
                                                    placeholder={"xabar"}
                                                ></textarea>
                                            </div>
                                            <Box
                                                display={"flex"}
                                                justifyContent={"flex-end"}
                                                sx={{mt: "30px"}}
                                            >
                                                <Button type={"submit"} variant="contained"
                                                        style={{borderRadius: "20px"}}>
                                                    Jo'natish
                                                </Button>
                                            </Box>
                                        </form>
                                    </Stack>
                                </Stack>
                            </TabPanel>
                        </Stack>
                    </Stack>
                </TabContext>
            </Container>
        </div>
    );
}