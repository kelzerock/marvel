class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=7a2355643e5dd889f55743e2097ae1ad";
  _limit = "9"

  getResource = async (url) => {
    let res = await fetch(url);
    console.log(res)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=${this._limit}&offset=210&${this._apiKey}`
    );
    return res.data.result.map(this._transformCharacter);
  };
  getAllCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    console.log(res.data)
    return this._transformCharacter(res.data.results[0]);
  };

  cutString = (str) => {
    return str.slice(0, 200) + "...";
  };

  _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description
        ? this.cutString(char.description)
        : "Information about this character is absent!",
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
    };
  };
}

export default MarvelService;
