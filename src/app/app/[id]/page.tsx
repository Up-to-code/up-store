"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useSpring, animated } from '@react-spring/web';

interface AppDetails {
  id: string;
  name: string;
  description: string;
  icon: string;
  rating: number;
  url: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  images: string[];
}

const Page: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;
  const [app, setApp] = useState<AppDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppDetails = async () => {
      if (!id) return; // Ensure id is available
      try {
        const response = await fetch(`/api/apps/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch app details');
        }
        const data = await response.json();
        setApp(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppDetails();
  }, [id]);

  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 200,
  });

  if (loading) return <Skeleton className="h-80 w-full" />;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;
  if (!app) return <div className="text-center py-10">App not found</div>;

  return (
    <animated.div style={fadeIn} className="w-full max-w-screen-lg mx-auto px-4 py-10 bg-gray-100">
      <Card className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        <CardHeader className="flex flex-col items-center mb-4">
          <div className="w-20 h-20 mb-4">
            <Image
              src={app.icon}
              alt={app.name}
              width={80}
              height={80}
              className="rounded-full border border-gray-300"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 text-center">
            {app.name} <span className="text-lg text-gray-500">v{app.version}</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription className="text-sm text-gray-600 text-center mb-6">
            {app.description}
          </CardDescription>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {app.images.map((image, index) => (
              <animated.div key={index} style={fadeIn} className="relative w-full h-48">
                <Image
                  src={image}
                  alt={`Screenshot ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg border border-gray-300"
                />
              </animated.div>
            ))}
          </div>

        </CardContent>

        <CardFooter className="w-full">
          <Button
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => window.open(app.url, '_blank')}
          >
            Install
          </Button>
        </CardFooter>
      </Card>
    </animated.div>
  );
};

export default Page;
