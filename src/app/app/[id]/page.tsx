"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface AppDetails {
  _id: string;
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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Error: {error}</div>;

  if (!app) return <div className="text-center py-10">App not found</div>;

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 py-10 bg-gray-100">
      <Card className="flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        <div className="w-32 h-32 mb-6">
          <Image
            src={app.icon}
            alt={app.name}
            width={128}
            height={128}
            className="rounded-full border border-gray-300"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 text-center">
            {app.name}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 text-center mt-2">
            {app.description}
          </CardDescription>
        </CardHeader>

        <div className="w-full mt-4">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{ delay: 2000 }}
          >
            {app.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-[600px] relative">
                  <Image
                    src={image}
                    alt={`Screenshot ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg h-[600px] w-full"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex flex-col items-center mt-4">
          <span className="text-yellow-500 text-xl font-medium">{app.rating}</span>
          <span className="text-gray-600 text-sm ml-1">/ 5</span>
          <span className="text-gray-600 text-sm mt-1">{app.version}</span>
          <span className="text-gray-500 text-xs mt-1">Released on {new Date(app.createdAt).toLocaleDateString()}</span>
          <Button className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700" onClick={() => window.open(app.url, "_blank")}>
            Install
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Page;
