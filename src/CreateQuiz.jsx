import React, { useState } from 'react';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
      },
    ]);
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].questionText = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectAnswerChange = (qIndex, optIndex) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = optIndex;
    setQuestions(updated);
  };

  const handleSaveQuiz = () => {
    const quizData = {
      subject: title,
      createdBy: 'user123',
      published: true,
      durationInMinutes: parseInt(duration),
      questions: questions.map((q) => ({
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.options[q.correctAnswer] || '',
      })),
    };

    console.log('Final Quiz Object:', quizData);

    // Future API call
    fetch('http://localhost:8080/api/quizzes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quizData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Saved:', data)
        Swal.fire({
          title: "Good job!",
          text: "Question is created!",
          icon: "success"
        });
      })
      .catch((err) => console.error('Save error:', err));
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse w-full">
        <div className="card bg-base-100 w-full max-w-xl shadow-2xl">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-4">Create New Quiz</h2>
            <form className="space-y-4">
              {/* Quiz Title */}
              <div>
                <label className="label">
                  <span className="label-text">Subject</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter quiz title"
                  className="input input-bordered w-full"
                />
              </div>



              {/* Time Limit */}
              <div>
                <label className="label">
                  <span className="label-text">Time Limit (in minutes)</span>
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  min="1"
                  placeholder="e.g. 30"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Dynamic Questions */}
              <div className="mt-6 space-y-6">
                <h3 className="text-lg font-semibold">Questions</h3>
                {questions.map((q, qIndex) => (
                  <div key={qIndex} className="border p-4 rounded-lg space-y-4">
                    <div>
                      <label className="label">
                        <span className="label-text">Question {qIndex + 1}</span>
                      </label>
                      <input
                        type="text"
                        value={q.questionText}
                        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Enter question"
                      />
                    </div>
                    {q.options.map((opt, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct-${qIndex}`}
                          checked={q.correctAnswer === optIndex}
                          onChange={() => handleCorrectAnswerChange(qIndex, optIndex)}
                          className="radio radio-primary"
                        />
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                          className="input input-bordered w-full"
                          placeholder={`Option ${optIndex + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-outline btn-accent w-full"
                  onClick={addQuestion}
                >
                  Add Question
                </button>
              </div>

              {/* Save Button */}
              <div className="text-center mt-6">
                <button type="button" className="btn btn-primary w-full" onClick={handleSaveQuiz}>
                  Save Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
