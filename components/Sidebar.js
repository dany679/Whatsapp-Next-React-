import { Avatar, Button } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import * as EmailValidator from 'email-validator';

function Sidebar() {
  const StartChat = () => {
    const input = prompt(
      'Please enter an email address for the user you wish to chat with',
    );
    if (!input) return null;
    if (EmailValidator.validate(input)) {
      //search db
    }
  };
  return (
    <Container>
      <Header>
        <UseAvatar />

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
const IconsContainer = styled.div``;

const Container = styled.div``;
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
  :hover {
    opacity: 0.8;
    transition: all ease 0.2s;
  }
`;
