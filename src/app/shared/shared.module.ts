import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { SharedMaterialModules } from './shared-material.module';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

const components = [
    FormDialogComponent
]

@NgModule({
    imports: [ CommonModule, SharedMaterialModules, ReactiveFormsModule ],
    declarations: [ ...components ],
    exports: [ CommonModule, SharedMaterialModules ]
})

export class AppSharedModule { }