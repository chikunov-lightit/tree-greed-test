import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EditSettingsModel, FilterSettingsModel, SortSettingsModel, TreeGrid} from '@syncfusion/ej2-angular-treegrid';
import {SelectionSettingsModel} from '@syncfusion/ej2-treegrid/src/treegrid/models/selection-settings-model';
import {ContextMenuComponent, MenuEventArgs, MenuItemModel} from '@syncfusion/ej2-angular-navigations';
import {DialogComponent} from '@syncfusion/ej2-angular-popups';
import {sampleData} from '../../../helpers/datasource';

@Component({
  selector: 'tg-tree-grid-tree',
  templateUrl: './tree-grid-tree.component.html',
  styleUrls: ['./tree-grid-tree.component.scss']
})
export class TreeGridTreeComponent implements OnInit, AfterViewInit {
  public data: {}[];
  public pageSettings: {};
  public sortSettings: SortSettingsModel;
  public filterSettings: FilterSettingsModel;
  public contextMenuItems: {}[];
  public editSettings: EditSettingsModel;
  public selectionSettings: SelectionSettingsModel;
  public toolbarOptions: {}[];
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
      {text: 'Column Header', target: '.e-headercell'},
      {text: 'Row Header', target: '.e-rowdragdropcell'},
      'AutoFit',
      // 'AutoFitAll',
      // 'SortAscending',
      // 'SortDescending',
      'Copy',
      'Paste',
      'Edit',
      'Delete',
      'Save',
      'Cancel',
      // 'PdfExport',
      // 'ExcelExport',
      // 'CsvExport',
      // 'FirstPage',
      // 'PrevPage',
      // 'LastPage',
      // 'NextPage',
      'AddRow'
    ];
    this.editSettings = {allowDeleting: true, allowEditing: true, allowAdding: true, mode: 'Dialog'};
    this.selectionSettings = {type: 'Multiple', mode: 'Row', enableToggle: true};
    this.toolbarOptions = ['ColumnChooser'];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log('columns', this.treeGridObj.columns);
  }
}
