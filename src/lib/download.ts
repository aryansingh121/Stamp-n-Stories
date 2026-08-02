import { toPng } from "html-to-image";
import jsPDF from "jspdf";

async function snap(el: HTMLElement) {
  const dataUrl = await toPng(el, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: "#FFF4E6",
  });
  const img = new Image();
  img.src = dataUrl;
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = rej;
  });
  return { dataUrl, width: img.width, height: img.height };
}

export async function downloadPNG(el: HTMLElement, filename: string) {
  const { dataUrl } = await snap(el);
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename + ".png";
  a.click();
}

export async function downloadPDF(el: HTMLElement, filename: string) {
  const { dataUrl, width, height } = await snap(el);

  // A4 in mm
  const pageW = 210;
  const pageH = 297;
  const imgW = pageW;
  const imgH = (height * imgW) / width;

  const pdf = new jsPDF("p", "mm", "a4");
  let heightLeft = imgH;
  let position = 0;

  pdf.addImage(dataUrl, "PNG", 0, position, imgW, imgH);
  heightLeft -= pageH;

  while (heightLeft > 0) {
    position = heightLeft - imgH;
    pdf.addPage();
    pdf.addImage(dataUrl, "PNG", 0, position, imgW, imgH);
    heightLeft -= pageH;
  }

  pdf.save(filename + ".pdf");
}
