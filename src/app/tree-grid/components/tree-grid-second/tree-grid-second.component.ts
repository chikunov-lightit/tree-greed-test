import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  EditSettingsModel,
  FilterSettingsModel,
  RowPosition,
  SortSettingsModel,
  TreeGrid,
  TreeGridComponent
} from '@syncfusion/ej2-angular-treegrid';
import {SelectionSettingsModel} from '@syncfusion/ej2-treegrid/src/treegrid/models/selection-settings-model';
import {BeforeOpenCloseMenuEventArgs, ContextMenuComponent, MenuEventArgs, MenuItemModel} from '@syncfusion/ej2-angular-navigations';
import {DialogComponent} from '@syncfusion/ej2-angular-popups';
import {MenuActions} from '../../../helpers/menu-actions.enum';
import {ColumnDirective} from '@syncfusion/ej2-angular-treegrid/src/treegrid/columns.directive';
import {BehaviorSubject} from 'rxjs';
import {ColumnModel} from '@syncfusion/ej2-treegrid/src/treegrid/models/column';
import {map} from 'rxjs/operators';
import {AngularFireDatabase} from '@angular/fire/database';

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
  selector: 'tg-tree-grid-second',
  templateUrl: './tree-grid-second.component.html',
  styleUrls: ['./tree-grid-second.component.scss']
})
export class TreeGridSecondComponent implements OnInit, AfterViewInit {

  public get columns(): Partial<ColumnModel>[] {
    return this.columnsSubject.value;
  }

  public set columns(value: Partial<ColumnModel>[]) {
    this.columnsSubject.next(value);
  }

  constructor(private cd: ChangeDetectorRef, firestore: AngularFireDatabase) {
    firestore.list('/orders').valueChanges().subscribe(orders => {
      console.log('orders 1', orders);
      this.grid.dataSource = orders;   //intial data binding to grid
    });

    firestore.list('/orders').snapshotChanges().subscribe(orders => {
      console.log('orders 2', orders);
      this.grid.dataSource = orders; // sync server data changes to grid
    });
    // firestore.list('/orders').valueChanges().subscribe((orders: any) => {
    //   debugger
    //   this.data = orders;   // intial data binding to grid
    // });
    //
    // firestore.list('/orders').snapshotChanges().subscribe(orders => {
    //   debugger
    //   this.data = orders; // sync server data changes to grid
    // });

    // this.data = sampleData;
    this.sortSettings = {};
    this.filterSettings = {ignoreAccent: true, hierarchyMode: 'Parent'};
  }

  public nextUniqueId = 0;
  public defaultColumnData = {
    isPrimaryKey: true,
    editType: 'stringedit',
    minWidth: 90,
    defaultValue: '',
    customAttributes: {
      style: {
        fontSize: 12,
        color: '#000000ff',
        verticalAlign: 'center',
        backgroundColor: 'ffffffff',
        textWrap: 'none'
      }
    },
    textAlign: 'Left',
  };

  public columnHeaderTitle = '';
  public isEditColumnMode = false;

