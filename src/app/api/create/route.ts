import db from "@/lib/db";
import { App } from "@/models/appModel";
import { NextRequest, NextResponse } from "next/server";

// {
//     name: form.name,
//     description: form.description,
//     url: form.url,
//     icon: form.icon,
//     images: form.images,
//     published: form.published,
//     version: form.version,
//   }

export async function POST(request: NextRequest) {
  try {
    const { name, description, url, icon, images, published, version } =
      await request.json(); // Use request.json() directly

    // Ensure database connection or other setup
    await db();

    const NewApp = new App({
      name,
      description,
      url,
      icon,
      images,
      published,
      version,
    });

    try {
      await NewApp.save();
    } catch (error) {
      console.error("Error saving data:", error);
    }
    // Return a successful response
    return NextResponse.json(
      { message: "Data received successfully" },
      { status: 200 }
    );
  } catch (error) {
    // Handle errors and return a failure response
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
