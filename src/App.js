import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import './styles/App.css'

const App = () => {
  return (
    <div className="container">
        <Header />
        <Main />
        <Footer />
    </div>
  );
}

export default App;
