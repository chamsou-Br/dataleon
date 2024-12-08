import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const [questions, setQuestions] = useState([
    {
      question: 'Do you like React?',
      answers: ['Yes', 'No'],
      response: [' Good choice!', 'Damn!'],
    },
    {
      question: 'Do you like DataleonLab?',
      answers: ['Yes', 'No'],
      response: ['OOH thanks!', 'we are sad :)'],
    },
    {
      question: 'Do you live in lyon?',
      answers: ['Yes', 'No'],
      response: ['OOH. u can work with us!', 'u can work en remote!'],
    },
    {
      question: 'Do you love France?',
      answers: ['Yes', 'No'],
      response: ['Our country <3', 'its your choice!'],
    },
  ]);

  const [active, setActive] = useState(1);

  const [isAnswer, setIsAnswer] = useState(-1);

  const [yourAnswer, setYourAnswer] = useState<number[]>([]);

  const onNext = () => {
    if (active < questions.length && isAnswer != -1) {
      setActive(active + 1);
      if (yourAnswer.length >= active + 1) {
        setIsAnswer(yourAnswer[active]);
      } else {
        setIsAnswer(-1);
      }
    }
  };

  const onPrevious = () => {
    if (active > 1) {
      setIsAnswer(yourAnswer[active - 2]);
      setActive(active - 1);
    }
  };

  const onAnswer = (answerIndex: number) => {
    if (yourAnswer.length < active) {
      setIsAnswer(answerIndex);
      yourAnswer.push(answerIndex);
    }
  };
  return (
    <>
      <h1 onClick={() => console.log(yourAnswer, active, isAnswer)}>
        Frontend candidate testing
      </h1>
      {questions.length == 0 && <h3>No question yet</h3>}
      <div className="question-container">
        <div className="question">
          {active} - {questions[active - 1].question}
        </div>
        <div className="answers-container">
          {questions[active - 1].answers.map((answer, answerIndex) => (
            <div
              onClick={() => onAnswer(answerIndex)}
              className={answerIndex == isAnswer ? 'answer active' : 'answer'}
            >
              {answer}
            </div>
          ))}
        </div>
        {isAnswer != -1 && (
          <div className="reponse">
            {questions[active - 1].response[isAnswer]}
          </div>
        )}
      </div>

      <div className="order">
        <div onClick={onPrevious} className={active == 1 ? 'disabled' : ''}>
          Previous
        </div>
        <div
          onClick={onNext}
          className={
            active == questions.length || isAnswer == -1 ? 'disabled' : ''
          }
        >
          Next
        </div>
      </div>
    </>
  );
}

export default App;
