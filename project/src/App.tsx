import styles from "./App.module.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Testguide from "./pages/Login/TestGuide";
import Profil from "./pages/Login/Profil";
import CefrTest from "./pages/Login/CefrTest";
import CefrScore from "./pages/Login/CefrScore";
import Main from "./pages/Main/Main";
import MyLecture from "./pages/MyPage/MyLecture/MyLecture";
import Statistics from "./pages/MyPage/Statstics/Statstics";
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
            <Route path="/testguide" element={<Testguide />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/cefrtest" element={<CefrTest />} />
            <Route path="/cefrscore" element={<CefrScore />} />
            <Route path="/" element={<Main />} />
            <Route path="mypage" element={<Statistics />}>
              <Route path="myLecture" element={<MyLecture />} />
              <Route path="myNote" element={<MyNote />} />
            </Route>
            <Route path="search" element={<Search />}></Route>
            <Route
              path="category/:categoryId"
              element={<CategoryVideoList />}
            />
            <Route path="test" element={<Test />} />
            <Route path="vocalist" element={<VocabularyList />}>
              <Route path="myvoca" element={<MyVocabulary />} />
              <Route path="classvoca" element={<ClassVocabulary />} />
            </Route>
            <Route path="videoDetail" element={<VideoDetail />} />
            <Route path="landing" element={<LandingPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
