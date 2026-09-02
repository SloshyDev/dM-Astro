import { forwardRef, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/16/solid";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import FacebookIcon from "../Assets/FacebookIcon";
import TwitterIcon from "../Assets/TwitterIcon";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

const PAGE_WIDTH = 550;
const PAGE_HEIGHT = 712;
const PAGE_RATIO = PAGE_WIDTH / PAGE_HEIGHT;
const SINGLE_PAGE_BREAKPOINT = 560;

const ReportPage = forwardRef(function ReportPage({ pageNumber, width }, ref) {
  return (
    <div ref={ref} data-density="soft" className="report-page flex h-full w-full items-center justify-center overflow-hidden bg-transparent">
      <Page pageNumber={pageNumber} width={width} renderTextLayer={false} renderAnnotationLayer={false} />
    </div>
  );
});

export default function ReportViewer({ pdfUrl, title, downloadUrl }) {
  const bookRef = useRef(null);
  const viewerRef = useRef(null);
  const documentLoadedRef = useRef(false);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(false);
  const [viewerMetrics, setViewerMetrics] = useState({ pageWidth: PAGE_WIDTH, pageHeight: PAGE_HEIGHT, layoutMode: "spread" });
  const shareUrl = typeof window === "undefined" ? "" : window.location.href;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const updateViewerMetrics = (availableWidth) => {
      const isSinglePage = availableWidth < SINGLE_PAGE_BREAKPOINT;
      const maxPageWidth = isSinglePage ? availableWidth : availableWidth / 2;
      const targetHeight = window.innerHeight * 0.8;
      const pageWidth = Math.floor(Math.min(maxPageWidth, targetHeight * PAGE_RATIO));
      const pageHeight = Math.floor(pageWidth / PAGE_RATIO);
      const layoutMode = isSinglePage ? "single" : "spread";

      setViewerMetrics((currentMetrics) =>
        currentMetrics.pageWidth === pageWidth && currentMetrics.pageHeight === pageHeight && currentMetrics.layoutMode === layoutMode
          ? currentMetrics
          : { pageWidth, pageHeight, layoutMode },
      );
    };

    const updateFromViewer = () => updateViewerMetrics(viewer.clientWidth);
    const observer = new ResizeObserver(updateFromViewer);
    observer.observe(viewer);
    window.addEventListener("resize", updateFromViewer);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateFromViewer);
    };
  }, []);

  const goToPreviousPage = () => bookRef.current?.pageFlip().flipPrev();
  const goToNextPage = () => bookRef.current?.pageFlip().flipNext();

  if (error) {
    return (
      <div className="rounded-xl bg-white p-8 text-center text-zinc-700">
        <p>We could not load this report preview.</p>
        <a className="text-teal-mid mt-4 inline-block font-bold underline" href={pdfUrl} target="_blank" rel="noopener noreferrer">
          Open the PDF in a new tab
        </a>
      </div>
    );
  }

  return (
    <div ref={viewerRef} className="report-viewer mx-auto w-full">
      {pages > 0 && (
        <div className="mb-4 flex max-w-6xl flex-wrap items-center justify-center gap-3 text-teal-dark sm:mx-auto sm:grid sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-5">
          <button
            type="button"
            aria-label="Spanish version"
            className="border-teal-mid bg-white text-teal-dark hover:bg-teal-mid inline-flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-sm font-bold shadow-sm transition hover:text-white dark:border-natura-mid dark:bg-teal-dark dark:text-white dark:hover:bg-teal-mid sm:justify-self-end">
            <img src="/Flags/MX.svg" alt="" className="size-6 rounded-full object-cover" />
            Spanish version
          </button>

          <div className="flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              aria-label="Previous page"
              title="Previous page"
              className="border-teal-mid bg-natura-mid text-teal-dark hover:bg-teal-mid grid size-9 place-items-center rounded-full border-2 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40">
              <ChevronDoubleLeftIcon className="size-7 text-white" aria-hidden="true" />
            </button>
            <p className="dark:text-natura-mid min-w-18 text-center font-bold">
              {currentPage + 1} / {pages}
            </p>
            <button
              type="button"
              onClick={goToNextPage}
              disabled={currentPage >= pages - 1}
              aria-label="Next page"
              title="Next page"
              className="border-teal-mid bg-natura-mid text-teal-dark hover:bg-teal-mid grid size-9 place-items-center rounded-full border-2 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40">
              <ChevronDoubleRightIcon className="size-7 text-white" aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-center gap-2 sm:justify-self-start">
            <ul className="flex items-center gap-2" aria-label="Share this report">
              <FacebookIcon size="size-4" link={facebookShareUrl} />
              <TwitterIcon size="size-4" link={twitterShareUrl} />
            </ul>
            <a
              href={downloadUrl}
              className="bg-teal-mid hover:bg-teal inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors">
              <ArrowDownTrayIcon className="size-5" aria-hidden="true" />
              Download PDF
            </a>
          </div>
        </div>
      )}

      <div className="report-book-stage relative mx-auto w-full">
        <Document
          file={pdfUrl}
          loading={<p className="text-teal-dark py-20 text-center">Loading report…</p>}
          onLoadSuccess={({ numPages }) => {
            setPages(numPages);
            if (!documentLoadedRef.current) {
              setCurrentPage(0);
              documentLoadedRef.current = true;
            }
          }}
          onLoadError={() => setError(true)}>
          {pages > 0 && (
            <HTMLFlipBook
              key={`${viewerMetrics.layoutMode}-${viewerMetrics.pageWidth}-${viewerMetrics.pageHeight}`}
              ref={bookRef}
              startPage={currentPage}
              width={viewerMetrics.pageWidth}
              height={viewerMetrics.pageHeight}
              size="stretch"
              minWidth={280}
              maxWidth={viewerMetrics.pageWidth}
              minHeight={363}
              maxHeight={viewerMetrics.pageHeight}
              maxShadowOpacity={0.45}
              showCover={false}
              mobileScrollSupport
              usePortrait
              className="report-flipbook mx-auto overflow-hidden"
              onFlip={(event) => setCurrentPage(event.data)}>
              {Array.from({ length: pages }, (_, index) => (
                <ReportPage key={index + 1} pageNumber={index + 1} width={viewerMetrics.pageWidth} />
              ))}
            </HTMLFlipBook>
          )}
        </Document>
      </div>

      <p className="mt-4 text-center text-sm text-zinc-500">Click or drag a corner to turn the page.</p>
      <span className="sr-only">{title}</span>
      <style>{`
        .report-page .react-pdf__Page,
        .report-page canvas {
          display: block;
          margin: 0 !important;
        }
      `}</style>
    </div>
  );
}
