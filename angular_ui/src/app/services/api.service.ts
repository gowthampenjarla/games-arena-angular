import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getApiData(): Observable<any> {
    const headers = new HttpHeaders()
      .append("Content-Type", "application/json")
      .append("Access-Control-Allow-Headers", "Content-Type")
      .append("Access-Control-Allow-Methods", "GET")
      .append("Access-Control-Allow-Origin", "*");
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://starlord.hackerearth.com/gamesarena";
    return this.http.get(proxyurl + url);
  }
}
