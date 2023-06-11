import "./charList.scss";
import { Component } from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 230,
    charEnded: false,
    activeID: null,
  };

  marvelService = new MarvelService();

  onLoadActiveID = (id) => {
    this.setState({ activeID: id });
  };

  onLoadedData = (newChars) => {
    let ended = false;
    if (newChars < 9) {
      ended = true;
    }

    this.setState(({ offset, chars }) => {
      return {
        chars: [...chars, ...newChars],
        loading: false,
        newItemLoading: false,
        offset: offset + 9,
        charEnded: ended,
      };
    });
  };

  onUpdateData = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onLoadedData)
      .catch(this.onError);
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onLoadedData)
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  itemRefs = [];

  setRef = (ref) => {
    this.itemRefs.push(ref);
  };

  focusOnItem = (id) => {
    // Я реализовал вариант чуть сложнее, и с классом и с фокусом
    // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
    // На самом деле, решение с css-классом можно сделать, вынеся персонажа
    // в отдельный компонент. Но кода будет больше, появится новое состояние
    // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

    // По возможности, не злоупотребляйте рефами, только в крайних случаях
    // this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
    // this.itemRefs[id].classList.add('char__item_selected');
    this.itemRefs[id].focus();
    console.log(this.itemRefs)
  };

  render() {
    const { chars, loading, error, offset, newItemLoading, charEnded } =
      this.state;
    const errorData = error ? <ErrorMessage /> : null;
    const loadingData = loading ? <Spinner /> : null;
    const resultData = !(errorData || loadingData) ? (
      <View
        charArr={chars}
        onCharSelected={this.props.onCharSelected}
        loadActiveID={this.onLoadActiveID}
        activeID={this.state.activeID}
        setRef={this.setRef}
        focusOnItem={this.focusOnItem}
      />
    ) : null;

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
            this.onRequest(offset);
          }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

const View = ({ charArr, onCharSelected, loadActiveID, activeID, setRef, focusOnItem }) => {
  return charArr.map((el, _i) => (
    <li
      tabIndex="0"
      className={`char__item ${
        el.id === activeID ? "char__item_selected" : ""
      }`}
      ref={setRef}
      key={el.id}
      onClick={() => {
        onCharSelected(el.id);
        loadActiveID(el.id);
        focusOnItem(_i)
      }}
      onKeyPress={(e) => {
        if (e.key === ' ' || e.key === "Enter") {
          onCharSelected(el.id);
          loadActiveID(el.id);
          focusOnItem(_i)
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
