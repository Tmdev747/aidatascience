import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function EmbedDocsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Embed Documentation</h1>
      <p className="text-lg mb-8">
        This page provides documentation for embedding InnovateHub AI demos in your website or application.
      </p>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>URL Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              You can customize the embedded demos by adding parameters to the embed URL. Here are the available
              parameters:
            </p>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parameter</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Values</TableHead>
                  <TableHead>Default</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono">demo</TableCell>
                  <TableCell>Sets the initial demo to display</TableCell>
                  <TableCell>smart-farming, neural-network, nlp, disaster-response, agriculture-ai</TableCell>
                  <TableCell>smart-farming</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">compact</TableCell>
                  <TableCell>Enables compact mode for limited spaces</TableCell>
                  <TableCell>true, false</TableCell>
                  <TableCell>false</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono">theme</TableCell>
                  <TableCell>Sets the color theme</TableCell>
                  <TableCell>dark, light, blue, green, purple</TableCell>
                  <TableCell>dark</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Example URLs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-1">Basic embed:</h3>
                <pre className="bg-slate-800 p-3 rounded-md overflow-x-auto">https://yourdomain.com/embed</pre>
              </div>

              <div>
                <h3 className="font-bold mb-1">Specific demo with light theme:</h3>
                <pre className="bg-slate-800 p-3 rounded-md overflow-x-auto">
                  https://yourdomain.com/embed?demo=neural-network&theme=light
                </pre>
              </div>

              <div>
                <h3 className="font-bold mb-1">Compact mode with blue theme:</h3>
                <pre className="bg-slate-800 p-3 rounded-md overflow-x-auto">
                  https://yourdomain.com/embed?compact=true&theme=blue
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Responsive Embedding</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              For responsive embedding, use the responsive size option in the embed helper, or set the width to 100% in
              your iframe code:
            </p>

            <pre className="bg-slate-800 p-3 rounded-md overflow-x-auto">
              {`<iframe 
  src="https://yourdomain.com/embed" 
  width="100%" 
  height="700" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen
  title="InnovateHub AI Demos">
</iframe>`}
            </pre>

            <p className="mt-4">You can also wrap the iframe in a responsive container to maintain aspect ratio:</p>

            <pre className="bg-slate-800 p-3 rounded-md overflow-x-auto">
              {`<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
  <iframe 
    src="https://yourdomain.com/embed" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen
    title="InnovateHub AI Demos">
  </iframe>
</div>`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
