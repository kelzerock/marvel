import "./charList.scss";
import abyss from "../../resources/img/abyss.jpg";
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
    offset: 210,
  };

  marvelService = new MarvelService();

  onLoadedData = (newChars) => {
    this.setState(({ offset, chars }) => {
      return {
        chars: [...chars, ...newChars],
        loading: false,
        newItemLoading: false,
        offset: offset + 9,
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

  render() {
    const { chars, loading, error, offset, newItemLoading } = this.state;
    const errorData = error ? <ErrorMessage /> : null;
    const loadingData = loading ? <Spinner /> : null;
    const resultData = !(errorData || loadingData) ? (
      <View charArr={chars} onCharSelected={this.props.onCharSelected} />
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
        onClick={()=>{this.onRequest(offset)}}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

const View = ({ charArr, onCharSelected }) => {
  return charArr.map((el) => (
    <li
      className="char__item"
      key={el.id}
      onClick={() => {
        onCharSelected(el.id);
      }}
    >
      <img
        src={el.thumbnail}
        alt="abyss"
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
