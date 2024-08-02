import { SignOutButton } from "@clerk/nextjs";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

interface NavbarProps {
  name: string;
}
function Navbar({ name }: NavbarProps) {
  return (
    <Card className="w-full flex justify-between min-h-14 items-center px-16 mb-3">
      <p>{name}</p>

      <div className="flex gap-8">
        <Link href="/admin/create">
        <Button >Create</Button>
        </Link>
        <SignOutButton>
          <Button>Sign out</Button>
        </SignOutButton>
      </div>
    </Card>
  );
}

export default Navbar;
