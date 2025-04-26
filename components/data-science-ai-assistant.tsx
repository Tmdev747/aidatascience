"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, BarChart, Database, AlertCircle } from "lucide-react"
import AIChatInterface from "@/components/ai-chat-interface"
import ErrorBoundary from "@/components/error-boundary"

export default function DataScienceAIAssistant() {
  const [activeTab, setActiveTab] = useState("chat")
  const [sqlQuery, setSqlQuery] = useState("")
  const [sqlResult, setSqlResult] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [datasetText, setDatasetText] = useState("")
  const [analysisResult, setAnalysisResult] = useState("")
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const handleSqlGeneration = async () => {
    if (!sqlQuery.trim()) return

    setIsProcessing(true)
    setSqlResult("")
    setError(null)

    // Create a new AbortController for this request
    abortControllerRef.current = new AbortController()
    const signal = abortControllerRef.current.signal

    try {
      const response = await fetch("/api/generate-sql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: sqlQuery }),
        signal,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Failed to generate SQL")
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error("Response body is not readable")
      }

      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        if (value) {
          const chunkValue = decoder.decode(value)
          setSqlResult((prev) => prev + chunkValue)
        }
      }
    } catch (err) {
      console.error("Error generating SQL:", err)
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err.message || "Failed to generate SQL. Please try again.")
      }
      if (sqlResult.length === 0) {
        setSqlResult("Error: Request failed or was cancelled. Please try again.")
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const cancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setIsProcessing(false)
    }
  }

  const handleDataAnalysis = async () => {
    if (!datasetText.trim()) return

    setIsProcessing(true)
    setAnalysisResult("")
    setError(null)

    // Create a new AbortController for this request
    abortControllerRef.current = new AbortController()
    const signal = abortControllerRef.current.signal

    try {
      const response = await fetch("/api/analyze-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: datasetText }),
        signal,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Failed to analyze data")
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error("Response body is not readable")
      }

      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        if (value) {
          const chunkValue = decoder.decode(value)
          setAnalysisResult((prev) => prev + chunkValue)
        }
      }
    } catch (err) {
      console.error("Error analyzing data:", err)
      if (err instanceof Error && err.name !== "AbortError") {
        setError(err.message || "Failed to analyze data. Please try again.")
      }
      if (analysisResult.length === 0) {
        setAnalysisResult("Error: Request failed or was cancelled. Please try again.")
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const sampleDatasets = [
    {
      name: "Philippine Rice Production",
      data: `year,region,production_tons,area_hectares,yield_per_hectare
2018,Central Luzon,3245000,754000,4.30
2019,Central Luzon,3320000,760000,4.37
2020,Central Luzon,3180000,745000,4.27
2018,Western Visayas,2150000,605000,3.55
2019,Western Visayas,2210000,610000,3.62
2020,Western Visayas,2080000,600000,3.47
2018,Cagayan Valley,2760000,650000,4.25
2019,Cagayan Valley,2820000,655000,4.31
2020,Cagayan Valley,2650000,640000,4.14`,
    },
    {
      name: "Manila Traffic Incidents",
      data: `date,district,incident_type,vehicles_involved,injuries,time_of_day
2023-01-15,Makati,Collision,3,2,Morning
2023-01-22,Quezon City,Sideswipe,2,0,Evening
2023-02-05,Manila,Rear-end,2,1,Afternoon
2023-02-18,Pasig,Collision,4,3,Morning
2023-03-02,Makati,Pedestrian,1,1,Night
2023-03-15,Quezon City,Rear-end,2,0,Afternoon
2023-04-01,Manila,Sideswipe,2,0,Evening
2023-04-12,Pasig,Collision,3,2,Morning
2023-05-05,Makati,Rear-end,2,0,Afternoon`,
    },
  ]

  const loadSampleData = (index: number) => {
    setDatasetText(sampleDatasets[index].data)
  }

  const sampleQueries = [
    "Show me the average monthly sales by product category for the last year",
    "Find customers who haven't made a purchase in the last 6 months",
    "Calculate the total rice production by region and year",
    "Identify the top 5 districts with the most traffic incidents",
  ]

  return (
    <ErrorBoundary>
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">Data Science AI Assistant</h2>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="bg-slate-700">
              <TabsTrigger value="chat">AI Data Scientist</TabsTrigger>
              <TabsTrigger value="sql">SQL Generator</TabsTrigger>
              <TabsTrigger value="analysis">Data Analyzer</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="pt-4">
              <AIChatInterface
                title="Data Science Expert"
                placeholder="Ask about data science techniques, analysis methods, or AI applications..."
                context="The user is learning about data science and AI applications in the Philippines context."
                initialMessage={`Hello! I'm your Data Science AI assistant. I can help explain data science concepts, 
                analysis techniques, machine learning models, and how they're being applied in the Philippines.
                What would you like to know about data science or AI?`}
              />

              <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
                <h4 className="font-semibold text-white mb-1">Suggested Questions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start text-left h-auto py-1 text-xs"
                    onClick={() => document.getElementById("chat-input")?.focus()}
                  >
                    How is machine learning being used in Philippine agriculture?
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start text-left h-auto py-1 text-xs"
                    onClick={() => document.getElementById("chat-input")?.focus()}
                  >
                    Explain how clustering algorithms work with an example.
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start text-left h-auto py-1 text-xs"
                    onClick={() => document.getElementById("chat-input")?.focus()}
                  >
                    What data preprocessing techniques should I use for time series data?
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start text-left h-auto py-1 text-xs"
                    onClick={() => document.getElementById("chat-input")?.focus()}
                  >
                    How can I evaluate the performance of a classification model?
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sql" className="pt-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="sql-query" className="block text-sm font-medium text-white mb-2">
                    Describe what you want to query in natural language:
                  </label>
                  <Textarea
                    id="sql-query"
                    value={sqlQuery}
                    onChange={(e) => setSqlQuery(e.target.value)}
                    placeholder="e.g., Show me the total sales by region for the last quarter"
                    className="bg-slate-700 border-slate-600 text-white h-24"
                    aria-describedby="sql-query-help"
                  />
                  <p id="sql-query-help" className="text-xs text-white/60 mt-1">
                    Describe your query in plain English, and the AI will convert it to SQL.
                  </p>
                </div>

                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">Try these examples:</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {sampleQueries.map((query, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setSqlQuery(query)}
                        className="text-xs bg-slate-600 border-slate-500 text-white"
                      >
                        {query}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center gap-2">
                  <Button
                    onClick={handleSqlGeneration}
                    disabled={isProcessing || !sqlQuery.trim()}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating SQL...
                      </>
                    ) : (
                      <>
                        <Database className="h-4 w-4" />
                        Generate SQL Query
                      </>
                    )}
                  </Button>
                  {isProcessing && (
                    <Button onClick={cancelRequest} variant="destructive" className="flex items-center gap-2">
                      Cancel
                    </Button>
                  )}
                </div>

                {error && (
                  <div className="bg-red-900/30 border border-red-800 rounded-lg p-3 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <p className="text-white/90 text-sm">{error}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Generated SQL:</h3>
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-white/90 overflow-x-auto">
                    {isProcessing ? (
                      <div className="flex items-center justify-center h-32">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                      </div>
                    ) : sqlResult ? (
                      <pre className="whitespace-pre-wrap">{sqlResult}</pre>
                    ) : (
                      <div className="text-slate-500 text-center py-8">SQL query will appear here</div>
                    )}
                  </div>
                </div>

                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">How It Works</h4>
                  <p className="text-sm text-white/80">
                    This tool uses AI to translate natural language questions into SQL queries. It understands database
                    concepts and can generate complex queries based on your description. In real-world applications,
                    this technology helps non-technical users access and analyze data without needing to know SQL
                    syntax.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="pt-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="dataset-input" className="block text-sm font-medium text-white mb-2">
                    Paste your CSV data:
                  </label>
                  <Textarea
                    id="dataset-input"
                    value={datasetText}
                    onChange={(e) => setDatasetText(e.target.value)}
                    placeholder="Paste CSV data here..."
                    className="bg-slate-700 border-slate-600 text-white h-32 font-mono text-sm"
                    aria-describedby="dataset-help"
                  />
                  <p id="dataset-help" className="text-xs text-white/60 mt-1">
                    Paste CSV data with headers in the first row. The AI will analyze the data and provide insights.
                  </p>
                </div>

                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">Or use sample data:</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loadSampleData(0)}
                      className="text-xs bg-slate-600 border-slate-500 text-white"
                    >
                      Philippine Rice Production
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => loadSampleData(1)}
                      className="text-xs bg-slate-600 border-slate-500 text-white"
                    >
                      Manila Traffic Incidents
                    </Button>
                  </div>
                </div>

                <div className="flex justify-center gap-2">
                  <Button
                    onClick={handleDataAnalysis}
                    disabled={isProcessing || !datasetText.trim()}
                    className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing Data...
                      </>
                    ) : (
                      <>
                        <BarChart className="h-4 w-4" />
                        Analyze Data
                      </>
                    )}
                  </Button>
                  {isProcessing && (
                    <Button onClick={cancelRequest} variant="destructive" className="flex items-center gap-2">
                      Cancel
                    </Button>
                  )}
                </div>

                {error && (
                  <div className="bg-red-900/30 border border-red-800 rounded-lg p-3 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <p className="text-white/90 text-sm">{error}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Analysis Results:</h3>
                  <div className="bg-slate-700/50 rounded-lg p-4 text-white/90 overflow-y-auto max-h-80">
                    {isProcessing ? (
                      <div className="flex items-center justify-center h-32">
                        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                      </div>
                    ) : analysisResult ? (
                      <div className="whitespace-pre-wrap">{analysisResult}</div>
                    ) : (
                      <div className="text-slate-400 text-center py-8">
                        Paste data and click "Analyze Data" to see insights
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">How It Works</h4>
                  <p className="text-sm text-white/80">
                    This tool uses AI to analyze your dataset and provide insights. It can identify patterns, trends,
                    outliers, and correlations in your data. The AI examines the structure of your data, performs
                    statistical analysis, and generates visualizations to help you understand your data better. This
                    technology is being used in Philippine businesses and research institutions to extract valuable
                    insights from complex datasets.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </ErrorBoundary>
  )
}
