"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { generateAIResponseAction } from "@/app/actions/ai-actions"

export default function QuizModule() {
  const { toast } = useToast()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [aiExplanation, setAiExplanation] = useState<string>("")
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const questions = [
    {
      question: "Which of the following is NOT a type of machine learning?",
      options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Cognitive Learning"],
      correctAnswer: 3,
      explanation:
        "The three main types of machine learning are Supervised Learning, Unsupervised Learning, and Reinforcement Learning. Cognitive Learning is not a standard category of machine learning.",
    },
    {
      question: "What is a key application of AI in Philippine agriculture?",
      options: [
        "Automated harvesting robots",
        "Crop disease detection using computer vision",
        "Fully autonomous farm management",
        "Replacing human farmers",
      ],
      correctAnswer: 1,
      explanation:
        "Computer vision is used to detect crop diseases in Philippine agriculture, helping farmers identify problems early and take appropriate action.",
    },
    {
      question: "Neural networks are inspired by:",
      options: ["Computer processors", "Biological brains", "Cloud computing", "Quantum physics"],
      correctAnswer: 1,
      explanation:
        "Neural networks are computing systems inspired by the biological neural networks that constitute animal brains.",
    },
    {
      question: "Which NLP task involves determining the sentiment of text?",
      options: ["Named Entity Recognition", "Part-of-Speech Tagging", "Sentiment Analysis", "Machine Translation"],
      correctAnswer: 2,
      explanation:
        "Sentiment Analysis is the NLP task that involves determining whether a piece of text expresses positive, negative, or neutral sentiment.",
    },
    {
      question: "What is a challenge for implementing AI in rural areas of the Philippines?",
      options: [
        "Limited internet connectivity",
        "Too much available data",
        "Excessive government funding",
        "Too many AI experts",
      ],
      correctAnswer: 0,
      explanation:
        "Limited internet connectivity is a significant challenge for implementing AI solutions in rural areas of the Philippines.",
    },
  ]

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = async () => {
    // Check if answer is correct
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer

    // Show explanation
    setShowExplanation(true)

    // Update score if correct
    if (isCorrect) {
      setScore(score + 1)
    }

    // Get AI-enhanced explanation
    try {
      setIsLoadingExplanation(true)
      setError(null)

      const currentQuestionObj = questions[currentQuestion]
      const result = await generateAIResponseAction(
        `Explain why the answer to this question is ${currentQuestionObj.options[currentQuestionObj.correctAnswer]}.
        
        Question: ${currentQuestionObj.question}
        Options: 
        A. ${currentQuestionObj.options[0]}
        B. ${currentQuestionObj.options[1]}
        C. ${currentQuestionObj.options[2]}
        D. ${currentQuestionObj.options[3]}
        
        Provide a detailed but concise explanation (2-3 sentences) that would help a university student understand the concept better.`,
        "You are an AI education assistant specializing in data science and AI concepts. Provide clear, accurate explanations.",
      )

      if (result.success) {
        setAiExplanation(result.text)
      } else {
        setError("Failed to generate AI explanation")
        setAiExplanation("")
      }
    } catch (err) {
      console.error("Error generating explanation:", err)
      setError("An unexpected error occurred")
      setAiExplanation("")
    } finally {
      setIsLoadingExplanation(false)
    }

    // Wait for user to see explanation before moving on
    setTimeout(() => {
      setShowExplanation(false)
      setAiExplanation("")

      // Move to next question or end quiz
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setQuizCompleted(true)

        // Show final score toast
        toast({
          title: `Quiz Completed!`,
          description: `Your score: ${score + (isCorrect ? 1 : 0)}/${questions.length}`,
          duration: 5000,
        })
      }
    }, 5000)
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setQuizCompleted(false)
    setShowExplanation(false)
    setAiExplanation("")
  }

  return (
    <div className="py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">Assessment</h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Test your knowledge of AI in Data Science with this interactive quiz.
        </p>
      </motion.div>

      {/* Quiz Card */}
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8">
              {!quizCompleted ? (
                <>
                  {/* Quiz Progress */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/80">
                        Question {currentQuestion + 1} of {questions.length}
                      </span>
                      <span className="text-white font-medium">
                        Score: {score}/{currentQuestion}
                      </span>
                    </div>
                    <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
                  </div>

                  {/* Question */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">{questions[currentQuestion].question}</h2>

                    <div className="space-y-4">
                      {questions[currentQuestion].options.map((option, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <button
                            className={`w-full text-left p-4 rounded-lg transition-colors ${
                              selectedAnswer === index
                                ? "bg-blue-600 text-white"
                                : "bg-slate-700 text-white/90 hover:bg-slate-600"
                            } ${
                              showExplanation && index === questions[currentQuestion].correctAnswer
                                ? "bg-green-600 text-white"
                                : showExplanation &&
                                    index === selectedAnswer &&
                                    index !== questions[currentQuestion].correctAnswer
                                  ? "bg-red-600 text-white"
                                  : ""
                            }`}
                            onClick={() => !showExplanation && handleAnswerSelect(index)}
                            disabled={showExplanation}
                          >
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center mr-3 flex-shrink-0">
                                {String.fromCharCode(65 + index)}
                              </div>
                              <span>{option}</span>

                              {showExplanation && index === questions[currentQuestion].correctAnswer && (
                                <CheckCircle2 className="ml-auto text-white h-6 w-6" />
                              )}

                              {showExplanation &&
                                index === selectedAnswer &&
                                index !== questions[currentQuestion].correctAnswer && (
                                  <XCircle className="ml-auto text-white h-6 w-6" />
                                )}
                            </div>
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Explanation */}
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-slate-700 rounded-lg"
                    >
                      <h3 className="font-bold text-white mb-1">Explanation:</h3>
                      <p className="text-white/90 mb-4">{questions[currentQuestion].explanation}</p>

                      {isLoadingExplanation ? (
                        <div className="flex items-center text-white/70 mt-4">
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                          <span>Getting AI-enhanced explanation...</span>
                        </div>
                      ) : error ? (
                        <div className="text-red-400 text-sm mt-2">{error}</div>
                      ) : aiExplanation ? (
                        <div className="mt-4 pt-4 border-t border-slate-600">
                          <h4 className="font-semibold text-blue-400 mb-1">AI-Enhanced Explanation:</h4>
                          <p className="text-white/90">{aiExplanation}</p>
                        </div>
                      ) : null}
                    </motion.div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-end">
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      disabled={selectedAnswer === null || showExplanation}
                      onClick={handleNextQuestion}
                    >
                      {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                    </Button>
                  </div>
                </>
              ) : (
                /* Quiz Results */
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
                  <div className="mb-8">
                    <div className="w-24 h-24 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-6">
                      <span className="text-4xl">🎓</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Quiz Completed!</h2>
                    <p className="text-xl text-white/80">
                      Your Score: {score}/{questions.length}
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600"
                        style={{ width: `${(score / questions.length) * 100}%` }}
                      ></div>
                    </div>

                    <div className="mt-6">
                      {score === questions.length ? (
                        <p className="text-green-400">Perfect score! You're an AI expert!</p>
                      ) : score >= questions.length * 0.7 ? (
                        <p className="text-blue-400">Great job! You have a solid understanding of AI concepts.</p>
                      ) : (
                        <p className="text-amber-400">
                          Good effort! Review the material and try again to improve your score.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Button variant="outline" onClick={handleRestartQuiz}>
                      Restart Quiz
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Download Certificate</Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Additional Resources */}
      {quizCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-8"
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recommended Resources</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">BSU AI Course</h4>
                  <p className="text-sm text-white/80 mb-2">
                    Enroll in Batangas State University's comprehensive AI and Data Science course.
                  </p>
                  <Button variant="link" className="text-blue-400 p-0">
                    Learn More
                  </Button>
                </div>

                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">Philippine AI Research</h4>
                  <p className="text-sm text-white/80 mb-2">
                    Explore current AI research projects focused on Philippine applications.
                  </p>
                  <Button variant="link" className="text-blue-400 p-0">
                    Browse Research
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
