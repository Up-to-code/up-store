"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import React from "react";

interface FormState {
  name: string;
  version: string;
  url: string;
  icon: string;
  images: string[];
  description: string;
  published: boolean;

}

const Page = () => {
  const [form, setForm] = React.useState<FormState>({
    name: "",
    version: "",
    url: "",
    icon: "",
    images: [],
    description: "",
    published: false,
   
  });
 const [loading, setLoading] = React.useState(false);
  const handleInputChange = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((old) => ({ ...old, [key]: e.target.value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setForm((old) => ({ ...old, published: checked }));
  };

  const handleCreate = async () => {
    // Handle form submission, e.g., sending form data to an API or database
    console.log("Form data:", form);
    setLoading(true);
     const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    console.log("API response:", data);

    setLoading(false);
    // Optionally clear form or redirect user if needed
    setForm({
      name: "",
      version: "",
      url: "",
      icon: "",
      images: [],
      description: "",
      published: false,
    });
  };

  return (
    <div className="w-full max-w-screen-lg m-auto px-11 my-10">
      <Card className="w-full flex justify-between min-h-14 items-center px-16 mb-3">
        <p>Create App</p>
        <Button onClick={handleCreate} disabled={loading}>
          {loading ? "Loading..." : "Create"}
        </Button>
      </Card>
      <div className="w-full flex gap-5">
        {form.icon && (
          <Image
            src={form.icon}
            alt="icon"
            width={200}
            height={200}
            className="w-52 h-52 border border-separate bg-zinc-900 text-white rounded"
          />
        )}
        <UploadButton
          className="w-52 h-52 border border-separate bg-zinc-900 text-white rounded"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            setForm((old) => ({ ...old, icon: res[0].url }));
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />

        <div className="flex gap-5 flex-col justify-center">
          <Input
            placeholder="Enter a name for your app"
            type="text"
            onChange={handleInputChange("name")}
          />
          <Input
            placeholder="Enter a version for your app"
            type="number"
            onChange={handleInputChange("version")}
          />
          <Input
            placeholder="Enter a URL for your app"
            type="text"
            onChange={handleInputChange("url")}
          />
          <Switch
            checked={form.published}
            onCheckedChange={handleSwitchChange}
          />
        </div>
      </div>
      <Card className="mt-5">
        <UploadButton
          className="w-full h-52 border border-separate bg-zinc-900 text-white rounded"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            console.log("Files: ", res);
            setForm((old) => ({ ...old, images: [...old.images, res[0].url] }));
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
        <div className="mt-5">
          <Card  className="mb-2 flex flex-wrap">
          
            {form.images.map((image, index) => (
              <Image 
                key={image}
                width={200}
                height={200} // Adjusted height for consistency
                src={image}
                alt={`Uploaded Image ${index + 1}`}
              />
            ))}
          </Card>
        </div>
      </Card>
      <Card className="mt-5">
        <Textarea
          placeholder="Enter a description"
          className="w-full h-52"
          value={form.description}
          onChange={(e) =>
            setForm((old) => ({ ...old, description: e.target.value }))
          }
        />
      </Card>
  
    </div>
  );
};

export default Page;
