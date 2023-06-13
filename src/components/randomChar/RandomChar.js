import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { useEffect, useState } from "react";
import Spinner from "../spinner/spinner";

const RandomChar = () => {
  const [state, setState] = useState({
    char: {},
    loading: true,
    error: false,
  });

  const marvelService = new MarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  const onCharLoaded = (char) => {
    setState({ char, loading: false, error: false });
  };

  const onError = () => {
    setState({
      loading: false,
      error: true,
    });
  };

  const onCharLoading = () => {
    setState({
      loading: true,
      error: false,
    });
  };

  const updateChar = () => {
    onCharLoading();
    const id = Math.floor(Math.random() * (1010789 - 1009146) + 1009146);
    marvelService.getAllCharacter(id).then(onCharLoaded).catch(onError);
  };

  const { char, loading, error } = state;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <View char={char} /> : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button
          className="button button__main"
          onClick={() => {
            updateChar();
          }}
        >
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  const checkImg = thumbnail.includes("image_not_available");

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={{ objectFit: checkImg ? "unset" : "cover" }}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
