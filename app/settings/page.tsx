import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AppHealthMonitor from "@/components/app-health-monitor"
import ErrorBoundary from "@/components/error-boundary"

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="ai">AI Configuration</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
                <CardDescription>Configure how the application looks and behaves</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Display settings content will go here</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility</CardTitle>
                <CardDescription>Configure accessibility settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Accessibility settings content will go here</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Model Selection</CardTitle>
                <CardDescription>Choose which AI models to use for different features</CardDescription>
              </CardHeader>
              <CardContent>
                <p>AI model selection content will go here</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage your API keys for AI services</CardDescription>
              </CardHeader>
              <CardContent>
                <p>API key management content will go here</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system">
          <div className="grid gap-6">
            <ErrorBoundary>
              <AppHealthMonitor />
            </ErrorBoundary>

            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
                <CardDescription>View and optimize application performance</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Performance monitoring content will go here</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
