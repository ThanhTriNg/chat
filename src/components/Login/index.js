import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import firebase, { db, auth } from '../../firebase/config';
import { addDocument, generateKeywords } from '../../firebase/services';

const { Title } = Typography;
function Login() {
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
                keywords:generateKeywords(user.displayName)
            });
        }
    };

    return (
        <Row justify="center" style={{ height: 800 }}>
            <Col span={8}>
                <Title style={{ textAlign: 'center' }} level={3}>
                    Chat web
                </Title>
                {/* <Title style={styles.title} level={3}></Title> */}
                <Button style={{ width: '100%', marginBottom: 5 }}>Login with Google</Button>
                <Button style={{ width: '100%' }} onClick={handleFbLogin}>
                    Login with Facebook
                </Button>
            </Col>
        </Row>
    );
}

export default Login;
