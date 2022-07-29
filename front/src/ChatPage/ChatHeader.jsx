import React from 'react';
import style from './ChatPage.module.css';

function ChatHeader({user}) {
  const {id, name, image} = user;

  return (
    <div className={style.headerWrap}>
      <img src={image}/>
      {/* 이름 클릭하면 유행사 디테일 페이지로 넘어감 */}
      <span>{name}</span>
    </div>
  );
}

export default ChatHeader;