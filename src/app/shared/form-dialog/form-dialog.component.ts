import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormDialogConfig } from 'src/app/common.models';

@Component({
    selector: 'form-dialog',
    templateUrl: './form-dialog.component.html',
    styleUrls: [ './form-dialog.component.scss' ]
})

export class FormDialogComponent implements OnInit {
    constructor(
        public dialog: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: FormDialogConfig,
        private formBuilder: FormBuilder
    ) { }

    form: FormGroup;

    ngOnInit(): void {
        this.formInit();
    }

    formInit() {
        this.form = this.formBuilder.group({
            id: [ (this.data.memberData ? this.data.memberData.id : (this.data.dataLength + 1)) ],
            name: [ (this.data.memberData ? this.data.memberData.name : null), Validators.required ],
            family: [ (this.data.memberData ? this.data.memberData.family : null), Validators.required ],
            items: [ (this.data.memberData ? this.data.memberData.items : null), Validators.required ],
            dob: [ (this.data.memberData ? this.dateInReverse(this.data.memberData.dob) : null), Validators.required ]
        })
    }

    changeDate(event) {
        console.log(event);
    }

    dateInReverse(val) {
        const data = val.split('-');
        return new Date(data[ 2 ], data[ 1 ], data[ 0 ]);
    }

    dateInFormat(val) {
        const date = new Date(val);
        let year = date.getFullYear();
        let month = new Number(date.getMonth() + 1) < 10 ? ('0' + new Number(date.getMonth() + 1)) : new Number(date.getMonth() + 1);
        let day = new Number(date.getDate()) <= 10 ? ('0' + date.getDate()) : date.getDate();
        return `${day}-${month}-${year}`;
    }

    cancel(): void {
        this.dialog.close(null);
    }

    add(): void {
        this.form.value.dob = this.dateInFormat(this.form.value.dob);
        this.dialog.close(this.form.value);
    }

}