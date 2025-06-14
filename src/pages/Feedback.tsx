
import FeedbackForm from "@/components/feedback/FeedbackForm";

const Feedback = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Submit Feedback</h1>
        <p className="text-lg text-muted-foreground mb-8 text-center">
          We'd love to hear your thoughts! What's working well, what could be improved?
        </p>
        <FeedbackForm />
      </div>
    </div>
  );
};

export default Feedback;
