import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: NextRequest) {
  const secret = process.env.CONVERTAPI_SECRET;
  if (!secret) {
    return jsonError("High-fidelity DOCX to PDF conversion is not configured.", 501);
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

  const convertUrl = new URL("https://v2.convertapi.com/convert/docx/to/pdf");
  convertUrl.searchParams.set("Secret", secret);

  const response = await fetch(convertUrl, {
    method: "POST",
    headers: {
      Accept: "application/octet-stream, application/json",
      "Content-Disposition": `attachment; filename="${encodeURIComponent(file.name)}"`,
      "Content-Type": "application/octet-stream",
    },
    body: Buffer.from(await file.arrayBuffer()),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    return jsonError(detail || "DOCX to PDF conversion failed.", response.status);
  }

  const contentType = response.headers.get("content-type") || "";
  const outputName = file.name.replace(/\.docx$/i, ".pdf") || "converted-document.pdf";

  if (contentType.includes("application/json")) {
    const result = await response.json();
    const fileData = result?.Files?.[0]?.FileData;
    const fileUrl = result?.Files?.[0]?.FileUrl;

    if (fileData) {
      return new NextResponse(Buffer.from(fileData, "base64"), {
        headers: {
          "Content-Disposition": `attachment; filename="${encodeURIComponent(outputName)}"`,
          "Content-Type": "application/pdf",
        },
      });
    }

    if (fileUrl) {
      const pdfResponse = await fetch(fileUrl);
      if (!pdfResponse.ok) {
        return jsonError("Converted PDF could not be downloaded.", 502);
      }

      return new NextResponse(Buffer.from(await pdfResponse.arrayBuffer()), {
        headers: {
          "Content-Disposition": `attachment; filename="${encodeURIComponent(outputName)}"`,
          "Content-Type": "application/pdf",
        },
      });
    }

    return jsonError("Conversion completed without a downloadable PDF.", 502);
  }

  return new NextResponse(Buffer.from(await response.arrayBuffer()), {
    headers: {
      "Content-Disposition": `attachment; filename="${encodeURIComponent(outputName)}"`,
      "Content-Type": "application/pdf",
    },
  });
}