  // @ts-ignore
  public data: {}[];
  public pageSettings = {pageSize: 10};
  public sortSettings: SortSettingsModel;
  public filterSettings: FilterSettingsModel;
  public allowSorting = false;
  public allowFiltering = false;
  public copiedConfig: { records: {}[]; recordsMap: Map<string, any>, isCutting: boolean } | null = null;
  public frozenColumns = 0;
  public columnMenuItems: MenuItemModel[] = [
    {text: 'Style', id: MenuActions.styleColumn},
    {text: 'New', id: MenuActions.newColumn},
    {text: 'Del', id: MenuActions.delColumn},
    {text: 'Edit', id: MenuActions.editColumn},
    {text: 'Show', id: MenuActions.showColumns},
    {text: 'Freeze', id: MenuActions.freezeColumn, iconCss: 'fa fa-square-o'},
    {text: 'Filter', id: MenuActions.filter, iconCss: 'fa fa-square-o'},
    {text: 'Multi-Sort', id: MenuActions.multiSort, iconCss: 'fa fa-square-o'},
  ];
  public rowMenuItems: MenuItemModel[] = [
    {
      id: MenuActions.newRow, text: 'New', items: [
        {id: MenuActions.newRowBelow, text: 'New Below'},
        {id: MenuActions.newRowChild, text: 'New Child'},
      ]
    },
    {id: MenuActions.delRow, text: 'Del'},
    {id: MenuActions.editRow, text: 'Edit'},
    {id: MenuActions.multiSelectRow, text: 'Multi-Select', iconCss: 'fa fa-square-o'},
    {id: MenuActions.copyRow, text: 'Copy'},
    {id: MenuActions.cutRow, text: 'Cut'},
    {
      id: MenuActions.pasteRow, text: 'Paste', items: [
        {id: MenuActions.pasteRowSibling, text: 'Paste Sibling'},
        {id: MenuActions.pasteRowChild, text: 'Paste Child'}
      ]
    },
  ];
  public editSettings: EditSettingsModel = {
    allowDeleting: true,
    allowEditing: true,
    allowAdding: true,
    newRowPosition: 'Below',
    // allowEditOnDblClick: false,
    // showConfirmDialog: false,
    // showDeleteConfirmDialog: false,
    mode: 'Dialog'
  };
  public selectionSettings: SelectionSettingsModel = {type: 'Single', mode: 'Row', enableToggle: true};
  public columnsSubject = new BehaviorSubject<ColumnModel[]>(
    [
      {
        field: 'taskID',
        headerText: 'Task ID',
        isPrimaryKey: true,
        editType: 'numericedit',
        minWidth: 90,
        defaultValue: '0',
        customAttributes: {
          style: {
            fontSize: 12,
            color: '#000000ff',
            verticalAlign: 'center',
            backgroundColor: 'ffffffff',
            textWrap: 'none'
          }
        },
        textAlign: 'Left',
      },
      {
        field: 'taskName',
        headerText: 'Task Name',
        editType: 'dropdownedit',
        minWidth: 90,
        defaultValue: 'Bug fix',
        customAttributes: {
          style: {
            fontSize: 12,
            color: null,
            verticalAlign: 'center',
            backgroundColor: null,
            textWrap: 'none'
          }
        },
        textAlign: 'Left',
      },
      {
        field: 'startDate',
        headerText: 'Start Date',
        editType: 'datepickeredit',
        minWidth: 90,
        defaultValue: (new Date()).toLocaleDateString('en-US'),
        customAttributes: {
          style: {
            fontSize: 12,
            color: null,
            verticalAlign: 'center',
            backgroundColor: null,
            textWrap: 'none'
          }
        },
        textAlign: 'Left',
        format: 'yMd'
      },
      {
        field: 'endDate',
        headerText: 'End Date',
        editType: 'datepickeredit',
        minWidth: 90,
        defaultValue: (new Date()).toLocaleDateString('en-US'),
        customAttributes: {
          style: {
            fontSize: 12,
            color: null,
            verticalAlign: 'center',
            backgroundColor: null,
            textWrap: 'none'
          }
        },
        textAlign: 'Left',
        format: 'yMd'
      },
      {
        field: 'duration',
        headerText: 'Duration',
        editType: 'numericedit',
        minWidth: 90,
        defaultValue: '0',
        customAttributes: {
          style: {
            fontSize: 12,
            color: null,
            verticalAlign: 'center',
            backgroundColor: null,
            textWrap: 'none'
          }
        },
        textAlign: 'Left',
      },
      {
        field: 'progress',
        headerText: 'Progress',
        editType: 'numericedit',
        minWidth: 90,
        defaultValue: '0',
        customAttributes: {
          style: {
            fontSize: 12,
            color: null,
            verticalAlign: 'center',
            backgroundColor: null,
            textWrap: 'none'
          }
        },
        textAlign: 'Left',
      },
      {
        field: 'priority',
        headerText: 'Priority',
        editType: 'dropdownedit',
        minWidth: 90,
        defaultValue: 'Normal',
        customAttributes: {
          style: {
            fontSize: 12,
            color: null,
            verticalAlign: 'center',
            backgroundColor: null,
            textWrap: 'none'
          }
        },
        textAlign: 'Left',
      }
    ]
  );

