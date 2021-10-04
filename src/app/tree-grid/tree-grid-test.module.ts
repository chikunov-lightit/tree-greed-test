import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeGridComponent} from './components/tree-grid/tree-grid.component';
import {TreeGridSecondComponent} from './components/tree-grid-second/tree-grid-second.component';
import {TreeGridTreeComponent} from './components/tree-grid-tree/tree-grid-tree.component';
import {TreeGridFourComponent} from './components/tree-grid-four/tree-grid-four.component';
import {ContextMenuModule} from '@syncfusion/ej2-angular-navigations';
import {DialogModule} from '@syncfusion/ej2-angular-popups';
import {ButtonModule} from '@syncfusion/ej2-angular-buttons';
import {
  ColumnChooserService, ColumnMenuService,
  ContextMenuService,
  EditService,
  ExcelExportService,
  FilterService, FreezeService,
  PageService,
  PdfExportService, ReorderService,
  ResizeService, RowDDService, SelectionService,
  SortService, ToolbarService, TreeGridModule
} from '@syncfusion/ej2-angular-treegrid';

// import { enableRipple } from '@syncfusion/ej2-base';
// enableRipple(true);


@NgModule({
  declarations: [
    TreeGridComponent,
    TreeGridSecondComponent,
    TreeGridTreeComponent,
    TreeGridFourComponent,
  ],
  imports: [
    CommonModule,
    TreeGridModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    ResizeService,
    EditService,
    ExcelExportService,
    PdfExportService,
    ContextMenuService,
    ReorderService,
    RowDDService,
    SelectionService,
    ColumnChooserService,
    ColumnMenuService,
    FreezeService,
    ToolbarService
  ],
  exports: [
    TreeGridComponent,
    TreeGridSecondComponent,
    TreeGridTreeComponent
  ]
})
export class TreeGridTestModule {
}
