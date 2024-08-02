
import { App } from "@/models/appModel";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    // Check if the id is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid app ID" }, { status: 400 });
    }
    
    // Fetch the app from the database
    const app = await App.findById(id);
    
    if (!app) {
      return NextResponse.json({ error: "App not found" }, { status: 404 });
    }
    
    return NextResponse.json(app);
  } catch (error) {
    console.error("Error fetching app:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