  // createFormGroup(data: IOrderModel): FormGroup {
  //   return new FormGroup({
  //     type: new FormControl(data.OrderID, [Validators.required]),
  //     OrderDate: new FormControl(data.OrderDate, [Validators.required]),
  //     CustomerName: new FormControl(data.CustomerName, [Validators.required]),
  //     Freight: new FormControl(data.Freight),
  //     ShipAddress: new FormControl(data.ShipAddress),
  //     ShipCity: new FormControl(data.ShipCity),
  //     ShipCountry: new FormControl(data.ShipCountry)
  //   });
  // }

  public get displayColumns$(): any {
    return this.columnsSubject.asObservable().pipe(
      map(columns => columns.map(column => ({...column, customAttributes: this.prepareCustomAttributes(column.customAttributes)})))
    );
  }

  public toolbar = ['Add', 'Delete', 'Update', 'Cancel'];

  public selectedRow!: number;
  public selectedColumn!: number;

  // @ts-ignore
  @ViewChild('treegrid') public treeGrid: TreeGridComponent;
  // @ts-ignore
  @ViewChild('grid') public grid: TreeGridComponent;

  @ViewChild('columnContextMenu')
  public columnContextMenu!: ContextMenuComponent;
  @ViewChild('rowContextMenu')
  public rowContextMenu!: ContextMenuComponent;

  // @ts-ignore
  @ViewChild('styleDialog') public styleDialog: DialogComponent;
  @ViewChild('styleForm', {read: ElementRef, static: true}) public styleForm!: ElementRef;

  // @ts-ignore
  @ViewChild('columnDialog') public columnDialog: DialogComponent;
  @ViewChild('columnForm', {read: ElementRef, static: true}) public columnForm!: ElementRef;

  // @ts-ignore
  // @ViewChild('dialog') public alertDialog: DialogComponent;
  public visible = false;
  public position: any = {X: 100, Y: 100};
  public alertDlgButtons: {}[] = [{
    buttonModel: {
      isPrimary: true,
      content: 'Submit',
      cssClass: 'e-flat',
    },
    click: () => {
      // this.alertDialog.hide();
      // this.hide();
    }
  }];

  // @ViewChild('orderForm') public orderForm: FormGroup;
  // @ViewChild('OrderID') public orderID: ElementRef;
  // @ViewChild('CustomerName') public customerName: ElementRef;

  public selectedColumnData: Partial<ColumnDirective> = this.defaultColumnData;

  public prepareCustomAttributes(customAttributes: any): any {
    return {
      style: {
        ...customAttributes.style,
        fontSize: customAttributes.style.fontSize + 'px'
      }
    };
  }

  public ngOnInit(): void {
    // this.styleDialog.hide();
  }

  public ngAfterViewInit(): void {
    // this.treeGrid.columns = this.columns;
  }

