import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import MarvelService from "../../services/MarvelService";
import decoration from '../../resources/img/vision.png';

const marverServise = new MarvelService();

marverServise.getAllCharacters().then(res => res.data.results.forEach(element => {
    console.log(element.name)
}))
marverServise.getAllCharacter(1011096).then(res => console.log(res))
const App = () => {
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList/>
                    <CharInfo/>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
}

export default App;