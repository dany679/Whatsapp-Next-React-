import { Avatar, Button } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import * as EmailValidator from 'email-validator';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from '../Chat/Chat';

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection('chats')
    .where('users', 'array-contains', user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const StartChat = () => {
    const input = prompt(
      'Please enter an email address for the user you wish to chat with',
    );
    if (!input) return null;
    //check if user is try to talk to he self
    if (
      EmailValidator.validate(input) &&
      // !chatAlreadyExists &&
      user.email !== input
    ) {
      db.collection('chats').add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (searchEmail) => {
    // !! convert to boolean
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === searchEmail)?.length > 0,
    );
  };
  return (
    <Container>
      <Header>
        <UseAvatar src={user.photoURL} onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder={`Search contact `} />
      </Search>
      <SidebarButton onClick={StartChat}>Start New Chat</SidebarButton>
      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

export default Sidebar;
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;
const SearchInput = styled.input`
  /* outline-width: 0; */
  outline: none;
  border: none;
  flex: 1;
`;
const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-bottom: 1px solid whitesmoke;
    border-top: 1px solid whitesmoke;
  }
`;
const Container = styled.div`
  flex: 0.45;
  min-width: 300px;
  max-width: 350px;
  height: 100vh;
  border-color: 1px solid whitesmoke;
  */ ::-webkit-scrollbar {
    display: none;
  }
  overflow-y: scroll;
  -ms-overflow-style: none; // edge / brave
  scrollbar-width: none; //fiferox
`;

const IconsContainer = styled.div``;

const Header = styled.div`
  background-color: white;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: static;
  top: 0;
  z-index: 0;
  border-top: 1px solid whitesmoke;
  border-bottom: 1px solid whitesmoke;
`;

const UseAvatar = styled(Avatar)`
  cursor: pointer;
  margin-left: 10px;
  :hover {
    opacity: 0.8;
    transition: all ease 0.2s;
  }
`;
