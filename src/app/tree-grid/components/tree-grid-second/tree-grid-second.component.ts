import {Component, OnInit, ViewChild} from '@angular/core';
import {EditSettingsModel, FilterSettingsModel, SortSettingsModel, TreeGrid} from '@syncfusion/ej2-angular-treegrid';
import {SelectionSettingsModel} from '@syncfusion/ej2-treegrid/src/treegrid/models/selection-settings-model';
import {ContextMenuComponent, MenuEventArgs, MenuItemModel} from '@syncfusion/ej2-angular-navigations';
import {DialogComponent} from '@syncfusion/ej2-angular-popups';
import {sampleData} from '../../../helpers/datasource';
import {MenuActions} from '../../../helpers/menu-actions.enum';

@Component({
  selector: 'tg-tree-grid-second',
  templateUrl: './tree-grid-second.component.html',
  styleUrls: ['./tree-grid-second.component.scss']
})
export class TreeGridSecondComponent implements OnInit {
  public data: {}[];
  public pageSettings: {};
  public sortSettings: SortSettingsModel;
  public filterSettings: FilterSettingsModel;
  public allowSorting = false;
  public allowFiltering = false;
  public frozenColumns = 0;
  public columnMenuItems: MenuItemModel[] = [
    {text: 'Style', id: MenuActions.styleColumn},
    {text: 'New', id: MenuActions.newColumn},
    {text: 'Del', id: MenuActions.delColumn},
    {text: 'Edit', id: MenuActions.editColumn},
    {text: 'Show', id: MenuActions.showColumns},
    {text: 'Freeze', id: MenuActions.freezeColumn},
    {text: 'Filter', id: MenuActions.filter},
    {text: 'Multi-Sort', id: MenuActions.multiSort},
  ];
  public rowMenuItems: MenuItemModel[] = [
    {id: MenuActions.newRow, text: 'New'},
    {id: MenuActions.delRow, text: 'Del'},
    {id: MenuActions.editRow, text: 'Edit'},
    {id: MenuActions.multiSelectRow, text: 'Multi-Select'},
    {id: MenuActions.copyRow, text: 'Copy'},
    {id: MenuActions.cutRow, text: 'Cut'},
    {id: MenuActions.pasteSiblingRow, text: 'Paste Sibling'},
    {id: MenuActions.pasteChildRow, text: 'Paste Child'}
  ];
  public editSettings: EditSettingsModel;
  public selectionSettings: SelectionSettingsModel = {type: 'Single', mode: 'Row', enableToggle: true};
  public columns: any[] = [
    {field: 'taskID', headerText: 'Task ID', textAlign: 'Right', width: 90},
    {field: 'taskName', headerText: 'Task Name', width: 240, showInColumnChooser: false},
    {field: 'startDate', headerText: 'Start Date', width: 110, format: 'yMd'},
    {field: 'endDate', headerText: 'End Date', width: 110, textAlign: 'Right', type: 'date', format: 'yMd'},
    {field: 'duration', headerText: 'Duration', width: 100, textAlign: 'Right'},
    {field: 'progress', headerText: 'Progress', width: 100, textAlign: 'Right'},
    {field: 'priority', headerText: 'Priority', width: 90}
  ];

  public toolbar = ['Add', 'Delete', 'Update', 'Cancel'];

  public selectedRow!: number;
  public selectedColumn!: number;

  // @ts-ignore
  @ViewChild('treegrid') public treeGridObj: TreeGridComponent;

  @ViewChild('columnContextMenu')
  public columnContextMenu!: ContextMenuComponent;
  @ViewChild('rowContextMenu')
  public rowContextMenu!: ContextMenuComponent;

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
    this.sortSettings = {};
    this.filterSettings = {ignoreAccent: true, hierarchyMode: 'Parent'};
    this.editSettings = {allowDeleting: true, allowEditing: true, allowAdding: true, mode: 'Row'};
  }

  ngOnInit(): void {
  }

  public listenColumnMenuEvent(args: MenuEventArgs): void {
    console.log('ColumnMenuEvent: ', args.item.id, 'column:', this.selectedColumn);
    switch (args.item.id) {
      case MenuActions.styleColumn:
        return;
      case MenuActions.newColumn:
        this.addColumn();
        return;
      case MenuActions.delColumn:
        this.deleteColumn(this.selectedColumn);
        return;
      case MenuActions.editColumn:
        console.log('edit');
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
    if (this.treeGridObj.columns.length <= this.selectedColumn + 1) {
      this.frozenColumns = this.selectedColumn;
      return;
    }
    this.frozenColumns = this.selectedColumn + 1;
  }

  public listenRowMenuEvent(args: MenuEventArgs): void {
    console.log('RowMenuEvent: ', args.item.id, 'row:', this.selectedRow);
    switch (args.item.id) {
      case MenuActions.newRow:
        return;
      case MenuActions.delRow:
        return;
      case MenuActions.editRow:
        return;
      case MenuActions.multiSelectRow:
        this.toggleRowMultiSelection();
        return;
      case MenuActions.copyRow:
        return;
      case MenuActions.cutRow:
        return;
      case MenuActions.pasteSiblingRow:
        return;
      case MenuActions.pasteChildRow:
        return;
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
    debugger
    this.treeGridObj.columnChooserModule.openColumnChooser(X, Y);
  }

  public addColumn(): void {
    this.columns.push({field: 'new', headerText: 'New', width: 90});
  }

  public deleteColumn(index: number): void {
    this.columns.splice(index, 1);
  }
}
