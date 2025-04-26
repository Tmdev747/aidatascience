import type { Metadata } from "next"
import DataScienceAIAssistant from "@/components/data-science-ai-assistant"

export const metadata: Metadata = {
  title: "Data Science AI Applications",
  description: "Interactive AI applications for data science",
}

export default function DataSciencePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-white mb-6">Data Science AI Applications</h1>

      <p className="text-white/80 mb-8">
        Explore how AI is transforming data science with these interactive demos. Ask questions to our AI data
        scientist, generate SQL from natural language, and analyze datasets with AI-powered insights.
      </p>

      <div className="mb-10">
        <DataScienceAIAssistant />
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-bold text-white mb-4">About AI in Data Science</h2>

        <p className="text-white/80 mb-4">
          Artificial Intelligence is revolutionizing how we work with data, making advanced analytics accessible to more
          people and organizations. In the Philippines, AI-powered data science is being applied across various sectors:
        </p>

        <ul className="list-disc list-inside text-white/80 space-y-2 mb-6">
          <li>
            <span className="font-semibold">Agriculture</span> - Analyzing crop yields, soil conditions, and weather
            patterns to optimize farming practices
          </li>
          <li>
            <span className="font-semibold">Healthcare</span> - Predicting disease outbreaks, optimizing resource
            allocation, and improving patient outcomes
          </li>
          <li>
            <span className="font-semibold">Urban Planning</span> - Analyzing traffic patterns, population density, and
            infrastructure needs
          </li>
          <li>
            <span className="font-semibold">Business Intelligence</span> - Extracting insights from customer data, sales
            trends, and market conditions
          </li>
          <li>
            <span className="font-semibold">Disaster Management</span> - Predicting and responding to natural disasters
            through data analysis
          </li>
        </ul>

        <p className="text-white/80">
          The interactive demos above showcase just a few ways AI is making data science more accessible and powerful.
          By combining natural language processing with advanced analytics, these tools allow users to interact with
          data in intuitive ways, without requiring specialized technical knowledge.
        </p>
      </div>
    </div>
  )
}
