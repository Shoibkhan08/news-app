import React, { useContext } from "react";
import Home from "./component/Home";
import Navbar from "./component/header/Navbar";
import { Routes, Route} from "react-router-dom";
import SignIn from "./component/header/Signin";
import SignUp from "./component/header/Signup";
import DetailArticles from "./component/pages/DetailArticles";
import authContext from "./component/context/authcontext";


function App() {
 const useAuthContext = useContext(authContext);
 const {reload, setReload,user,values,handleChange,handleBlur,handleSubmit,fetchArticlesDetail} = useAuthContext;

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar/>} >
          <Route index element={<Home user={user} setReload={setReload} reload={reload} fetchArticlesDetail={fetchArticlesDetail} />} />
          <Route path="/signin"  element={ <SignIn values={values} handleBlur={handleBlur} handleChange={handleChange} handleSubmit={handleSubmit}/>}/>
          <Route path="/signup" element={<SignUp values={values} handleBlur={handleBlur} handleChange={handleChange} handleSubmit={handleSubmit}/>}/>
          <Route path="/:id/" element={<DetailArticles />}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
