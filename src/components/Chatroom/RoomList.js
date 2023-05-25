import { useContext } from 'react';
import { Button, Typography, Collapse } from 'antd';
import classNames from 'classnames/bind';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';

import styles from './RoomList.module.scss';
import { AppContext } from '../../Context/AppProvider';
const cx = classNames.bind(styles);
const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
    &&& {
        .ant-collapse-header,
        p {
            color: white;
        }
        .ant-collapse-content-box {
            padding: 0 40px;
        }
    }
`;

const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: white;
`;

function RoomList() {
    const { rooms, setIsAddRoomVisible, setSelectedRoomId } = useContext(AppContext);
    // console.log(rooms)
    const handleAddRoom = () => {
        setIsAddRoomVisible(true);
    };
    return (
        <Collapse className={cx('collapse')} ghost defaultActiveKey={['1']}>
            <PanelStyled header="List room" key={1} className={cx('panel')}>
                {rooms.map((room) => (
                    <LinkStyled className={cx('typography')} key={room.id} onClick={() => setSelectedRoomId(room.id)}>
                        {room.name}
                    </LinkStyled>
                ))}

                <Button type="text" icon={<PlusSquareOutlined />} className={cx('add-room')} onClick={handleAddRoom}>
                    Add room
                </Button>
            </PanelStyled>
        </Collapse>
    );
}

export default RoomList;
