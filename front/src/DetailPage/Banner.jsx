import React, { Component, useState } from 'react'
import axios from "axios";
import styled from "styled-components";
import { AiOutlineStar, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiMail } from 'react-icons/fi';
import { Checkbox } from 'antd';
import 'antd/dist/antd.css';
import {
    MuiThemeProvider,
    createMuiTheme
  } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Like from "./Like";
import SuccessMark from "../assets/img/SuccessMark.png";
import { Link } from 'react-router-dom';

function Banner({ imgUrl, name, age, gender, species, likedItems, setLikedItems }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [adopt,setAdopt] = useState(false);
    const [isAdoptSuccess, setIsAdoptSuccess] = useState(true);
    const [isOrganization, setIsOrganization] = useState(true);
    const [bookmark, setBookmark] = useState(false);

    const handleBookmark = () => {
        setBookmark(!bookmark);
    };

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
      };

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const theme2 = createMuiTheme({
        overrides: {
          MuiPopover: {
            root: {
            },
            paper: {
                padding:"20px",
                borderRadius:"20px",
                height:"120px",
                border:"1px solid #D2D2D2",
            
            }
          }
        }
      });
        return (
            <RootBanner>
                <DetailTitle>동물 상세 정보</DetailTitle>
                <ContainerBanner>
                    <Profile>
                        <ProfileImg src="https://mblogthumb-phinf.pstatic.net/MjAyMTAxMTRfOTgg/MDAxNjEwNjE0MDg3ODcy.28hxXvxgn2WbHgG7ZiL64bxAiizC3JBZwKCRP-8PcQIg.EDx8izDu_pCfgLBg7F15z7yARZfsEpvk15sX3INo8ZEg.JPEG.brteddy/IMG_0343.jpg?type=w800"/>
                        <PetInfo>
                            <PetName> 길동이 / <button onClick={handleClick} style={{background:"none", border:"none", fontWeight:"700",}}>&nbsp;유행사</button>
                            <MuiThemeProvider theme={theme2}>
                                <Popover
                                    id="popover-with-anchor"
                                    open={Boolean(anchorEl)}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center"
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "center"
                                    }}
                                >
                                    <GroupTitle>단체명</GroupTitle>
                                    <GroupInfo>서울특별시 종로구 종로13길 134</GroupInfo>
                                    <GroupInfo>02-554-3349</GroupInfo>
                                </Popover>
                            </MuiThemeProvider>
                            </PetName>
                            
                            <PetParagraph>
                                <InfoParagraph>
                                    <InfoItem1>
                                        동물종류
                                    </InfoItem1>
                                    <InfoItem1>
                                        성별
                                    </InfoItem1>
                                    <InfoItem1>
                                        나이
                                    </InfoItem1>
                                    {
                                        isOrganization==true
                                        ? <div style={{marginTop:"19px"}}><Checkbox onChange={onChange}></Checkbox></div>
                                        : null
                                    }
                                </InfoParagraph>
                                <InfoParagraph>
                                    <InfoItem2>
                                        고양이
                                    </InfoItem2>
                                    <InfoItem2>
                                        여
                                    </InfoItem2>
                                    <InfoItem2>
                                        2살
                                    </InfoItem2>
                                    {
                                        isOrganization==true
                                        ? <InfoItem2>입양 상태</InfoItem2>
                                        : null
                                    }
                                </InfoParagraph>
                            </PetParagraph>
                        </PetInfo>
                    </Profile>
                    <ProfileIcon>
                        <IconSet>
                            {
                                isOrganization==false
                                ? null
                                : <>
                                    <Link to="/chat"><FiMail size="22" style={{marginLeft:"22px"}}/></Link>
                                </>
                            }
                        </IconSet>     
                        {
                            isAdoptSuccess==true
                            ? <img src={SuccessMark} style={{width:"150px"}}/>
                            : null
                        }
                    </ProfileIcon>
                </ContainerBanner>
            </RootBanner>
        )
}

const RootBanner=styled.section`
    width: 100%;
    height: 460px;
    background: #FBC22E;
    font-family: 'Spoqa Han Sans Neo';
    padding: 5px 0px;

`;

const ContainerBanner=styled.div`
    display:flex;
    justify-content:space-between;
    align-content:center;
    width: 100%;
    height: 82%;
    background-color:#ffffff;
    padding: 40px 100px;
`

const Profile= styled.div`
    display:flex;  

`;

const DetailTitle=styled.h3`
    font-weight: 700;
    margin :25px 100px;
    color: white;
    
`;

const ProfileImg= styled.img `
    object-fit: cover;
    border-radius: 10px;
    padding-top: 7px;
    width:275px; 
    height:275px;
`;

const PetInfo=styled.div`
    margin-left: 50px;
`;

const PetName=styled.h1`
    font-weight: 900;
    display:flex;
`;

const GroupTitle=styled.div`
    color:#FBC22E;
    font-weight: 700;
`;

const GroupInfo=styled.div`
    margin-top:3px;
    color:#333333 ;
    font-size:12px;
    font-weight: 700;
`;

const PetParagraph=styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
`

const InfoParagraph=styled.p`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:left;
`;

const InfoItem1=styled.h5`
    margin-top:20px;
`

const InfoItem2=styled.div`
    margin-top:23px;
    font-weight:700;
    font-size:13px;
`
const ProfileIcon=styled.div`
    display:flex;
    flex-wrap:wrap;
    flex-direction:column;
    justify-content:space-between;
    align-items:flex-end;

`;

const IconSet=styled.div`
    display:flex;
`;

export default Banner

