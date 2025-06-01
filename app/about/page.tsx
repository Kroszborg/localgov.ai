export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">About LocalGov.AI</h1>
          <p className="text-muted-foreground text-lg">
            LocalGov.AI is your AI-powered guide to understanding local government laws and policies 
            in plain English. We believe that access to clear legal information should be available 
            to everyone.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <p className="text-muted-foreground">
            We aim to bridge the gap between complex legal language and everyday understanding, 
            making local government policies accessible to all citizens through the power of AI 
            technology.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Important Disclaimer</h2>
          <div className="bg-muted p-4 rounded-lg text-muted-foreground">
            <p>
              LocalGov.AI provides general information about local laws and policies but should not 
              be considered legal advice. While we strive for accuracy, you should always consult 
              with a qualified legal professional for specific legal matters. The AI-generated 
              explanations are meant to help understand the law but are not legally binding 
              interpretations.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p className="text-muted-foreground">
            Have questions or feedback? We'd love to hear from you. Reach out to our team at{" "}
            <a href="mailto:support@localgov.ai" className="text-primary hover:underline">
              support@localgov.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}