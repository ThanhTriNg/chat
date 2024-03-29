import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import Chatroom from './components/Chatroom';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMemberModal from './components/Modals/InviteMemberModal';
function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppProvider>
                    <Routes>
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Chatroom />} path="/" />
                    </Routes>
                    <AddRoomModal />
                    <InviteMemberModal/>
                </AppProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
