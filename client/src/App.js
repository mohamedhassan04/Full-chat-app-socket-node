import "./App.css";
import Login from "./Components/Login";
import MainContainer from "./Components/MainContainer";
import { Route, Routes } from "react-router-dom";
import Welcome from "./Components/Welcome";
import ChatArea from "./Components/ChatArea";
import CreateGroups from "./Components/CreateGroups";
import UserGroups from "./Components/UserGroups";
import SignUp from "./Components/Signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="app" element={<MainContainer />}>
          <Route path="welcome" element={<Welcome />}></Route>
          <Route path="chat" element={<ChatArea />}></Route>
          <Route path="create-groups" element={<CreateGroups />}></Route>
          <Route path="user-group" element={<UserGroups />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
