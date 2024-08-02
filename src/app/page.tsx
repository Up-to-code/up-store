"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface App {
  _id: number;
  name: string;
  description: string;
  icon: string;
  rating: number;
  url: string;
}

const Page: React.FC = () => {
  const [apps, setApps] = useState<App[]>([]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await fetch("/api/apps");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setApps(data);
      } catch (error) {
        console.error("Failed to fetch apps:", error);
      }
    };

    fetchApps();
  }, []);

  return (
    <div className="w-full max-w-screen-xl mx-auto py-10 bg-gray-100 px-10">
      <h1 className="text-3xl font-bold mb-6">Apps</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {apps.map((app) => (
          <Link href={`/app/${app._id}`} passHref key={app._id}>
            <Card
              key={app._id}
              className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <div className="w-24 h-24 mb-4">
                <Image
                  src={app.icon}
                  alt={app.name}
                  width={96}
                  height={96}
                  className="rounded-full border border-gray-300"
                />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900 text-center">
                {app.name}
              </CardTitle>

              <Link href={app.url} passHref>
                <Button className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700">
                  Install
                </Button>
              </Link>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
