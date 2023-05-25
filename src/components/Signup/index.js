import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Row, Col, Button, Typography, Input, Checkbox, Form } from 'antd';
import Text from 'antd/lib/typography/Text';
import { GoogleOutlined, FacebookFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { addDocument, generateKeywords } from '../../firebase/services';

import styles from './Signup.module.scss';
import { db } from '../../firebase/config';

const { Title } = Typography;
const cx = classNames.bind(styles);

function Signup() {
    const [displayName, setDisplayName] = useState();
    const [password, setPassword] = useState();

    const [form] = Form.useForm();

    const handleUsernameChange = (e) => {
        setDisplayName(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        const user = db.collection('users').doc();

        e.preventDefault();
        addDocument('users', {
            displayName: displayName,
            // email: user.email,
            // photoURL: user.photoURL,
            uid: user.id,
            providerID: 'chatapp',
            keywords: generateKeywords(displayName),
            password: password,
        });
    };

    const navigate = useNavigate();

    const handleNavigateLogin = () => {
        navigate('/login');
    };

    return (
        <Row justify="center" className={cx('body')}>
            <Col span={8} className={cx('wrapper')}>
                <Title className={cx('title')} level={1}>
                    Sign Up
                </Title>

                <Form onClick={handleSubmit} form={form}>
                    <Form.Item>
                        <Input
                            placeholder="Username"
                            className={cx('input')}
                            type="text"
                            autoComplete="off"
                            onChange={handleUsernameChange}
                        ></Input>
                    </Form.Item>
                    <Form.Item>
                        <Input
                            placeholder="Password"
                            className={cx('input')}
                            type="password"
                            autoComplete="off"
                            onChange={handlePasswordChange}
                        ></Input>
                    </Form.Item>

                    <Button className={cx('btn')}>Sign Up</Button>
                </Form>

                <Title className={cx('title')} level={3}>
                    Have an account?
                </Title>
                <Text className={cx('text', 'signin')} onClick={handleNavigateLogin}>
                    Sign in here!
                </Text>
            </Col>
        </Row>
    );
}

export default Signup;
