import {
  BrowserRouter,
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import "./App.css";
import Layout from "@/pages/Layout";

import Login from "@/pages/Login";
import { AuthComponent } from "@/components/AuthComponent";
import Publish from "./pages/Publish";
// import Article from "./pages/Article";
import Home from "./pages/Home";
import { history } from "@/utils/history";
import { lazy, Suspense } from "react";
const Article = lazy(() => import("./pages/Article"));
function App() {
  return (
    // <BrowserRouter>
    <HistoryRouter history={history}>
      <div className="App">
        <Suspense
          fallback={
            <div
              style={{
                textAlign: "center",
                marginTop: 200,
              }}
            >
              loading...
            </div>
          }
        >
          <Routes>
            {/* 创建路由path和组件对应关系 */}
            {/* <Route path="/" element={<Layout/>}></Route> */}
            <Route
              path="/"
              element={
                <AuthComponent>
                  <Layout />
                </AuthComponent>
              }
            >
              {/* 二级路由 */}
              <Route index element={<Home />}></Route>
              <Route path="article" element={<Article />}></Route>
              <Route path="publish" element={<Publish />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </Suspense>
      </div>
    </HistoryRouter>
    // </BrowserRouter>
  );
}

export default App;
