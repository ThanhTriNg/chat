import { useEffect, useContext } from 'react';
import { Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../Context/AuthProvider';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
function Chatroom() {
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);
    console.log(user.uid)
    useEffect(() => {
        if (!user.uid) {
            navigate('/login');
        }
    }, [navigate]);
    return (
        <div>
            <Row>
                {/* 1/4 màn hình */}
                <Col span={6}>
                    <Sidebar />
                </Col>
                {/* 3/4 màn hình */}
                <Col span={18}>
                    <ChatWindow />
                </Col>
            </Row>
        </div>
    );
}

export default Chatroom;
