import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import jspdf from 'jspdf';

@Component({
  selector: 'app-quotes-details',
  imports: [CommonModule,MatTabsModule,MatTableModule],
  templateUrl: './quotes-details.component.html',
  styleUrl: './quotes-details.component.css'
})
export class QuotesDetailsComponent implements OnInit {
  quote: any;
  displayedColumns: string[] = ['srNo', 'description', 'quantity', 'unitPrice', 'amount'];
  public dataSource = new MatTableDataSource<any>();
constructor(private router: Router,private http: HttpClient){}

ngOnInit(): void {
  this.quote = history.state.quote;
  this.getAllItems();
}
calculateTotalAmount(items: any[]): number {
  return items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
}
getAllItems(){
  this.dataSource.data = this.quote.items;
}
calculateAmount(element: any): number {
  return element.quantity * element.unitPrice;
}

downloadPdf() {
  // const element = document.getElementById('pdfContent'); 
  // if (!element) {
  //   console.error('PDF content not found!');
  //   return;
  // }

  var data = document.getElementById('pdfContent');  //Id of the table
  if (!data) {
    console.error('PDF content not found!');
    return;
  }
  html2canvas(data).then(canvas => {  
    // Few necessary setting options  
    let imgWidth = 208;   
    let pageHeight = 295;    
    let imgHeight = canvas.height * imgWidth / canvas.width;  
    let heightLeft = imgHeight;  

    const contentDataURL = canvas.toDataURL('image/png')  
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
    let position = 0;  
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
    pdf.save('MYPdf.pdf'); // Generated PDF   
  });  
  
}


}
