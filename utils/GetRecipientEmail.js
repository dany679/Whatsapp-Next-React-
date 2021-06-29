const GetRecipientEmail = (users, userLogin) =>
  users?.filter((userToFilter) => userToFilter !== userLogin?.email)[0];
export default GetRecipientEmail;
