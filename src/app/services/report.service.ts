import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }

  printReportPDF(id) {
    var element = document.getElementById(id);
    html2canvas(element).then(canvas => {
      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

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
}
