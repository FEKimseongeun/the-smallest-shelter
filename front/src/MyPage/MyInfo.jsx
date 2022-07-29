//개인정보 패널 컴포넌트
import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import user1 from '../assets/img/ProfileImg/Ellipse 67.png';
import axios from "axios";

function MyInfo(){
    return(
        <>
            <MyInfoTitle>개인정보</MyInfoTitle>
            <MyInfoProfile>
                <ProfileTitle>프로필 사진</ProfileTitle>
                <ProfileImg src={user1}></ProfileImg>
            </MyInfoProfile>
            <MyInfoDetail>
                <ProfileTitle>개인 상세정보</ProfileTitle>
                <DetailInfo>
                    <ListItem>
                        <div>이름</div>
                        <div>전화번호</div>
                        <div>주소</div>
                    </ListItem>
                    <ListUserInfo>
                        <div>2000.00.00</div>
                        <div>010-0000-0000</div>
                        <div>경기도 ##시 ##구 ##로 189</div>
                    </ListUserInfo>
                </DetailInfo>
            </MyInfoDetail>
        </>
    );
}

const MyInfoTitle= styled.div`
    font-weight:bold;
    padding: 10px 5px 20px 20px;
    border-bottom:1px solid white;
    font-size:15px;
`;

const MyInfoProfile= styled.div`
    display:flex;
    padding: 20px;
    border-bottom:1px solid white;
`;


const ProfileTitle= styled.div`
  font-weight:bold;
  font-size:15px;
`;


const ProfileImg= styled.img`
    width: 150px;
    margin:15px 0px 0px 150px;
`;

const MyInfoDetail= styled.div`
    padding: 20px;
    display:flex;
`;

const DetailInfo= styled.div`
    display:flex;
    margin-left:150px;
    margin-top:10px;
`;

const ListItem= styled.div`
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    height:180px;
    font-weight:bold;
`;

const ListUserInfo= styled.div`
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    height:180px;
    font-weight:bold;
    margin-left:50px;
`;


export default MyInfo;