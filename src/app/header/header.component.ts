import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataAccessService } from "../shared/data-access.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dataAccessService: DataAccessService) { }

  ngOnInit(): void {
  }

  saveData() {
    this.dataAccessService.storeRecipes();
  }

  getData() {
    this.dataAccessService.getRecipes();
  }

}
