// import React, { useState, useEffect } from 'react';
// import { FaHome, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { UserProvider } from './hooks/UserContext';
// import { Button } from 'react-bootstrap';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Home from './pages/Home';
// import Logout from './pages/Logout';
// import ViewPost from './pages/ViewPost';
// import AdminDashboard from './pages/AdminDashboard';
// import Sidebar from './components/Sidebar';


// const App = () => {

//     const token = localStorage.getItem('token');

//     const [user, setUser] = useState({
//       id: null,
//       username: null,
//       isAdmin: null
//     });
  
//     function unsetUser() {
//       localStorage.clear();
//     };
  
//     useEffect(() => {
//       fetch(`http://localhost:4000/users/details`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       })
//         .then(res => res.json())
//         .then(data => {
//           if (typeof data !== undefined) {
//             setUser({
//               id: data.user._id,
//               username: data.user.username,
//               isAdmin: data.user.isAdmin
//             });
//             console.log("App.jsx user: ", user)
//           } else {
//             setUser({
//               id: null,
//               username: null,
//               isAdmin: null
//             });
//           }
//         })
//     }, [token])

//     return (
//         <>  

//         <UserProvider value={{ user, setUser, unsetUser }}>
//             <Router>
//                 <Sidebar />
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/register" element={<Register />} />
//                     {/* <Route path='/posts' element={<Posts />} /> */}
//                     <Route path="/admin" element={<AdminDashboard />} />
//                     <Route path="/logout" element={<Logout />} />
//                 </Routes>
//             </Router>  
//         </UserProvider>       
//         </>
//     );
// };

// export default App;

import { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './hooks/UserContext';
import AppNavbar from './components/AppNavbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Logout from './pages/Logout';
import AdminDashboard from './pages/AdminDashboard';
import Sidebar from './components/Sidebar';
import Posts from './pages/Posts';
import ViewPost from './pages/ViewPost';

function App() {

  const [user, setUser] = useState({
    id: null,
    username: null,
    isAdmin: null
  });

  function unsetUser(){
    localStorage.clear();
  };

  useEffect(() => {
    fetch('https://blogappapi-czfe.onrender.com/users/details', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      console.log(typeof data !== undefined)
      if(typeof data !== undefined){
        setUser({
            id: data.user._id,
            username: data.user.username,
            isAdmin: data.user.isAdmin
        });
      } else {
        setUser({
            id: null,
            username: null,
            isAdmin: null
        });
      }
    })
  }, [])

  useEffect(() => {
    console.log(user);
    console.log(localStorage);
  }, [user]);

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <AppNavbar />
          <Container>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='/posts' element={<Posts />} />
                <Route path='/post/:postId' element={<ViewPost />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
          </Container>
        </Router>
      </UserProvider>
    </>
  )
}

export default App;

