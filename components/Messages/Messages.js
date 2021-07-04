import styled from 'styled-components';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import moment from 'moment';

function Messages({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);
  const TypeOfUser = user === userLoggedIn?.email ? Sender : Receiver;
  return (
    <Container>
      <TypeOfUser>
        {message.message}
        <Timestamp>
          {message.timestamp ? moment(message.timestamp).format('LT') : '..'}
        </Timestamp>
      </TypeOfUser>
    </Container>
  );
}

export default Messages;

const Container = styled.div``;
const MARGIN = '10px';
const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 13px;
  margin: ${MARGIN};
  padding-bottom: 20px;
  position: relative;
  text-align: right;
  min-width: 60px;
`;
const Receiver = styled(MessageElement)`
  text-align: left;
  background-color: whitesmoke;
`;
const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`;
const Timestamp = styled.span`
  font-size: 9px;
  color: gray;
  padding: 5px;
  text-align: right;
  position: absolute;
  right: 0;
  bottom: 0;
  margin-right: ${MARGIN};
`;
