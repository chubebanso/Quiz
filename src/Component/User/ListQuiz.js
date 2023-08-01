import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";

const ListQuiz = (props) => {
    const [arrQuiz, setArrQuiz] = useState([]);

    useEffect(() => {
        getQuizData();
    }, []);

    const getQuizData = async () => {
        try {
            const res = await getQuizByUser();
            if (res && res.EM === 0) {
                setArrQuiz(res.DT);
            }
            console.log('res', res);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="list-quiz-container">
            {arrQuiz.length > 0 &&
                arrQuiz.map((quiz, index) => (
                    <div className="card" style={{ width: "18rem" }} key={index}>
                        <img className="card-img-top" src="..." alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                                Some quick example text to build on the card title and make up the bulk of the card's content.
                            </p>
                            <a href="#" className="btn btn-primary">
                                Go somewhere
                            </a>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default ListQuiz;
