import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../classes/player.model';
class Game{
  home_team:string;
  home_team_score: string;
  visitor_team: string;
  visitor_team_score:string;
  date: string;
  constructor(h: string,h_team:string, v: string,v_team:string, date:string){
    this.home_team = h_team;
    this.home_team_score = h;
    
    this.visitor_team_score = v;
    this.visitor_team = v_team;
    this.date = date;
  }
}
@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit{
  
  getCurrentDate() :string[]{
    var dates: string[] = []
    var fulldate = new Date();
    var day = fulldate.getDate();
    var day1 = day-1;
    var day2 = day-2;
    var month = fulldate.getMonth()+1;
    var year = fulldate.getFullYear();
    dates.push(year+'-'+month+'-'+day);
    dates.push(year+'-'+month+'-'+day1);
    dates.push(year+'-'+month+'-'+day2);
    return dates;
  }
  createNewDateURL():string{
    // date in format year-month-day
    var dates = this.getCurrentDate();
    var URL = 'https://www.balldontlie.io/api/v1/games?per_page=100'
    for (var date of dates){
      URL = (URL+`&dates[]='${date}'`);
    }
    console.log('URL (NEW GAMES) = '+URL)
    return URL;
  }
  //URL: string = 'https://www.balldontlie.io/api/v1/games?per_page=100&dates[]=2019-12-21&&dates[]=2019-12-20';
  URL_PLAYERS : string = 'https://www.balldontlie.io/api/v1/players?per_page=100';
  URL_STATS = 'https://www.balldontlie.io/api/v1/stats?player_ids[]=3&';
  constructor(private http:HttpClient) { }
  ngOnInit(){
    
  }
  getNewestGames(){
    var URL = this.createNewDateURL()
    return this.http.get(this.createNewDateURL());
  }
  getPlayers(){
    return this.http.get(this.URL_PLAYERS);
  }
  getPlayersStats(player_id){
    var URL_PLAYER_STAT = 'https://www.balldontlie.io/api/v1/stats?player_ids[]='+player_id;
    return this.http.get(URL_PLAYER_STAT);
  }
  findByName(name: any) {
    var URL_SEARCH = 'https://www.balldontlie.io/api/v1/players?search='+name+'&per_page=100'

    return this.http.get(URL_SEARCH);
  }
}
