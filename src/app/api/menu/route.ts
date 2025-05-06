import { menuItems } from "@/app/data/menuItems";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = menuItems;

    if (!data) {
      return NextResponse.json(
        {
          status: false,
          statusCode: 404,
          message: "Data not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        statusCode: 200,
        message: "Success",
        data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
