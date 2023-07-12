import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

import "./singleComicPage.scss";

const SingleComicPage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);
  const { error, loading, getComics, clearError } = useMarvelService();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const updateComic = () => {
    clearError();
    getComics(comicId).then(onComicLoaded);
  };

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <Fragment>
      {errorMessage}
      {spinner}
      {content}
    </Fragment>
  );
};

const View = ({ comic }) => {
  const { title, description, pageCount, image, language, price } = comic;
  const smth = useNavigate();

  return (
    <div className="single-comic">
      <img src={image} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">X-Men: Days of Future Past</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}$</div>
      </div>
      <a className="single-comic__back" onClick={()=>{smth(-1)}}>
        Back to all
      </a>
    </div>
  );
};

export default SingleComicPage;
