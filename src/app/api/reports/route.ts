import { NextRequest, NextResponse } from "next/server";
import { CreateReportSchema } from "@/server/validation/report.schema";
import * as reportService from "@/server/services/report.service";
import { ApiError } from "@/server/utils/api-error";

export async function GET() {
  try {
    const reports = await reportService.getAllReports();

    return NextResponse.json(reports);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const data = CreateReportSchema.parse(body);

    // Temporary until authentication is added
    const userId = "temp-user-id";

    const report = await reportService.createReport(data, userId);

    return NextResponse.json(report, {
      status: 201,
    });

  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      { message: "Invalid request" },
      { status: 400 }
    );
  }
}