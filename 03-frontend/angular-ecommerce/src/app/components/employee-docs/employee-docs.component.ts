import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import { Employee } from 'src/app/common/employee';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-docs',
  templateUrl: './employee-docs.component.html',
  styleUrls: ['./employee-docs.component.css']
})
export class EmployeeDocsComponent implements OnInit {
  @ViewChild('content', { static: false }) content!: ElementRef;

  employee: Employee | undefined;

  currentDate = new Date().toLocaleDateString();

  selectedDocumentType: 'employment' | 'salary' | 'other' = 'employment';

  constructor(private authService: AuthService, private employeeService: EmployeeService) {}

  ngOnInit() {
    this.authService.getUserEmail().subscribe((email) => {
      if (email) {
        this.employeeService.getEmployeeByEmail(email).subscribe((employee) => {
          this.employee = employee;
        });
      }
    });
  }

  downloadPDF() {
    if (!this.employee) return;

    const doc = new jsPDF('p', 'pt', 'a4');
    const margin = {
      top: 60,
      bottom: 60,
      left: 60,
      right: 60
    };

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);

    let currentY = margin.top;

    const addLine = (text: string, fontSize = 12, alignment: 'left' | 'center' | 'right' = 'left', bold = false) => {
      doc.setFont('helvetica', bold ? 'bold' : 'normal');
      doc.setFontSize(fontSize);
      let lines = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - margin.left - margin.right);
      const textWidth = doc.getStringUnitWidth(lines[0]) * fontSize / doc.internal.scaleFactor;
      const x = alignment === 'center' ? (doc.internal.pageSize.getWidth() - textWidth) / 2 : alignment === 'right' ? doc.internal.pageSize.getWidth() - margin.right - textWidth : margin.left;
      doc.text(lines, x, currentY, { align: alignment });
      currentY += lines.length * 10 + 20;
    };

    switch (this.selectedDocumentType) {
      case 'employment':
        addLine('Adeverinta de angajat', 18, 'center', true);
        doc.line(margin.left, currentY - 10, doc.internal.pageSize.getWidth() - margin.right, currentY - 10);
        currentY += 40;
        addLine(`Prin prezenta adeverinta, noi, compania HRLink, declaram ca ${this.employee.name} este angajatul nostru.`);
        addLine(`Functia ocupata de acesta este ${this.employee.jobTitle}.`);
        addLine(`Telefonul de contact al acestuia este ${this.employee.phone} si poate fi contactat pe email la adresa ${this.employee.email}.`);
        addLine(`Prezenta adeverinta este eliberata la cererea interesatului in vederea prezentarii la institutii sau autoritati competente.`);
        break;
      case 'salary':
        addLine('Adeverinta de salariu', 18, 'center', true);
        doc.line(margin.left, currentY - 10, doc.internal.pageSize.getWidth() - margin.right, currentY - 10);
        currentY += 40;
        addLine(`Acesta este un exemplu de adeverinta de salariu pentru ${this.employee.name}.`);
        break;
    }

    addLine(`Data emiterii: ${this.currentDate}`, 12, 'right');

    doc.save('adeverinta.pdf');
    doc.output('dataurlnewwindow');
  }
}
