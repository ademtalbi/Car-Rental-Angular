import { NgModule } from '@angular/core';
// NG ZORRO IMPORTS
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import {NzTableModule} from "ng-zorro-antd/table";

@NgModule({

  exports: [
    NzSpinModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzLayoutModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzTableModule
  ]
})
export class NgZorroImportsModule { }