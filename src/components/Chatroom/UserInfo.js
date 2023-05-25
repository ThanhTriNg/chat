import { useContext } from 'react';
import { Avatar, Button, Typography } from 'antd';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './UserInfo.module.scss';
import { auth } from '../../firebase/config';
import { AuthContext } from '../../Context/AuthProvider';

const cx = classNames.bind(styles);
function UserInfo() {
    const {
        user: { displayName, photoURL },
    } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = async() => {
        await auth.signOut();
        navigate('/login')
    };

    return (
        <div className={cx('wrapper')}>
            <div>
                {/* <Avatar src={photoURL}> {photoURL ? '' : displayName && displayName.charAt(0).toUpperCase()} </Avatar> */}
                <Avatar src={photoURL}> {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()} </Avatar>
                <Typography.Text className={cx('username')}>{displayName}</Typography.Text>
            </div>
            <Button ghost onClick={handleLogout}>
                Logout
            </Button>
        </div>
    );
}

export default UserInfo;
