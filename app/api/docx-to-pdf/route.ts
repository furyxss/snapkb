import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 180;

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: NextRequest) {
  const gotenbergUrl = process.env.GOTENBERG_URL;
  const gotenbergToken = process.env.GOTENBERG_TOKEN;

  if (!gotenbergUrl || !gotenbergToken) {
    return jsonError("DOCX to PDF conversion service is not configured.", 501);
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return jsonError("Please upload a DOCX file.");
  }

  const isDocx =
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.name.toLowerCase().endsWith(".docx");

  if (!isDocx) {
    return jsonError("Only .docx files are supported.");
  }

  const convertForm = new FormData();
  convertForm.append("files", file, file.name);

  const convertEndpoint = new URL("/forms/libreoffice/convert", gotenbergUrl);
  const response = await fetch(convertEndpoint, {
    method: "POST",
    headers: {
      "X-SnapKB-Token": gotenbergToken,
    },
    body: convertForm,
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    return jsonError(detail || "DOCX to PDF conversion failed.", response.status);
  }

  const outputName = file.name.replace(/\.docx$/i, ".pdf") || "converted-document.pdf";

  return new NextResponse(Buffer.from(await response.arrayBuffer()), {
    headers: {
      "Content-Disposition": `attachment; filename="${encodeURIComponent(outputName)}"`,
      "Content-Type": "application/pdf",
    },
  });
}
