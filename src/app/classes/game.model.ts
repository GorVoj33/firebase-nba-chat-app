export class Game{
    home_team:string;
    home_team_score: string;
    visitor_team: string;
    visitor_team_score:string;
    date: Date;
    constructor(h: string,h_team:string, v: string,v_team:string, date:Date){
      this.home_team = h_team;
      this.home_team_score = h;
      
      this.visitor_team_score = v;
      this.visitor_team = v_team;
      this.date = date;
    }
  }