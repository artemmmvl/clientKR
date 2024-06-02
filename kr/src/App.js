import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/auth/Login/Login";
import Registration from "./components/auth/registration/Registration";
import {useSelector} from "react-redux";
import Profile from "./components/Profile/Profile";
import RandomUsers from "./components/UsersRandom/RandomUsers";
import Favorites from "./components/Favorites/Favorites";
import Layout from "./components/Layout";
import {useState} from "react";
import Logout from "./components/auth/Logout";
import ChangeProfile from "./components/ChangeProfile/ChangeProfile";
import AdminChangeUsers from "./components/AdminChangeUsers/AdminChangeUsers";
function App(){
    let exp=useSelector(state => state.auth.exp)
    let token=useSelector(state => state.auth.token)
    let role=useSelector(state => state.auth.role)


    if (exp===undefined){
        exp=0
    }
    console.log("token " + token)
    console.log("exp " + exp)
    console.log("role " + role)



    let now=Math.floor(Date.now() / 1000)
    let checkAuth=(now<exp) && (token!==undefined)
    // let [checkAuth, setCheckAuth]=useState((now<exp) && (token!==undefined))
    console.log("check "+checkAuth.toString())
    function setCheckAuth(p) {
        console.log(1)
    }


    return (
      <>
        <BrowserRouter>
          <Routes>

              <Route path='/logout' element={checkAuth?<Logout setCheck={setCheckAuth}/>:<Login/>}></Route>
              <Route path='/login' element={checkAuth?<Navigate to='/'/>:<Login />}></Route>
              <Route path='/registration' element={checkAuth?<Navigate to='/'/>:<Registration/>}></Route>
              <Route path='/' element={checkAuth?<Layout/>:<Navigate to='/login'/>}>
                  <Route index element={<Navigate to='/search-friends'/>}></Route>
                  <Route path='/profile/change' element={<ChangeProfile/>}>
                      <Route path=':id' element={<Profile/>}/>
                  </Route>
                  <Route path='profile' >
                    {/*<Route path='/me'/>*/}
                      <Route path=':id' element={<Profile/>}/>
                  </Route>


                  <Route path='search-friends' element={<RandomUsers/>}></Route>

                  <Route path='favorites' element={<Favorites></Favorites>}></Route>
                  <Route path='/admin' element={<AdminChangeUsers role={role}></AdminChangeUsers>}></Route>

              </Route>
               </Routes>
        </BrowserRouter>
      </>

);
}
export default App;
