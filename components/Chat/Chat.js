import { Avatar } from '@material-ui/core';
import styled from 'styled-components';
import { auth, db } from '../../firebase';
import GetRecipientEmail from '../../utils/GetRecipientEmail';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';
function Chat({ id, users }) {
  const [user] = useAuthState(auth);
  const getRecipientEmail = GetRecipientEmail(users, user);
  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', getRecipientEmail),
  );
  const router = useRouter();
  const EnterChat = () => {
    router.push(`/chat/${id}`);
  };
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  return (
    <Container onClick={EnterChat}>
      {recipient ? (
        <UseAvatar src={recipient?.photoURL} />
      ) : (
        <UseAvatar src={getRecipientEmail[0]} />
      )}
      <p>{getRecipientEmail}</p>
    </Container>
  );
}

export default Chat;
const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  word-break: break-word;
  cursor: pointer;
  :hover {
    background-color: #e9eaeb;
  }
`;
const UseAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
