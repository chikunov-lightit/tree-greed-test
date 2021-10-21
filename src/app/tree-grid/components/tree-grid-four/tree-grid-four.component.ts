import {Component, OnInit} from '@angular/core';
import {TreeGrid} from '@syncfusion/ej2-angular-treegrid';
import {sampleData} from '../../../helpers/datasource';

@Component({
  selector: 'tg-tree-grid-four',
  templateUrl: './tree-grid-four.component.html',
  styleUrls: ['./tree-grid-four.component.scss']
})
export class TreeGridFourComponent implements OnInit {
  public gridSelectedRecords: any;
  public treeGrid: TreeGrid;

  constructor() {
    this.treeGrid = new TreeGrid(
      {
        dataSource: sampleData,
        childMapping: 'subtasks',
        showColumnChooser: true,
        treeColumnIndex: 1,
        toolbar: ['ColumnChooser'],
        editSettings: {
          allowDeleting: true,
          allowEditing: true,
          allowAdding: true,
        },
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
  }

  ngOnInit(): void {
    this.treeGrid.appendTo('#TreeGrid');
    this.treeGrid.element.addEventListener('keydown', this.keyPressHandler.bind(this));
  }

  public keyPressHandler(args: any): void {
    debugger
    if (args.action == 'ctrlPlusC') {
      this.gridSelectedRecords = this.treeGrid.getSelectedRecords();
    }
    if (args.ctrlKey && args.code === 'KeyX') {
      this.gridSelectedRecords = this.treeGrid.getSelectedRecords();
      this.treeGrid.deleteRecord();
    }
    if (args.ctrlKey && args.code === 'KeyV') {
      let index = this.treeGrid.selectedRowIndex;
      if (this.gridSelectedRecords.length) {
        this.gridSelectedRecords.forEach((record: any) => {
          this.treeGrid.addRecord(record, index, 'Below');
          index++;
        });
      }
    }
  }


}
