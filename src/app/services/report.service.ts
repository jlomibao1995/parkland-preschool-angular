import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }

  createPDF_HTML(id) {
    var element = document.getElementById(id);
    html2canvas(element).then(canvas => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth / canvas.width);

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 10;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.setProperties({
        title: "Report"
      });

      let blob = PDF.output('blob');
      window.open(URL.createObjectURL(blob), '_blank');
    })
  }

  createPDFReport(title, head, data) {
    let doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(title, 11, 8);
    doc.setFontSize(12);
    doc.setTextColor(100);

    (doc as any).autoTable({
      head: head,
      body: data,
      theme: 'striped',
      headStyles: {
        fillColor: "#4FA8F7",
        textColor: '#fafafa',
        fontStyle: 'bold',
        minCellHeight: 10
      },
      didDrawPage: data => {
        doc.text('Page ' + data.pageNumber, 170,290);
      }
    });

    let blob = doc.output('blob');
    window.open(URL.createObjectURL(blob), '_blank');
  }
}
