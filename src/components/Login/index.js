import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { Row, Col, Button, Typography, Input, Checkbox } from 'antd';
import Text from 'antd/lib/typography/Text';
import { GoogleOutlined, FacebookFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import firebase, { db, auth } from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/services';
import styles from './Login.module.scss';

const { Title } = Typography;
const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const handleSignup = () => {
        navigate('/signup');
    };

    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleFbLogin = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);
        if (additionalUserInfo?.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerID: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName),
            });
        }
    };

    return (
        <Row justify="center" className={cx('body')}>
            <Col span={8} className={cx('wrapper')}>
                <Title className={cx('title')} level={1}>
                    Login
                </Title>

                <Input placeholder="Username" className={cx('input')} type="text"></Input>
                <Input placeholder="Password" className={cx('input')} type="password"></Input>

                <Button className={cx('btn')}>Sign In</Button>
                <div className={cx('re-fo')}>
                    <Checkbox>Remember me</Checkbox>
                    <Text className={cx('forgot-password')}>Forgot password</Text>
                </div>
                <Text className={cx('text')}>Or Sign In With</Text>
                <div className={cx('social')}>
                    <Button className={cx('btn')}>
                        Google
                        <GoogleOutlined />
                    </Button>
                    <Button className={cx('btn')} onClick={handleFbLogin}>
                        Facebook
                        <FacebookFilled />
                    </Button>
                </div>
                <Title className={cx('title')} level={3}>
                    Don't have an accounts?
                </Title>
                <Text className={cx('text', 'signup')} onClick={handleSignup}>Sign up here!</Text>
            </Col>
        </Row>
    );
}

export default Login;
