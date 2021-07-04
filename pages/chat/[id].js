import Head from 'next/head';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import ChatScreen from '../../components/ChatScreen/ChatScreen';
import { auth, db } from '../../firebase';
import GetRecipientEmail from '../../utils/GetRecipientEmail';
import { useAuthState } from 'react-firebase-hooks/auth';

function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);
  return (
    <Container>
      <Head>
        <title>chat with {GetRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
        {/* {GetRecipientEmail()} */}
      </ChatContainer>
    </Container>
  );
}

export default Chat;
//server working

export async function getServerSideProps(context) {
  const ref = db.collection('chats').doc(context.query.id);
  const messagesRes = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));
  //chat
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };
  return {
    props: {
      messages: JSON.stringify(messages),
      chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /*ie edge*/
  scrollbar-width: none; /*firefox*/
`;
