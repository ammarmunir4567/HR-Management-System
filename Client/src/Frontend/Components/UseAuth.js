import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/Slice/authSlice';

export const UseAuth = () => {
  const auth = useSelector(selectUser);

  if(auth.isLoggedIn!=null){
    return false;
  }
};
