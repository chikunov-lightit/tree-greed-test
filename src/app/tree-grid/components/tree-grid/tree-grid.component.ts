import {Component, OnInit, ViewChild} from '@angular/core';
import {EditSettingsModel, FilterSettingsModel, SortSettingsModel, TreeGrid} from '@syncfusion/ej2-angular-treegrid';
import {SelectionSettingsModel} from '@syncfusion/ej2-treegrid/src/treegrid/models/selection-settings-model';
import {ContextMenuComponent, MenuEventArgs, MenuItemModel} from '@syncfusion/ej2-angular-navigations';
import {DialogComponent} from '@syncfusion/ej2-angular-popups';
import {sampleData} from '../../../helpers/datasource';
import {BeforeOpenCloseEventArgs} from '@syncfusion/ej2-inputs';

@Component({
  selector: 'tg-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.scss']
})
export class TreeGridComponent implements OnInit {
  public data: {}[];
  public pageSettings: {};
  public sortSettings: SortSettingsModel;
  public filterSettings: FilterSettingsModel;
  public contextMenuItems: {}[];
  public editSettings: EditSettingsModel;
  public selectionSettings: SelectionSettingsModel;
  public toolbarOptions: {}[];
  public menuItems: MenuItemModel[] = [
    // {
    //   text: 'Cut',
    //   iconCss: 'e-cm-icons e-cut'
    // },
    // {
    //   text: 'Copy',
    //   iconCss: 'e-cm-icons e-copy'
    // },
    // {
    //   text: 'Paste',
    //   iconCss: 'e-cm-icons e-paste',
    // },
    // {
    //   separator: true,
    // },
    // {
    //   text: 'Flipkart',
    //   iconCss: 'e-cart-icon e-link',
    //   url: 'https://www.google.co.in/search?source=hp&q=flipkart'
    // },
    // {
    //   text: 'Amazon',
    //   iconCss: 'e-cart-icon e-link',
    //   url: 'https://www.google.co.in/search?q=amazon'
    // },
    // {
    //   text: 'Snapdeal',
    //   iconCss: 'e-cart-icon e-link',
    //   url: 'https://www.google.co.in/search?q=snapdeal'
    // },
    // {
    //   separator: true,
    // },
    {
      text: 'Save as...'
    },
    {
      text: 'View page source'
    },
    {
      text: 'Inspect'
    }];
  public columns: any[] = [
    {field: 'taskID', headerText: 'Task ID', textAlign: 'Right', width: 90},
    {field: 'taskName', headerText: 'Task Name', width: 240, showInColumnChooser: false},
    {field: 'startDate', headerText: 'Start Date', width: 110, format: 'yMd'},
    {field: 'endDate', headerText: 'End Date', width: 110, textAlign: 'Right', type: 'date', format: 'yMd'},
    {field: 'duration', headerText: 'Duration', width: 100, textAlign: 'Right'},
    {field: 'progress', headerText: 'Progress', width: 100, textAlign: 'Right'},
    {field: 'priority', headerText: 'Priority', width: 90}
  ];

  // @ts-ignore
  @ViewChild('treegrid') public treeGridObj: TreeGridComponent;

  @ViewChild('contextmenu')
  public contextmenu!: ContextMenuComponent;

  // @ts-ignore
  @ViewChild('dialog') public alertDialog: DialogComponent;
  public visible = false;
  public position: any = {X: 100, Y: 100};
  public alertDlgButtons: {}[] = [{
    buttonModel: {
      isPrimary: true,
      content: 'Submit',
      cssClass: 'e-flat',
    },
    click: () => {
      this.alertDialog.hide();
      // this.hide();
    }
  }];

  constructor() {
    this.data = sampleData;
    this.pageSettings = {pageSize: 5};
    this.sortSettings = {columns: [{field: 'taskName', direction: 'Ascending'}, {field: 'taskID', direction: 'Descending'}]};
    this.filterSettings = {ignoreAccent: true, hierarchyMode: 'Parent'};
    this.contextMenuItems = [
      {text: 'Style', iconCss: 'fa fa-shopping-cart'},
      {text: 'New'},
      {text: 'Del'},
      {text: 'Edit'},
      {text: 'Show'},
      {text: 'Freeze'},
      {text: 'Filter'},
      {text: 'Multi-Sort'},
      {
        separator: true,
      },
      {text: 'New'},
      {text: 'Del'},
      {text: 'Edit'},
      {text: 'Multi-Select'},
      {text: 'Copy'},
      {text: 'Cut'},
      {text: 'Paste Sibling'},
      {text: 'Paste Child'},
      {
        separator: true,
      },
      'AutoFit',
      'AutoFitAll',
      'SortAscending',
      'SortDescending',
      'Copy',
      'Paste',
      'Edit',
      'Delete',
      'Save',
      'Cancel',
      'PdfExport',
      'ExcelExport',
      'CsvExport',
      'FirstPage',
      'PrevPage',
      'LastPage',
      'NextPage',
      'AddRow'
    ];
    // [
    //   {text: 'Collapse the Row', target: '.e-content', id: 'collapserow'},
    //   {text: 'Expand the Row', target: '.e-content', id: 'expandrow'},
    //   'AutoFit',
    //   'AutoFitAll',
    //   'SortAscending',
    //   'SortDescending',
    //   // 'Copy',
    //   'Edit',
    //   'Delete',
    //   'Save',
    //   'Cancel',
    //   'PdfExport',
    //   'ExcelExport',
    //   'CsvExport',
    //   'FirstPage',
    //   'PrevPage',
    //   'LastPage',
    //   'NextPage',
    //   'AddRow'];
    this.editSettings = {allowDeleting: true, allowEditing: true, allowAdding: true, mode: 'Row'};
    this.selectionSettings = {type: 'Multiple', mode: 'Row', enableToggle: true};
    this.toolbarOptions = ['ColumnChooser'];
  }

