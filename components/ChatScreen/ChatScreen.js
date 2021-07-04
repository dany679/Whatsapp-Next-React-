import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MoreVert } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, db } from '../../firebase';
import Messages from '../Messages/Messages';
import firebase from 'firebase';
import { useRef, useState } from 'react';
import GetRecipientEmail from '../../utils/GetRecipientEmail';
import TimeAgo from 'timeago-react';

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef(null);
  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'asc'),
  );
  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Messages
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Messages key={message.id} user={message.user} message={message} />
      ));
    }
  };
  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection('users').doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    db.collection('chats').doc(router.query.id).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
    setInput('');
    scrollToBottom();
  };
  //get data for how chat with
  const recipientEmail = GetRecipientEmail(chat.users, user);

  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', recipientEmail),
  );
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  return (
    <Container>
      <Header>
        {recipient ? (
          <UseAvatar src={recipient?.photoURL} />
        ) : (
          <UseAvatar src={recipientEmail[0]} />
        )}
        {/* <Avatar /> */}
        <ContactInformation>
          <strong>
            <h3>{recipientEmail}</h3>
          </strong>
          {recipientSnapshot ? (
            <p>
              last seen:{' '}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                'Never'
              )}
            </p>
          ) : (
            <p>On Loading</p>
          )}
        </ContactInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>
      <MessageContainer>
        {showMessages()}
        <EndOfMessages ref={endOfMessagesRef} />
      </MessageContainer>
      <InputContainer>
        <InsertEmoticon />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button
          hidden
          disabled={!input}
          type='submit'
          onClick={sendMessage}
        ></button>
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div``;
const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  flex: 1;
  align-items: center;
  height: 80px;
  padding: 15px;
  border: 1px solid whitesmoke;
`;
const ContactInformation = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: gray;
  }
`;
const HeaderIcons = styled.div``;
const MessageContainer = styled.div`
  background-color: #e5ded5;
  min-height: 90vh;
  padding: 30px;
`;
const EndOfMessages = styled.div``;
const InputContainer = styled.form`
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: white;
  z-index: 100;
`;
const colorInside = '#80808024';
const Input = styled.input`
  background-color: ${colorInside};
  margin-right: 15px;
  margin-left: 15px;
  padding: 20px;
  border: none;
  border-radius: 13px;
  flex: 1;
  align-items: center;
  outline: 0;
`;
const UseAvatar = styled(Avatar)`
  margin-right: 15px;
`;
