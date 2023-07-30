import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { error, request, loading, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=7a2355643e5dd889f55743e2097ae1ad";
  const _limit = 9;
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=${_limit}&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getAllCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getComics = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const searchCharByName = async (name) => {
    const res = await request(`${_apiBase}characters?nameStartsWith=${name}&${_apiKey}`)
    return res;
  }

  const getAllComics = async (offset) => {
    const res = await request(
      `${_apiBase}comics?issueNumber=3&orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const cutString = (str) => {
    return str.slice(0, 200) + "...";
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? cutString(char.description)
        : "Information about this character is absent!",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const _transformComics = (comics) => {
    const price = comics.prices[0].price
      ? comics.prices[0].price
      : "NOT AVAILABLE";
    return {
      title: comics.title,
      price,
      id: comics.id,
      description: comics.description,
      pageCount: comics.pageCount,
      language: comics.textObjects[0]?.language,
      image: comics.thumbnail.path + "." + comics.thumbnail.extension,
    };
  };

  return {
    loading,
    error,
    getAllCharacter,
    getAllCharacters,
    clearError,
    getAllComics,
    getComics,
    searchCharByName
  };
};

export default useMarvelService;
