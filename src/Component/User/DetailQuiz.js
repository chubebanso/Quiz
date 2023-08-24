import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom"
import { getDataQuiz } from "../../services/apiService";
import _, { find } from 'lodash'
import './DetailQuiz.scss'
import Question from "./Question";
import { useState } from "react";
const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();//truoc khi vao trang nay thi tu trang nao truyen toi
    console.log(location)
    const quizId = params.id;
    const [dataQuiz, setDataQuiz] = useState("");
    const [index, setIndex] = useState(0);
    useEffect(() => {
        fetchQuestions();
    }, [quizId])
    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        // console.log('check question', res)
        if (res && res.EC === 0) {
            let temp = res.DT;
            let data = _.chain(temp)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers)
                        // console.log('item answer', item.answers)
                    })
                    //  console.log('value', value, 'key:', key);
                    answers.questionId = key
                    return { questionId: key, answers, questionDescription, image }
                })
                .value();
            // console.log(data)
            setDataQuiz(data)
        }
    }
    console.log('check data quiz', dataQuiz)
    const handlePrevious = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1)
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1)
        }
    }
    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);//cloneDeep:sao chep tat ca cac object
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question) {
            question.answers = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected
                }
                return item;
            })
            let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)//trong truong hop ko tim thay tra ra -1
            if (index > -1) {
                dataQuizClone[index] = question;
                setDataQuiz(dataQuizClone)
            }
            // console.log('b', b)
        }
    }

    return (
        <div className="detail-quiz-container">
            <div className='left-content'>
                <div className="title">
                    Quiz {quizId}:{location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-body">
                    <img />
                </div>
                <div className="q-content">
                    <Question
                        index={index}
                        handleCheckbox={handleCheckbox}
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                    />
                </div>
                <div className="footer">
                    <button className="btn btn-secondary" onClick={() => handlePrevious()}>Prev</button>
                    <button className="btn btn-primary" onClick={() => handleNext()}>Next</button>
                    <button className="btn btn-warning" onClick={() => handleNext()}>Finish</button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
        </div>
    )
}
export default DetailQuiz