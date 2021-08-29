import Jazzicon from 'react-jazzicon';

const AddressesIdentIcon = ({ account }) => {
  return <Jazzicon diameter={30} seed={parseInt(account.slice(2, 10), 16)}/>;
};

export default AddressesIdentIcon;