import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DialogComponent} from '@syncfusion/ej2-angular-popups';
import {NgForm} from '@angular/forms';

export interface IOrderModel {
  OrderID?: number;
  CustomerName?: string;
  ShipCity?: string;
  OrderDate?: Date;
  Freight?: number;
  ShipCountry?: string;
  ShipAddress?: string;
}


@Component({
  selector: 'tg-style-dialog',
  templateUrl: './style-dialog.component.html',
  styleUrls: ['./style-dialog.component.scss']
})
export class StyleDialogComponent implements OnInit {
  @Input() public orderData!: any;
  // @ViewChild('styleDialog') public styleDialog: DialogComponent;
  @ViewChild('styleForm', {static: false}) public styleForm!: NgForm;

  constructor() { }

  ngOnInit(): void {
  }


  public focusIn(event: any): void {
    event?.target?.parentElement?.classList.add('e-input-focus');
  }

  public focusOut(event: any): void {
    event?.target?.parentElement?.classList.remove('e-input-focus');
  }
}
