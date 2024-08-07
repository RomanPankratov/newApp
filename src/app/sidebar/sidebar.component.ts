import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() filtersChanged = new EventEmitter<any>();
  @Output() resetFilters = new EventEmitter<void>();

  searchText: string = '';
  selectedEngines: string[] = [];
  selectedType: string = '';
  selectedSort: string = 'none';

  onEngineChange(engine: string, event: any) {
    if (event.target.checked) {
      this.selectedEngines.push(engine);
    } else {
      this.selectedEngines = this.selectedEngines.filter(e => e !== engine);
    }
    this.emitFilters();
  }

  onTypeChange(type: string) {
    this.selectedType = type;
    this.emitFilters();
  }

  onSortChange(sort: string) {
    this.selectedSort = sort;
    this.emitFilters();
  }

  onSearchChange() {
    this.emitFilters();
  }

  onResetFilters() {
    this.searchText = '';
    this.selectedEngines = [];
    this.selectedType = '';
    this.selectedSort = 'none';
    this.emitFilters();
    this.resetFilters.emit();
  }

  private emitFilters() {
    this.filtersChanged.emit({
      searchText: this.searchText,
      selectedEngines: this.selectedEngines,
      selectedType: this.selectedType,
      selectedSort: this.selectedSort
    });
  }
}