  ngOnInit(): void {
    // this.data = sampleData;
    const treeGrid: TreeGrid = new TreeGrid(
      {
        dataSource: sampleData,
        childMapping: 'subtasks',
        showColumnChooser: true,
        treeColumnIndex: 1,
        toolbar: ['ColumnChooser'],
        columns: [
          {field: 'taskID', headerText: 'Task ID', textAlign: 'Right', width: 90},
          {field: 'taskName', headerText: 'Task Name', width: 240, showInColumnChooser: false},
          {field: 'startDate', headerText: 'Start Date', width: 110, format: 'yMd'},
          {field: 'endDate', headerText: 'End Date', width: 110, textAlign: 'Right', type: 'date', format: 'yMd'},
          {field: 'duration', headerText: 'Duration', width: 100, textAlign: 'Right'},
          {field: 'progress', headerText: 'Progress', width: 100, textAlign: 'Right'},
          {field: 'priority', headerText: 'Priority', width: 90}
        ],
        height: 315
      });
    treeGrid.appendTo('#TreeGrid');
  }

  public itemBeforeEvent(args: MenuEventArgs): void {
    console.log('itemBeforeEvent: ', args);
    const link = args.element.getElementsByTagName('a')[0];
    if (link) {
      link.setAttribute('target', '_blank');
      return;
    }

    // const shortCutSpan: HTMLElement = createElement('span');
    // const text: string | undefined = args.item.text;
    // const shortCutText: string = text === 'Save as...' ? 'Ctrl + S' : (text === 'View page source' ? 'Ctrl + U' : 'Ctrl + Shift + I');
    // shortCutSpan.textContent = shortCutText;
    // args.element.appendChild(shortCutSpan);
    // shortCutSpan.setAttribute('class', 'shortcut');
  }

  public itemSelect(args: MenuEventArgs): void {
    if (args.item.text === 'Save as...') {
      this.alertDialog.show();
    }
  }

  public contextMenuClick(args?: MenuEventArgs): void {
    // this.treeGridObj.getColumnByField('taskID');
    // if (args?.item?.id === 'collapserow') {
    //   this.treeGridObj.collapseRow((this.treeGridObj.getSelectedRows()[0]) as HTMLTableRowElement);
    // } else {
    //   this.treeGridObj.expandRow((this.treeGridObj.getSelectedRows()[0]) as HTMLTableRowElement);
    // }
  }

  public contextMenuOpen(arg?: BeforeOpenCloseEventArgs): void {
    if (arg) {
      arg.cancel = true;
    }
    // const elem: Element = arg?.event?.target as Element;
    // const isHeader = elem?.closest('.e-headercell');
    // console.log('isHeader', isHeader);
    // if (!isHeader && arg) {
    //   arg.cancel = true;
    // }
    // const uid = elem?.closest('.e-row')?.getAttribute('data-uid') as string;
    // console.log('uid:', uid);
    // if (arg && isNullOrUndefined(getValue('hasChildRecords', this.treeGridObj.grid.getRowObjectFromUID(uid).data))) {
    //   arg.cancel = true;
    // } else {
    //   const flag: boolean = getValue('expanded', this.treeGridObj.grid.getRowObjectFromUID(uid).data);
    //   let val: string = flag ? 'none' : 'block';
    //   document.querySelectorAll('li#expandrow')[0].setAttribute('style', 'display: ' + val + ';');
    //   val = !flag ? 'none' : 'block';
    //   document.querySelectorAll('li#collapserow')[0].setAttribute('style', 'display: ' + val + ';');
    // }
  }

  public onContextmenu(event: MouseEvent): void {
    // event.preventDefault();
    // event.stopImmediatePropagation();
    console.log('onContextmenu: ', event.target);
    const elem: Element = event?.target as Element;
    const columnHeader = elem?.closest('.e-headercell');
    console.log('Column Header', columnHeader);
    if (columnHeader) {
      const index = columnHeader?.getAttribute('aria-colindex');
      console.log('Column index', index);
      this.contextmenu.target = elem.id;
      this.contextmenu.open(event.y, event.x);
      return;
    }
    //
    const rowHeader = elem?.closest('.e-rowdragdropcell');
    console.log('Row Header', rowHeader);
    if (rowHeader) {
      const index = rowHeader?.closest('.e-row')?.getAttribute('aria-rowindex');
      console.log('Row index', index);
      this.contextmenu.target = elem.id;
      this.contextmenu.open(event.y, event.x);
    }
  }

  public showColumnChooser(): void {
    // const columnChooserModule = this.treeGridObj.columnChooserModule;
    // columnChooserModule.openColumnChooser(200, 50); // give X and Y axis
  }

  public addColumn(): void {
    this.columns.push({field: 'new', headerText: 'New', width: 90});
  }
}
