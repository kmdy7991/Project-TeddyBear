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
import Watching from "./pages/MyPage/MyLecture/Watching";
import Watched from "./pages/MyPage/MyLecture/Watched";
import BookMarked from "./pages/MyPage/MyLecture/BookMarked";
import Statistics from "./pages/MyPage/Statstics/Statstics";
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
            <Route path="/testguide" element={<Testguide />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/cefrtest" element={<CefrTest />} />
            <Route path="/" element={<Main />} />
            <Route path="mypage" element={<MyPage />}>
              <Route path="myLecture" element={<MyLecture />}>
                <Route path="watching" element={<Watching />} />
                <Route path="watched" element={<Watched />} />
                <Route path="bookmarked" element={<BookMarked />} />
              </Route>
              <Route path="myNote" element={<MyNote />} />
              <Route path="statistics" element={<Statistics />} />
            </Route>
            <Route path="/search" element={<Search />}>
              <Route path="search/:videoTitle" element={<Search />} />
            </Route>
            <Route path="/video/:videoId" element={<VideoDetail />} />
            <Route
              path="category/:categoryName"
              element={<CategoryVideoList />}
            />
            <Route path="/test/:videoId" element={<Test />} />
            <Route path="levelUptest" element={<LevelUptest />} />
            <Route path="vocalist" element={<VocabularyList />}>
              <Route path="myvoca" element={<MyVocabulary />} />
              <Route path="classvoca" element={<ClassVocabulary />} />
            </Route>

            <Route path="landing" element={<LandingPage />} />
            <Route path="*" element={<Navigate to={"/landing"} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
