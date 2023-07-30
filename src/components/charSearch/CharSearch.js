import { useFormik } from "formik";
import { Fragment, useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";

const CharSearch = () => {
  const [charName, setCharName] = useState('');
  const {error, loading, searchCharByName, clearError} = useMarvelService();

 

  const updateChar = (name) => {
    console.log('name: ', name)
    searchCharByName(name).then(onCharLoaded)
  }

  const onCharLoaded = (name) => {
    setCharName(name)
  }

  const formik = useFormik({
    initialValues: {
      charName: "",
    },
    onSubmit: (values) => {
      updateChar(values.charName);
    },
  });

  return (
    <Fragment>
      <div
        className="char__basics mt-2"
        style={{
          marginTop: "20px",
          padding: "25px",
          boxShadow: "0px 0px 20px rgb(0 0 0 / 25%)",
          position: "relative",
          zIndex: 5,
          backgroundColor: "#fff"
        }}
      >
        <h3>Or find a character by name</h3>
        <a href="#" className="button button__main">
          <div className="inner">homepage</div>
        </a>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="charName">First Name</label>
          <input
            id="charName"
            name="charName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.charName}
          />
          <button type="submit">Submit</button>
        </form>
        <button onClick={()=>{console.log(charName)}}>click</button>
      </div>
    </Fragment>
  );
};

export default CharSearch;
