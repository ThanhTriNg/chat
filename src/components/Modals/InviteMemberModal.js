import React, { useContext, useMemo, useState } from 'react';
import { Avatar, Form, Modal, Select, Spin } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../firebase/services';
import { debounce } from 'lodash';
import { db } from '../../firebase/config';

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);
            fetchOptions(value, props.curMembers).then((newOptions) => {
                setOptions(newOptions);
                setFetching(false);
            });
        };
        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions]);
    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
        >
            {options.map((opt) => (
                <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                    <Avatar size="small" src={opt.photoURL}>
                        {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {` ${opt.label}`}
                </Select.Option>
            ))}
        </Select>
    );
}
async function fetchUserList(search, curMembers) {
    return db
        .collection('users')
        .where('keywords', 'array-contains', search)
        .orderBy('displayName')
        .limit(20)
        .get()
        .then((snapshot) => {
            return snapshot.docs
                .map((doc) => ({
                    label: doc.data().displayName,
                    value: doc.data().uid,
                    photoURL: doc.data().photoURL,
                }))
                .filter((opt) => !curMembers.includes(opt.value));
        });
}
function InviteMemberModal() {
    const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectRoom } = useContext(AppContext);
    const {
        user: { uid },
    } = useContext(AuthContext);

    const [form] = Form.useForm();
    const [value, setValue] = useState([]);

    const handleOk = () => {
        form.resetFields();
        //update members in current room
        const roomRef = db.collection('rooms').doc(selectedRoomId);
        roomRef.update({
            members: [...selectRoom.members, ...value.map((val) => val.value)],
        });

        setIsInviteMemberVisible(false);
    };
    const handleCancel = () => {
        //reset form value
        form.resetFields();

        setIsInviteMemberVisible(false);
    };
    return (
        <div>
            <Modal title="Invite member" visible={isInviteMemberVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <DebounceSelect
                        mode="multiple"
                        label="member name"
                        value={value}
                        placeholder="Enter members name"
                        fetchOptions={fetchUserList}
                        onChange={(newValue) => setValue(newValue)}
                        style={{ width: '100%' }}
                        curMembers ={selectRoom.members}
                    />
                </Form>
            </Modal>
        </div>
    );
}

export default InviteMemberModal;
