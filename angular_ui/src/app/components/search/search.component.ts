import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
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
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  constructor(private apiService: ApiService) {}

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
      this.games.map(game => this.options.push(game.title));

      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(""),
        map(value => this._filter(value))
      );
      // console.log(this.filteredOptions.subscribe(value => console.log(value)));
      console.log(this.options);
    });
  }

  valueMapper = key => {
    // let selection = this.games.find(({ title }) => title === key);
    console.log(key);
    let selection = [];
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
      // this.games.push(selection);
      console.log("new games", this.games);
      this.selected = true;
      console.log(this.selected);
      console.log(this.options);
      // console.log("games1", this.games1);
      // return selection.value;
      this.check();
    }
  };

  clear() {
    // this.games = this.games1;
    this.ngOnInit();
    console.log(this.games);
    this.selected = false;
    this.options = [];
    this.myControl.enable();
  }

  ascending() {
    this.games.sort((a, b) => (a.score > b.score ? 1 : -1));
  }
  descending() {
    this.games.sort((a, b) => (a.score < b.score ? 1 : -1));
  }

  check() {
    if (this.selected == true) {
      this.myControl.disable();
    }
  }
}
