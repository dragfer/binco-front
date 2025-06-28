import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Coupon from "./pages/coupon/Coupon";
import Owned from "./pages/owned/Owned";
import Landing from "./pages/landing/Landing";
import { BrowserRouter , Routes , Route }  from "react-router-dom";
import About from "./pages/about/About";
import History from "./pages/history/History";
import Account from "./pages/account/Account";
import Help from "./pages/help/Help";
import { CoinsProvider } from "./context/CoinsContext";
import SessionAuth from "./pages/session/SessionAuth";




function App() {
  return (
    <div className="App">
      <CoinsProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/" >
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="about" element={<About />} />
            <Route path="machine/:session_code" element={<SessionAuth />} />
          </Route>
          <Route path="user">
            <Route path="dashboard" element={<Home />} />
            <Route path="owned" element={<Owned />} />
            <Route path="coupon" element={<Coupon />} />
            <Route path="history" element={<History />} />
            <Route path="account" element={<Account />} />
            <Route path="help" element={<Help />} />
          </Route>
          </Routes>
        </BrowserRouter>
      </CoinsProvider>
    </div>
  );
}

export default App;
