import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import { useState } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";

const App = () => {
  const [state, setState] = useState({
    selectedChar: null,
  });

  const onCharSelected = (id) => {
    setState({
      selectedChar: id,
    });
  };

  return (
    <div className="app">
      <AppHeader />
      <div>
        <SingleComic />
      </div>
      <div>
        <ComicsList />
      </div>
      <main>
        <RandomChar />

        <div className="char__content">
          <ErrorBoundary>
            <CharList onCharSelected={onCharSelected} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo charId={state.selectedChar} />
          </ErrorBoundary>
        </div>

        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
};

export default App;
