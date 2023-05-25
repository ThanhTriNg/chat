import { Row, Col } from 'antd';

import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
function Chatroom() {
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
