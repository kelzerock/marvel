import "./charList.scss";
import { useEffect, useState, useRef } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(230);
  const [charEnded, setCharEnded] = useState(false);
  const [activeID, setActiveID] = useState(null);

  const { loading, error, getAllCharacters } = useMarvelService();

  const onLoadActiveID = (id) => {
    setActiveID(id);
  };

  const onLoadedData = (newChars) => {
    let ended = false;
    if (newChars < 9) {
      ended = true;
    }

    setCharList((charList) => [...charList, ...newChars]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 9);
    setCharEnded(ended);
  };

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset).then(onLoadedData);
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current[id].focus();
  };

  const errorData = error ? <ErrorMessage /> : null;
  const loadingData = loading && !newItemLoading ? <Spinner /> : null;
  const resultData = (
    <View
      charArr={charList}
      onCharSelected={props.onCharSelected}
      loadActiveID={onLoadActiveID}
      activeID={activeID}
      focusOnItem={focusOnItem}
      itemRefs={itemRefs}
    />
  );

  return (
    <div className="char__list">
      <ul className="char__grid">
        {loadingData}
        {errorData}
        {resultData}
      </ul>
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{ display: charEnded ? "none" : "block" }}
        onClick={() => {
          onRequest(offset);
        }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

const View = ({
  charArr,
  onCharSelected,
  loadActiveID,
  activeID,
  focusOnItem,
  itemRefs,
}) => {
  return charArr.map((el, _i) => (
    <li
      tabIndex="0"
      className={`char__item ${
        el.id === activeID ? "char__item_selected" : ""
      }`}
      ref={(el) => (itemRefs.current[_i] = el)}
      key={el.id}
      onClick={() => {
        onCharSelected(el.id);
        loadActiveID(el.id);
        focusOnItem(_i);
      }}
      onKeyPress={(e) => {
        if (e.key === " " || e.key === "Enter") {
          onCharSelected(el.id);
          loadActiveID(el.id);
          focusOnItem(_i);
        }
      }}
    >
      <img
        src={el.thumbnail}
        alt="a"
        style={{
          objectFit: el.thumbnail.includes("image_not_available")
            ? "unset"
            : "cover",
        }}
      />
      <div className="char__name">{el.name}</div>
    </li>
  ));
};

export default CharList;
