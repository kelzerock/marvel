import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from "../../resources/img/vision.png";
import { useState } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const MainPage = () => {
  const [state, setState] = useState({
    selectedChar: null,
  });

  const onCharSelected = (id) => {
    setState({
      selectedChar: id,
    });
  };

  return (
    <>
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
    </>
  );
};

export default MainPage;