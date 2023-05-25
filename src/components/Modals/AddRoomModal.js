import React, { useContext } from 'react';
import { Form, Modal, Input } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../firebase/services';
function AddRoomModal() {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
    const {
        user: { uid },
    } = useContext(AuthContext);
    const [form] = Form.useForm();
    const handleOk = () => {
        //add new room to firestore
        console.log({ formData: form.getFieldValue() });
        addDocument('rooms', { ...form.getFieldValue(), members: [uid] });
        //reset form value
        form.resetFields()

        setIsAddRoomVisible(false);
    };
    const handleCancel = () => {
        //reset form value
        form.resetFields()
        
        setIsAddRoomVisible(false);
    };
    return (
        <div>
            <Modal title="Create room" visible={isAddRoomVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item label="Room name" name="name">
                        <Input placeholder="Enter your room name" />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input placeholder="Enter your description" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddRoomModal;
