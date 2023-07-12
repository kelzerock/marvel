import "./charInfo.scss";
import { useEffect, useState } from "react";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import useMarvelService from "../../services/MarvelService";
import { Link } from "react-router-dom";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const {error, loading, getAllCharacter, clearError} = useMarvelService();

  useEffect(() => {
    updateChar();
  }, []);

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }
    clearError();
    getAllCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;
  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  console.log(comics)
  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt={name}
          style={{
            objectFit: thumbnail.includes("image_not_available")
              ? "unset"
              : "cover",
          }}
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length === 0 ? "There is no comics with this character" : null}
        {comics.map((el, i) => {
          if (i < 10)
            return (
              <li className="char__comics-item" key={i}>
              <Link to={`comics/${el.resourceURI.split('/').pop()}`}>
              {el.name}
              </Link>
              </li>
            );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
