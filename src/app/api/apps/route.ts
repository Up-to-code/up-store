import { App } from "@/models/appModel";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await App.find();
  
  return NextResponse.json(data);
}
