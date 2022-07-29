import React, { useState } from 'react';
import { dbService } from '../RegisterPage/fbase';
import { child, push, ref, set } from 'firebase/database';
import style from './ChatPage.module.css';
import { CgSmile } from 'react-icons/cg';
import { BiRightArrowAlt } from 'react-icons/bi';

function ChatForm() {
  const messagesRef = ref(dbService, "messages");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  // 임시
  const currUser = {
    "id": "JNVe6U0iGlP4A5Pm65UfXgZju0Z2",
    "image": "http://gravatar.com/avatar/ba97c141500abffb0aee54dbcaee59ff?d=identicon",
    "name": "입양희망자"
  };
  const user = {
    "id": "VRHxfEj1c1g0pbsAiYut1x2VzvP2",
    "image": "http://gravatar.com/avatar/0f7c362b0125aaff368169c8acc4dd39?d=identicon",
    "name": "유행사"
  }

  const chatRoomId = getChatRoomId(currUser, user);

  // 랜덤 메시지 id 생성
  function guid() {
    function s4() {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  function getChatRoomId(currUser, user) {
    const currUserId = currUser.id
    const userId = user.id
    return userId < currUserId
      ? `${userId}-${currUserId}`
      : `${currUserId}-${userId}`
  }

  const createMessage = () => {
    const message = {
      messageId: guid(),
      content: content,
      sentUser: {
        id: currUser.id,
        name: currUser.name,
        image: currUser.image
      },
      receivedUser: {
        id: user.id,
        name: user.name,
        image: user.image
      }
    }

    return message;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) {
      setErrors(prev => prev.concat("Type contents first"));
      return;
    }
    setLoading(true);
    try {
      await set(push(child(messagesRef, chatRoomId)), createMessage());
      setLoading(false);
      setContent("");
      setErrors([]);
    } catch (error) {
      setErrors(prev => prev.concat(error.message));
      setLoading(false);
      setTimeout(() => {
        setErrors([]);
      }, 5000)
    }
  }

  return (
    <div className={style.chatForm}>
      <form onSubmit={handleSubmit}>
        <div className={style.inputWrap}>
          <CgSmile size={24}/>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="메시지 입력..."
          />
          {content && <BiRightArrowAlt size={24} onClick={handleSubmit}/>}
        </div>
        <div>
      </div>
      </form>
    </div>
  );
}

export default ChatForm;