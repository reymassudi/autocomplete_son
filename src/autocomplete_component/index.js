import './autocomplete.css';
import axios from "axios";
import {useState} from "react";
import { faCircleDown } from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Product from "./components/product";

function AutoComplete() {
    const [results, setResults] = useState([]);
    const [showResults, setShowResult] = useState(false);
    const [showError, setShowError] = useState(false);

    const onInputChange = (e) => {
        let searchQuery = e.target.value;
        axios.get(`https://dummyjson.com/products/search?q=${searchQuery}`)
            .then((res) => {
                setResults(res.data.products);
                setShowResult(true);
            })
            .catch((error) => {
                setResults([]);
                setShowResult(false);
                setShowError(true);
            });
    }

    const onDownButtonClick = (e) => {
        e.preventDefault();
        setShowResult(!showResults);
    }

    return (
        <section className="page">
            <h2>AutoComplete</h2>

            <form className="autocomplete">
                <div className="autocomplete_input">
                    <input onChange={onInputChange}/>
                    <button onClick={onDownButtonClick}><FontAwesomeIcon icon={faCircleDown} /></button>
                </div>

                {showResults ?
                    <div className="results">
                        {results.map((result) => {
                            return <Product data={result} />
                        })}
                    </div>
                    :
                    null
                }

                {showError ?
                    <h3 className="error">ERROR CONNECTING TO SERVER!!</h3>
                    :
                    null
                }
            </form>
        </section>
    );
}

export default AutoComplete;
