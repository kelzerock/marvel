import "./charList.scss";
import { useEffect, useState, useRef } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharList = (props) => {
  const [state, setState] = useState({
    chars: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 230,
    charEnded: false,
    activeID: null,
  });

  const marvelService = new MarvelService();

  const onLoadActiveID = (id) => {
    setState({ ...state,activeID: id });
  };

  const onLoadedData = (newChars) => {
    let ended = false;
    if (newChars < 9) {
      ended = true;
    }

    setState(({ offset, chars }) => {
      return {...state,
        chars: [...chars, ...newChars],
        loading: false,
        newItemLoading: false,
        offset: offset + 9,
        charEnded: ended,
      };
    });
  };

  const onUpdateData = () => {
    marvelService.getAllCharacters().then(onLoadedData).catch(onError);
  };

  const onError = () => {
    setState({...state,
      loading: false,
      error: true,
    });
  };

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = (offset) => {
    onCharListLoading();
    marvelService.getAllCharacters(offset).then(onLoadedData).catch(onError);
  };

  const onCharListLoading = () => {
    setState({...state,
      newItemLoading: true,
    });
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current[id].focus();
  };
  console.log('state: ', state)

  const { chars, loading, error, offset, newItemLoading, charEnded } = state;
  const errorData = error ? <ErrorMessage /> : null;
  const loadingData = loading ? <Spinner /> : null;
  const resultData = !(errorData || loadingData) ? (
    <View
      charArr={chars}
      onCharSelected={props.onCharSelected}
      loadActiveID={onLoadActiveID}
      activeID={state.activeID}
      focusOnItem={focusOnItem}
      itemRefs={itemRefs}
    />
  ) : null;
  console.log('resultData: ',resultData);

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
  itemRefs
}) => {
  console.log("charrArr: ", charArr);

  return charArr.map((el, _i) => (
    <li
      tabIndex="0"
      className={`char__item ${
        el.id === activeID ? "char__item_selected" : ""
      }`}
      ref={el =>itemRefs.current[_i] = el}
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
