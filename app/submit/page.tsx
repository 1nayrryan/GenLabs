import SubmitProjectForm from "@/components/SubmitProjectForm";

export default function SubmitPage() {
  return (
    <div className="section-padding">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Post a build</h1>
        <p className="text-muted mb-8">
          Share your project with the BCA community. Fill in the details below
          and we&apos;ll get it on the board.
        </p>
        <SubmitProjectForm />
      </div>
    </div>
  );
}
