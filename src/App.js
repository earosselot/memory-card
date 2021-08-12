import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import './styles/App.css'

const App = (props) => {
  return (
    <div className="container">
        <Header />
        <Main characters={props.characters} />
        <Footer />
    </div>
  );
}

export default App;
