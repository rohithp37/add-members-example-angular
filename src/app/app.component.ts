import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MembersData } from './common.models';
import { FormDialogComponent } from './shared/form-dialog/form-dialog.component';

const membersDataTable: MembersData[] = [
  { id: 1, name: 'Ravishankar', family: 'Rajappa', items: 5, dob: '06-11-1986' },
  { id: 2, name: 'Rohit', family: 'Sharma', items: 5, dob: '07-04-1987' }
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})

export class AppComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  displayedColumns: string[] = [ 'id', 'name', 'family', 'items', 'dob', 'actions' ];
  dataSource: MembersData[];

  ngOnInit(): void {
    this.dataSource = membersDataTable;
  }

  addMember() {
    const data = {
      title: 'Add Member',
      maxHeight: '90%',
      dataLength: this.dataSource.length
    }
    const dialog = this.dialog.open(FormDialogComponent, { data });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        membersDataTable.push(result);
        this.dataSource = [ ...membersDataTable ];
      }
    });
  }

  editMember(id: number) {
    let memberData: MembersData;
    membersDataTable.forEach(item => {
      if (item.id === id) {
        memberData = item;
      }
    })
    const data = {
      title: 'Edit Member',
      maxHeight: '90%',
      memberData
    }
    const dialog = this.dialog.open(FormDialogComponent, { data });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        membersDataTable.forEach(item => {
          if (item.id === result.id) {
            item = result;
          }
        })
        this.dataSource = [ ...membersDataTable ];
      }
    });
  }

  deleteMember(id: number) {
    membersDataTable.forEach((item, index) => {
      if (item.id === id) {
        membersDataTable.splice(index, 1);
      }
    })
    this.dataSource = [ ...membersDataTable ];
  }


}