  public listenColumnMenuEvent(args: MenuEventArgs): void {
    console.log('ColumnMenuEvent: ', args.item.id, 'column:', this.selectedColumn);
    switch (args.item.id) {
      case MenuActions.styleColumn:
        // debugger
        // this.treeGrid.autoFitColumns([]);
        // DialogUtility.confirm({
        //   title: 'Alert Dialog',
        //   content: this.styleForm.nativeElement,
        //   okButton: {  text: 'OK' },
        //   showCloseIcon: true,
        //   closeOnEscape: true,
        //   animationSettings: { effect: 'Zoom' }
        // });
        this.selectedColumnData = {...this.columns[this.selectedColumn]};
        this.styleDialog.show();
        console.log('styleForm: ', this.styleForm);
        // this.styleForm.form.patchValue(this.orderData);
        return;
      case MenuActions.newColumn:
        this.isEditColumnMode = false;
        this.columnHeaderTitle = '';
        this.columnDialog.show();
        return;
      case MenuActions.editColumn:
        debugger
        this.isEditColumnMode = true;
        // @ts-ignore
        this.columnHeaderTitle = this.columns[this.selectedColumn];
        this.columnDialog.show();
        return;
      case MenuActions.delColumn:
        const newColumns = [...this.columns];
        newColumns.splice(this.selectedColumn, 1);
        this.columnsSubject.next(newColumns);
        // this.deleteColumn(this.selectedColumn);
        return;
      case MenuActions.showColumns:
        this.showColumnChooser();
        return;
      case MenuActions.freezeColumn:
        this.freezeColumns();
        return;
      case MenuActions.filter:
        this.allowFiltering = !this.allowFiltering;
        return;
      case MenuActions.multiSort:
        this.allowSorting = !this.allowSorting;
    }
  }


  private freezeColumns(): void {
    if (this.frozenColumns) {
      this.frozenColumns = 0;
      return;
    }
    if (this.treeGrid.columns.length <= this.selectedColumn + 1) {
      this.frozenColumns = this.selectedColumn;
      return;
    }
    this.frozenColumns = this.selectedColumn + 1;
  }

  public listenRowMenuEvent(args: MenuEventArgs): void {
    console.log('RowMenuEvent: ', args.item.id, 'row:', this.selectedRow);
    switch (args.item.id) {
      case MenuActions.newRowBelow:
        this.updateNewRowPosition(args, 'Below');
        this.treeGrid.addRecord();
        return;
      case MenuActions.newRowChild:
        this.updateNewRowPosition(args, 'Child');
        this.treeGrid.addRecord();
        return;
      case MenuActions.delRow:
        this.treeGrid.deleteRecord();
        return;
      case MenuActions.editRow:
        if (this.treeGrid.editModule) {
          this.treeGrid.startEdit();
        }
        return;
      case MenuActions.multiSelectRow:
        this.toggleRowMultiSelection();
        return;
      case MenuActions.copyRow:
        this.copyRow();
        return;
      case MenuActions.cutRow:
        this.copyRow(true);
        return;
      case MenuActions.pasteRowSibling:
        debugger
        // let index = this.treeGridObj.selectedRowIndex;
        const newRowPosition: RowPosition = 'Below';
        this.updateNewRowPosition(args, newRowPosition);
        // this.treeGridObj.reorderRows(this.gridSelectedRecords.map(record => record));
        // this.treeGridObj.reorderRows([this.treeGridObj.getSelectedRowIndexes()[0]], this.treeGridObj.selectedRowIndex, 'Below');
        this.pasteRow();
        // debugger
        // if (this.treeGridObj.clipboardModule) {
        //   this.treeGridObj.paste();
        // }
        return;
      case MenuActions.pasteRowChild:
        debugger
        this.treeGrid.notify('savePreviousRowPosition', args);
        this.treeGrid.setProperties({editSettings: {newRowPosition: 'Child'}}, true);
        this.pasteRow();
        // const e = {
        //   toIndex: this.treeGridObj.selectedRowIndex,
        //   records: this.gridSelectedRecords,
        // };
        // this.treeGridObj.rowDragAndDropModule.rowsAdded(e);
        // this.pasteRow('Child');
        // this.treeGrid.deleteRecord();
        return;
    }
  }

  private copyRow(isCutting: boolean = false): void {
    const records = this.treeGrid.getSelectedRecords();
    this.copiedConfig = {
      records,
      recordsMap: new Map(records.map((record: any) => [record.uniqueID, record])),
      isCutting,
    };
    this.treeGrid.refreshColumns();
    this.columnContextMenu.enableItems([MenuActions.pasteRow]);
  }

  private updateNewRowPosition(args: MenuEventArgs, newRowPosition: RowPosition): void {
    this.treeGrid.notify('savePreviousRowPosition', args);
    this.treeGrid.setProperties({editSettings: {newRowPosition}}, true);
  }

