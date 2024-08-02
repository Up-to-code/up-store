// Import necessary modules and functions
import connectToDatabase from "@/lib/db";
import { App } from "@/models/appModel"; // Adjust path as needed
import { NextResponse } from "next/server";

// Define the GET handler for the API route
export async function GET() {
  try {
    // Ensure database connection
    await connectToDatabase();
    
    // Fetch data from the database
    const data = await App.find();
    
    // Return the fetched data as JSON
    return NextResponse.json(data);
  } catch (error) {
    // Handle any errors and return a 500 response
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "Failed to fetch data" }, { status: 500 });
  }
}
