import { Plus } from "lucide-react";
import React from "react";

import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

function Header({ user }: any) {
  return (
    <Card className="w-96 m-auto">
      <CardHeader>
        <CardTitle>Welcome {user.firstName}</CardTitle>
        <CardDescription>
          this is admin page you can do anything
        </CardDescription>
        <Link href="/admin/create">
          <Button className="my-5">
            Create <Plus className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
    </Card>
  );
}

export default Header;
