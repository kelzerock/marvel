import "./comicsList.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/spinner";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(500);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [comicsEnded, setComicsEnded] = useState(false);
  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onLoadComics = (newComics) => {
    let ended = false;
    if (newComics < 8) {
      ended = true;
    }

    setComics((comics) => [...comics, ...newComics]);
    setOffset((offset)=>offset + 8);
    setComicsEnded(ended);
    setNewItemLoading(false)
  };

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset).then(onLoadComics);
  };
  const errorData = error ? <ErrorMessage /> : null;
  const loadingData = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="comics__list">
      <ul className="comics__grid">
        {errorData}
        {loadingData}
        {comics.map((el, ind) => {
          
          return (
          <li className="comics__item" key={ind}>
            <Link to={`/comics/${el.id}`}>
              <img
                src={el.image}
                alt={el.title}
                className="comics__item-img"
                style={{
                  objectFit: el.image.includes("image_not_available")
                    ? "unset"
                    : "cover",
                }}
              />
              <div className="comics__item-name">{el.title}</div>
              <div className="comics__item-price">{el.price}$</div>
            </Link>
          </li>
        )}
        )}
      </ul>
      <button onClick={()=>{onRequest(offset)}} className="button button__main button__long" disabled={newItemLoading}>
        {comicsEnded ? "" : <div className="inner">load more</div>}
      </button>
    </div>
  );
};

export default ComicsList;
