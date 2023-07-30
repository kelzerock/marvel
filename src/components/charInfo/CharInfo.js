import "./charInfo.scss";
import { Fragment, useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import { Link } from "react-router-dom";
import setContent from "../../utils/setContent";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const {getAllCharacter, clearError, process, setProcess} = useMarvelService();

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
    getAllCharacter(charId)
      .then(onCharLoaded)
      .then(()=> setProcess('confirmed'));
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };



  return (
    <div className="char__info">
      {setContent(process, View, char)}
    </div>
  );
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data;
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default CharInfo;
