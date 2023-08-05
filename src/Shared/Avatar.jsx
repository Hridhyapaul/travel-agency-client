import useAuth from "../Hooks/useAuth";
import avatarImg from '../assets/Images/placeholder.jpg';

const Avatar = () => {
    const {user} = useAuth();
    return (
        <img src={user && user.photoURL ? user.photoURL : avatarImg} alt="profile" className='h-7 rounded-full' />
    );
};

export default Avatar;