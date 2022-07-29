import React,{ useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { Input } from 'antd';
import { storageService } from '../RegisterPage/fbase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
//이미지 및 아이콘
import { IoCloseSharp } from "react-icons/io5"
import UploadImg from '../RegisterPage/UploadImg';
let index = 0;

const RegisterModal = ({ isOpen, onCancel}) => {
    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const [historyContent, setHistoryContent] = useState("");
    const { TextArea } = Input;

    const uploadImage = (img) => {
        setImage(img);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        let imgUrl = "";

        if (image !== "") {
            const fileRef = ref(storageService, `images/${++index}/`);
            const uploadFile = await uploadString(fileRef, image, "data_url");
            imgUrl = await getDownloadURL(uploadFile.ref);
        }
        console.log("게시물 사진: ",imgUrl, "게시물 내용: ",historyContent);
        // const res = await axios({
        //     headers: {
        //         withCredentials: true,
        //         "Access-Control-Allow-Origin": "http://localhost:3000",
        //         'Accept': 'application/json',
        //     },
        //     method: 'post',
        //     url: 'http://hana-umc.shop:8080/new',
        //     data: {
        //         imgUrl: imgUrl,
        //         content: historyContent
        //     }
        // })
        // if (res.data) {
        //     alert('Added Data');
        // }
        setHistoryContent("");
        onCancel();
    }

  const handleClickCancel = () => {
    onCancel();
  };

  return (
    <ModalStyleContainer>
      <ReactModal isOpen={isOpen} style={customStyles}
      >
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor:'#FBC22E', position: 'relative', top:'-20px', left:'-20px', width: '105%',padding:'30px'}}>
                <TitleBanner>히스토리 추가</TitleBanner> 
                <button onClick={handleClickCancel} style={{border:'none', background:'none'}}><IoCloseSharp/></button>
              </div>
                <form onSubmit={onSubmit} style={{display:"flex",justifyContent:"space-between"}}>
                    <RegisterPhoto>
                        <UploadStyle>
                            <UploadImg uploadImage={uploadImage} />
                        </UploadStyle>
                    </RegisterPhoto>
                    <TextArea rows={4} value={historyContent} onChange={(e) => setHistoryContent(e.target.value)} style={{width:"500px", marginLeft:"50px", marginTop:"20px",}} placeholder="추억을 작성해주세요!"/>
                    <SubmitButton type="submit" value="작성 완료" />
                </form>
        </div>
      </ReactModal>
    </ModalStyleContainer>
  );
};


const ModalStyleContainer= styled.div`
`;

const TitleBanner= styled.div`
  background-color:#FBC22E;
  color:white;
  font-family: 'SpoqaHanSansNeo-Bold';
  font-weight: 700;
`;

const RegisterPhoto=styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    border-right: 1px solid #969696;
`;

const UploadStyle=styled.div`
    padding:150px;

`;

const customStyles = {
  overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0, 0.75)'
    },
  content: {
    top: '28%',
    left: '50%',
    width: '75%',
    height: '700px',
    transform: 'translate(-48%, -25%)',
  },
};

const SubmitButton=styled.input`    
    position: absolute;
    left:50%;
    top: 110%;
    transform:translate(-50%, 0);
    background-color: #FBC22E;
    text-align: center;
    border-radius: 10px;
    color: #fff;
    width: 500px;
    height: 40px;
    border: none;
    margin-top: 16px;
    font-weight: 500;
    cursor: pointer;
`;

export default RegisterModal;