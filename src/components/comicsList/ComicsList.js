import "./comicsList.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/spinner";

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
      break;
    case "loading":
      return newItemLoading ? <Component /> : <Spinner />;
      break;
    case "confirmed":
      return <Component />;
      break;
    case "error":
      return <ErrorMessage />;
      break;
    default:
      throw new Error("Unexpected process!");
  }
};

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [offset, setOffset] = useState(500);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [comicsEnded, setComicsEnded] = useState(false);
  const { loading, error, getAllComics, process, setProcess } = useMarvelService();

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
    getAllComics(offset)
      .then(onLoadComics)
      .then(()=>setProcess('confirmed'));
  };
  const errorData = error ? <ErrorMessage /> : null;
  const loadingData = loading && !newItemLoading ? <Spinner /> : null;

  const renderItem = (itemArr) => {
    console.log("itemArr: ",itemArr)
    return itemArr.map((el, ind) => {
          
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
    )
  }

  return (
    <div className="comics__list">
      <ul className="comics__grid">
       {setContent(process, ()=> renderItem(comics), newItemLoading)}
      </ul>
      <button onClick={()=>{onRequest(offset)}} className="button button__main button__long" disabled={newItemLoading}>
        {comicsEnded ? "" : <div className="inner">load more</div>}
      </button>
    </div>
  );
};

export default ComicsList;
