export default function EmbedDocsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Embedding Documentation</h1>

      <div className="prose prose-lg max-w-none">
        <h2>Quick Start</h2>
        <p>To embed an AI in Data Science module in your Replit application, add the following code to your HTML:</p>

        <pre className="bg-slate-800 text-white p-4 rounded-lg overflow-x-auto">
          {`<iframe 
  src="https://your-deployed-app.vercel.app/embed/intro?theme=replitLight" 
  width="100%" 
  height="600px" 
  style="border: none; border-radius: 8px;" 
  scrolling="no"
  title="AI in Data Science Module"
></iframe>

<script>
  window.addEventListener('message', (event) => {
    // In production, verify the origin
    // if (event.origin !== 'https://your-deployed-app.vercel.app') return;
    
    if (event.data.type === 'resize') {
      const iframe = document.querySelector('iframe');
      if (iframe) {
        iframe.style.height = \`\${event.data.height}px\`;
      }
    }
  });
</script>`}
        </pre>

        <h2>Available Modules</h2>
        <p>You can embed any of the following modules by changing the module name in the URL:</p>

        <ul>
          <li>
            <code>intro</code> - Introduction to AI in Data Science
          </li>
          <li>
            <code>machine-learning</code> - Machine Learning Fundamentals
          </li>
          <li>
            <code>neural-networks</code> - Neural Networks
          </li>
          <li>
            <code>nlp</code> - Natural Language Processing
          </li>
          <li>
            <code>computer-vision</code> - Computer Vision
          </li>
          <li>
            <code>applications</code> - Philippine AI Applications
          </li>
          <li>
            <code>quiz</code> - Assessment Quiz
          </li>
        </ul>

        <h2>Theme Options</h2>
        <p>You can customize the appearance of the embedded module by adding a theme parameter to the URL:</p>

        <ul>
          <li>
            <code>theme=default</code> - Dark theme with blue accents
          </li>
          <li>
            <code>theme=replitLight</code> - Light theme designed for Replit
          </li>
          <li>
            <code>theme=replitDark</code> - Dark theme designed for Replit
          </li>
        </ul>

        <h2>Custom Colors</h2>
        <p>You can further customize the appearance by adding color parameters to the URL:</p>

        <pre className="bg-slate-800 text-white p-4 rounded-lg overflow-x-auto">
          {`<iframe 
  src="https://your-deployed-app.vercel.app/embed/intro?theme=replitLight&bgColor=%23FFFFFF&textColor=%23000000&primaryColor=%23FF0000" 
  width="100%" 
  height="600px" 
  style="border: none;" 
  scrolling="no"
></iframe>`}
        </pre>

        <h2>Navigation Between Modules</h2>
        <p>You can implement navigation between modules by updating the iframe src attribute:</p>

        <pre className="bg-slate-800 text-white p-4 rounded-lg overflow-x-auto">
          {`<script>
  function changeModule(moduleName) {
    const iframe = document.querySelector('iframe');
    iframe.src = \`https://your-deployed-app.vercel.app/embed/\${moduleName}?theme=replitLight\`;
  }
  
  // Example usage
  document.getElementById('next-button').addEventListener('click', () => {
    changeModule('neural-networks');
  });
</script>`}
        </pre>

        <h2>Listening for Events</h2>
        <p>The embedded module sends messages that you can listen for:</p>

        <pre className="bg-slate-800 text-white p-4 rounded-lg overflow-x-auto">
          {`<script>
  window.addEventListener('message', (event) => {
    // Verify the origin in production
    // if (event.origin !== 'https://your-deployed-app.vercel.app') return;
    
    if (event.data.type === 'resize') {
      // Handle height change
      const iframe = document.querySelector('iframe');
      iframe.style.height = \`\${event.data.height}px\`;
    }
    
    if (event.data.type === 'moduleReady') {
      console.log(\`Module \${event.data.module} is ready\`);
    }
    
    if (event.data.type === 'changeModule') {
      console.log(\`User navigated to module: \${event.data.module}\`);
      // You can update UI to reflect the current module
    }
  });
</script>`}
        </pre>
      </div>
    </div>
  )
}
