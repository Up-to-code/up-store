import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex h-full w-full items-center justify-center min-h-screen">
      <SignIn />
    </div>
  );
}