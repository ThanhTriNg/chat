import { Avatar, Button, Tooltip, Form, Input, Alert, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import styles from './ChatWindow.module.scss';
import classNames from 'classnames/bind';
import Message from './Message';
import './ChatWindow.scss';
import { useContext, useMemo, useState } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../../firebase/services';
import { AuthContext } from '../../Context/AuthProvider';
import { useForm } from 'antd/lib/form/Form';
import useFirestore from '../../hooks/useFirestore';
const cx = classNames.bind(styles);

function ChatWindow() {
    const { selectRoom, members, setIsInviteMemberVisible } = useContext(AppContext);
    const {
        user: { uid, photoURL, displayName },
    } = useContext(AuthContext);
    const [inputValue, setInputValue] = useState('');
    const [form] = Form.useForm();
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleOnSubmit = () => {
        addDocument('message', {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectRoom.id,
            displayName,
        });

        form.resetFields(['message']);
    };

    const conditionMessage = useMemo(
        () => ({
            fieldName: 'roomId',
            operator: '==',
            compareValue: selectRoom.id,
        }),
        [selectRoom.id],
    );
    const messages = useFirestore('message', conditionMessage);
    return (
        <div className={cx('wrapper')}>
            {selectRoom.id ? (
                <>
                    {' '}
                    <header className={cx('header')}>
                        <div className={cx('header-info')}>
                            <p className={cx('header-title')}>{selectRoom.name}</p>
                            <span className={cx('header-description')}>{selectRoom.description}</span>
                        </div>
                        <div className={cx('btn-group')}>
                            <Button
                                icon={<UserAddOutlined />}
                                type="text"
                                onClick={() => setIsInviteMemberVisible(true)}
                            >
                                Invite
                            </Button>
                            <Avatar.Group size="small" maxCount={2}>
                                {members.map((member) => (
                                    <Tooltip title={member.displayName} key={member.id}>
                                        <Avatar src={member.photoURL}>
                                            {member.photoURL ? '' : member.displayName.charAt(0).toUpperCase}
                                        </Avatar>
                                    </Tooltip>
                                ))}
                            </Avatar.Group>
                        </div>
                    </header>
                    <div className={cx('content')}>
                        <div className={cx('message-list')}>
                            {messages.map((mess) => (
                                <Message
                                    key={mess.id}
                                    text={mess.text}
                                    photoURL={mess.photoURL}
                                    displayName={mess.displayName}
                                    createAt={mess.createAt}
                                />
                            ))}
                        </div>
                        <Form className="form" form={form}>
                            <Form.Item name="message">
                                <Input
                                    placeholder="Enter your message..."
                                    bordered={false}
                                    autoComplete="off"
                                    onChange={handleInputChange}
                                    onPressEnter={handleOnSubmit}
                                />
                            </Form.Item>
                            <Button type="primary" onClick={handleOnSubmit}>
                                Send
                            </Button>
                        </Form>
                    </div>
                </>
            ) : (
                <Alert message="Please choose a room" type="warning" showIcon style={{ margin: 5 }} closable />
            )}
        </div>
    );
}

export default ChatWindow;
