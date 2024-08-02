import { ChartApp } from "@/components/admin/chartApps";
import { ChartViews } from "@/components/admin/ChartView";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { currentUser } from "@clerk/nextjs/server";
import { Edit2, OptionIcon } from "lucide-react";

export default async function Page() {
  const user = await currentUser();

  if (!user) return <div>Not signed in</div>;

  return (
    <div className="min-h-screen">
      {/* this is header */}
      <div className="flex flex-wrap px-12 justify-between">
        {/* <Header user={user} /> */}
        <ChartViews />
        <ChartApp />
      </div>

      {/* this is tabels */}
      <Table  className="w-auto mt-5 min-w-[700px] mx-16">
        <TableHeader>
          <TableRow>
            <TableHead>App</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Options</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>App 1</TableCell>
            <TableCell>100</TableCell>
            <TableCell>
              <Button   className="gap-2">
                Edit <Edit2 size={20}/>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
