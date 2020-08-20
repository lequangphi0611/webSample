import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-delete-dialog",
  templateUrl: "./delete-dialog.component.html",
  styleUrls: ["./delete-dialog.component.scss"]
})
export class DeleteDialogComponent implements OnInit {
  public id: number;
  public title: string;

  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.id = data.id;
    this.title = data.title;
  }

  ngOnInit() {}

  save() {
    this.dialogRef.close(this.id);
  }

  close() {
    this.dialogRef.close();
  }
}
