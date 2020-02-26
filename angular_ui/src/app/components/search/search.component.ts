import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { ApiService } from "../../services/api.service";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { version } from "punycode";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  games: Array<any> = [];
  games1: Array<any> = [];
  loading: boolean = false;
  options: string[] = [];
  selected = false;
  selectedValue: string;
  uniqPlatforms: Array<any> = [];
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  @ViewChild("f", { static: false }) tform;
  rForm: FormGroup;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.rForm = fb.group({
      fTitle: ""
    });
  }

  ngOnInit() {
    this.onLoad();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onLoad() {
    this.loading = true;
    this.apiService.getApiData().subscribe(res => {
      this.games = res;
      this.games1 = res;
      this.games.shift();
      this.games1.shift();
      this.loading = false;
      const platform = [];
      this.games.map(game => this.options.push(game.title));
      this.games.map(game => platform.push(game.platform));

      this.uniqPlatforms = platform.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      });

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(""),
        map(value => this._filter(value))
      );
    });
  }

  valueMapper = key => {
    // let selection = this.games.find(({ title }) => title === key);
    console.log(key);
    let selection = [];
    this.games = this.games1;
    this.games.forEach(game => {
      if (game.title === key) {
        console.log(game);
        selection.push(game);
      }
    });

    console.log(selection);
    if (selection.length != 0) {
      console.log("original games", this.games);
      this.games = selection;
      console.log("new games", this.games);
      this.selected = true;
    }
  };

  clear() {
    this.games = this.games1;
    this.tform.reset();
    this.rForm.reset();
    console.log(this.games);
    this.selected = false;
  }

  ascending() {
    this.games.sort((a, b) => (a.score > b.score ? 1 : -1));
  }
  descending() {
    this.games.sort((a, b) => (a.score < b.score ? 1 : -1));
  }

  onPlatformSelection() {
    console.log(this.selectedValue);
    let selection = [];
    this.games = this.games1;
    this.games.forEach(game => {
      if (game.platform === this.selectedValue) {
        console.log(game);
        selection.push(game);
      }
    });

    console.log(selection);
    if (selection.length != 0) {
      console.log("original games", this.games);
      this.games = selection;
      console.log("new games", this.games);
      this.selected = true;
    }
  }
}