  private pasteRow(position?: RowPosition): void {
    let index = this.selectedRow || this.treeGrid.selectedRowIndex;
    if (!this.copiedConfig?.records?.length || index === undefined) {
      return;
    }
    this.copiedConfig?.records.forEach((record) => {
      this.treeGrid.addRecord(record, index, position);
      if (this.copiedConfig?.isCutting) {
        this.treeGrid.deleteRecord(undefined, record);
      }
      index++;
    });
    this.copiedConfig = null;
    this.columnContextMenu.enableItems([MenuActions.pasteRow], false);
    this.treeGrid.clearSelection();
  }

  public addRecord(data?: {}, index?: number, position?: RowPosition): void {
    if (this.treeGrid.editModule) {
      const isAddedRowByMethod = 'isAddedRowByMethod';
      this.treeGrid.editModule[isAddedRowByMethod] = true;
      this.treeGrid.editModule.addRecord(data, index, position);
    }
  }

  private toggleRowMultiSelection(): void {
    const type = this.selectionSettings.type === 'Single' ? 'Multiple' : 'Single';
    this.selectionSettings = {...this.selectionSettings, type};
  }

  public onContextmenu(event: MouseEvent): void {
    console.log('onContextmenu: ', event.target);
    const elem: Element = event?.target as Element;


    const columnHeader = elem?.closest('.e-headercell');
    if (columnHeader) {
      console.log('Column Header', columnHeader);
      const index = columnHeader?.getAttribute('aria-colindex');
      if (!index) {
        return;
      }
      console.log('Column index', index);
      this.selectedColumn = +index;
      this.columnContextMenu.open(event.y, event.x);
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    const rowHeader = elem?.closest('.e-rowdragdropcell');
    if (rowHeader) {
      console.log('Row Header', rowHeader);
      const index = rowHeader?.closest('.e-row')?.getAttribute('aria-rowindex');
      if (!index) {
        return;
      }
      console.log('Row index', index);
      this.selectedRow = +index;
      this.rowContextMenu.target = elem.id;
      this.rowContextMenu.open(event.y, event.x);
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
  }

  public showColumnChooser(X?: number, Y?: number): void {
    this.treeGrid.columnChooserModule.openColumnChooser(X, Y);
  }

  // public addColumn(): void {
  //   this.isEditColumnMode = false;
  //   this.columnHeaderTitle = '';
  //   this.columnDialog.show();
  // }

  public deleteColumn(index: number): void {
    this.columns.splice(index, 1);
  }

  public beforeClose(args: BeforeOpenCloseMenuEventArgs): void {
    const elem = args.event.target as HTMLElement;
    const icon = elem.querySelector('.e-menu-icon');
    if (!icon) {
      return;
    }
    if (icon.classList.contains('fa-square-o')) {
      icon.classList.remove('fa-square-o');
      icon.classList.add('fa-check-square-o');
      return;
    }

    if (icon.classList.contains('fa-check-square-o')) {
      icon.classList.remove('fa-check-square-o');
      icon.classList.add('fa-square-o');
      return;
    }
  }

  public beforeItemRender(args: MenuEventArgs): void {
    // if(args.item.id === MenuActions.pasteRow) {
    //   args.element
    // }
  }

  public keyPressHandler(args: any): void {
    // debugger
    // if (args.action == 'ctrlPlusC') {
    //   this.gridSelectedRecords = this.treeGridObj.getSelectedRecords();
    // }
    // if (args.ctrlKey && args.code === 'KeyX') {
    //   this.gridSelectedRecords = this.treeGridObj.getSelectedRecords();
    //   this.treeGridObj.deleteRecord();
    // }
    // if (args.ctrlKey && args.code === 'KeyV') {
    //   // let index = this.treeGridObj.selectedRowIndex;
    //   // if (this.gridSelectedRecords.length) {
    //   //   this.gridSelectedRecords.forEach((record, i) => {
    //   //     this.treeGridObj.addRecord(record, index, 'Child');
    //   //     index++;
    //   //   });
    //   // }
    //   const e = {
    //     toIndex: this.treeGridObj.selectedRowIndex,
    //     records: this.gridSelectedRecords,
    //   };
    //   this.treeGridObj.rowDragAndDropModule.rowsAdded(e);
    // }
  }

  public rowDataBound(args: {
    data?: any;
    row?: Element;
    rowHeight?: number;
  }): void {

    if (!args) {
      return;
    }
    const uniqueID = args?.data?.uniqueID;
    const condition = !!this.copiedConfig?.recordsMap?.has(uniqueID);
    console.log('rowDataBound: ', uniqueID, this.copiedConfig?.recordsMap, condition);
    if (condition) {
      args?.row?.classList.add('copied-row');
    }
    // this.treeGridObj.getRowByIndex()
    // if(this.treeGridObj.getCheckedRecords()) {
    //
    // }
  }

  public dataStateChange(args: any): void {
    console.log('dataStateChange: ', args);
    // if (this.copiedConfig?.rows) {
    //   this.copiedConfig?.rows?.forEach((elem: Element) => {
    //     debugger
    //     elem.classList.add('copied-row');
    //   });
    // }
    // this.treeGrid.getSelectedRows().forEach((elem: Element) => {
    //   debugger
    //   elem.classList.add('copied-row');
    // });
  }


  // actionBegin(args: SaveEventArgs): void {
  //   if (args.requestType === 'beginEdit' || args.requestType === 'add') {
  //     this.orderData = Object.assign({}, args.rowData);
  //   }
  //   if (args.requestType === 'save') {
  //     if (this.orderForm.valid) {
  //       args.data = this.orderData;
  //     } else {
  //       args.cancel = true;
  //     }
  //   }
  // }
  //
  // actionComplete(args: DialogEditEventArgs): void {
  //   if (args.requestType === 'beginEdit' || args.requestType === 'add') {
  //     // Set initail Focus
  //     if (args.requestType === 'beginEdit') {
  //       (args.form.elements.namedItem('CustomerName') as HTMLInputElement).focus();
  //     } else if (args.requestType === 'add') {
  //       (args.form.elements.namedItem('OrderID') as HTMLInputElement).focus();
  //     }
  //
  //   }
  // }
  //
  public focusIn(event: any): void {
    event?.target?.parentElement?.classList.add('e-input-focus');
  }

  public focusOut(event: any): void {
    event?.target?.parentElement?.classList.remove('e-input-focus');
  }

  public saveStyleForm(): void {
    const newColumns = [...this.columns];
    newColumns[this.selectedColumn] = this.selectedColumnData;
    this.columnsSubject.next(newColumns);
    // this.treeGrid.columns = this.columns;
    // this.columns = [...this.columns];
    // this.treeGrid.columns[this.selectedColumn] = this.orderData;
    // this.treeGrid.refresh();
    // this.treeGrid.refreshColumns();
    this.styleDialog.hide();
  }

  public cancelStyleForm(): void {
    this.styleDialog.hide();
  }

  public saveColumnForm(): void {
    let newColumns: Partial<ColumnModel>[];
    debugger
    if (!this.isEditColumnMode) {
      // @ts-ignore
      const newColumn: Partial<ColumnModel> = {
        ...this.defaultColumnData,
        field: 'field' + this.nextUniqueId++,
        headerText: this.columnHeaderTitle,
      };
      newColumns = [
        ...this.columns,
        newColumn
      ];
    } else {
      newColumns = [...this.columns];
      newColumns[this.selectedColumn] = {
        ...this.selectedColumnData,
        headerText: this.columnHeaderTitle,
      };
    }

    this.columnsSubject.next(newColumns);
    this.columnDialog.hide();
    console.log('columns: ', this.treeGrid.columns);
  }

  public cancelColumnForm(): void {
    this.columnDialog.hide();
  }
}
