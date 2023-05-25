import { Avatar, Typography } from 'antd';
import styles from './Message.module.scss';
import classNames from 'classnames/bind';
import { formatRelative } from 'date-fns/esm';

const cx = classNames.bind(styles);

function formatDate(seconds) {
    let formattedDate = '';
    if (seconds) {
        formattedDate = formatRelative(new Date(seconds * 1000), new Date());
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
}
function Message({ text, displayName, createAt, photoURL }) {
    console.log(createAt)
    console.log((createAt && formatDate(createAt.seconds)))
    return (
        <div className={cx('wrapper')}>
            <div>
                <Avatar size="small" src={photoURL}>
                    {photoURL ? '' : displayName.charAt(0).toUpperCase()}
                </Avatar>
                <Typography.Text className={cx('author')}>{displayName} </Typography.Text>
                <Typography.Text className={cx('date')}> {formatDate(createAt && createAt.seconds)} </Typography.Text>
            </div>

            <div>
                <Typography.Text className={cx('content')}>{text} </Typography.Text>
            </div>
        </div>
    );
}

export default Message;
