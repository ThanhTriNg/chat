import { useContext } from 'react';
import { Avatar, Button, Typography } from 'antd';
import classNames from 'classnames/bind';

import styles from './UserInfo.module.scss';
import { auth } from '../../firebase/config';
import { AuthContext } from '../../Context/AuthProvider';

const cx = classNames.bind(styles);
function UserInfo() {
    const {
        user: { displayName, photoURL },
    } = useContext(AuthContext);
    return (
        <div className={cx('wrapper')}>
            <div>
                {/* <Avatar src={photoURL}> {photoURL ? '' : displayName && displayName.charAt(0).toUpperCase()} </Avatar> */}
                <Avatar src={photoURL}> {photoURL ? '': displayName?.charAt(0)?.toUpperCase()} </Avatar>
                <Typography.Text className={cx('username')}>{displayName}</Typography.Text>
            </div>
            <Button ghost onClick={() => auth.signOut()}>
                Logout
            </Button>
        </div>
    );
}

export default UserInfo;
