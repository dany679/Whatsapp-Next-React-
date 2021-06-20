import { Avatar } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';

function Sidebar() {
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
    </Container>
  );
}

export default Sidebar;

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
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;
const SearchInput = styled.input``;
const IconsContainer = styled.div``;
const UseAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
    transition: all ease 0.2s;
  }
`;
