import { getReportBySlug } from "../../../api/reports/getReportData";
import { getAbsoluteUrl } from "../../../utils/media";

export const prerender = false;

const filenameFor = (title: string) => `${title.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "report"}.pdf`;

export async function GET({ params }: { params: { slug?: string } }) {
  const report = params.slug ? await getReportBySlug(params.slug) : null;

  if (!report?.PDF?.url) {
    return new Response(null, { status: 404, statusText: "Not Found" });
  }

  const pdfResponse = await fetch(getAbsoluteUrl(report.PDF.url));

  if (!pdfResponse.ok || !pdfResponse.body) {
    return new Response(null, { status: 502, statusText: "Unable to download report" });
  }

  return new Response(pdfResponse.body, {
    headers: {
      "Content-Type": pdfResponse.headers.get("Content-Type") ?? "application/pdf",
      "Content-Disposition": `attachment; filename="${filenameFor(report.Title)}"`,
    },
  });
}
