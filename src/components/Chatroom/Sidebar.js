import { Row, Col } from 'antd';
import classNames from 'classnames/bind';

import UserInfo from './UserInfo';
import RoomList from './RoomList';
import styles from './Sidebar.module.scss';

// import styled from 'styled-components';
// const SidebarStyled = styled.div`
//     background: #3f0e40;
//     color: white;
//     height: 100vh;
// `;
const cx = classNames.bind(styles);
function Sidebar() {
    return (
        //    <SidebarStyled>
        //         <Row>
        //             <Col span={24}>
        //                 <UserInfo />
        //             </Col>
        //             <Col span={24}>
        //                 <RoomList />
        //             </Col>
        //         </Row>
        //    </SidebarStyled>
        <div className={cx('wrapper')}>
            <Row>
                <Col span={24}>
                    <UserInfo />
                </Col>
                <Col span={24}>
                    <RoomList />
                </Col>
            </Row>
        </div>
    );
}

export default Sidebar;
