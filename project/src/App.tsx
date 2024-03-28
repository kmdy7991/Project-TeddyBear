import styles from "./App.module.css";
import { Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Loading from "./pages/Login/Loading";
import Testguide from "./pages/Login/TestGuide";
import LevelUptest from "./pages/Test/LevelupTest";
import Profil from "./pages/Login/Profil";
import CefrTest from "./pages/Login/CefrTest";
import Main from "./pages/Main/Main";
import MyLecture from "./pages/MyPage/MyLecture/MyLecture";
import MyPage from "./pages/MyPage/MyPage";
import MyNote from "./pages/MyPage/MyNote/MyNote";
import Search from "./pages/Search/Search";
import Test from "./pages/Test/Test";
import VocabularyList from "./pages/VocabularyList/VocabularyList";
import MyVocabulary from "./pages/VocabularyList/MyVocabulary";
import ClassVocabulary from "./pages/VocabularyList/ClassVocabulary";
import VideoDetail from "./pages/Video/VideoDetail";
import Nav from "./components/Nav/Nav";
import CategoryVideoList from "./components/Video/CategoryVideoList";
import LandingPage from "./pages/Landing/LandingPage";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className={styles.App}>
          {/* <Nav className={styles.Nav} /> */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/loading" element={<Loading />} />
            <Route path='/testguide' element={<Testguide/>} />
            <Route path="/profil" element={<Profil/>}/>
            <Route path="/cefrtest" element={<CefrTest/>}/>
            <Route path="/" element={<Main />} />
            <Route path="mypage" element={<MyPage />}>
              <Route path="myLecture" element={<MyLecture />} />
              <Route path="myNote" element={<MyNote />} />
            </Route>
            <Route path="search" element={<Search />}></Route>
            <Route
              path="category/:categoryId"
              element={<CategoryVideoList />}
            />
            <Route path="test" element={<Test />} />
            <Route path="levelUptest" element={<LevelUptest />} />
            <Route path="vocalist" element={<VocabularyList />}>
              <Route path="myvoca" element={<MyVocabulary />} />
              <Route path="classvoca" element={<ClassVocabulary />} />
            </Route>
            <Route path="videoDetail" element={<VideoDetail />} />
            <Route path="landing" element={<LandingPage />} />
            <Route path="*" element={<Navigate to={"/landing"} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
