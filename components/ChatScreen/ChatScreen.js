import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, MoreVert } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { auth, db } from '../../firebase';
import Messages from '../Messages/Messages';

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
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
    }
  };
  return (
    <Container>
      <Header>
        <Avatar />
        <ContactInformation>
          <strong>name</strong>
          <p>last seen..</p>
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
        <EndOfMessages />
      </MessageContainer>
      <InputContainer>
        <InsertEmoticon />
        <Input />
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
const MessageContainer = styled.div``;
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
