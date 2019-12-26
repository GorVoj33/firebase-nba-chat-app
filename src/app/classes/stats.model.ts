export class Stats{
    id: string;
    date:string;
    ast: string;
    blk:number;
    min:string;
    oreb:number;
    dreb:number;
    pf: number;
    pts: string;
    fg3_pct: string;
    fg3a: string;
    fg3m: string;
    fg_pct: string;
    fga: string;
    fgm: string;
    ft_pct: string;
    fta: string;
    ftm:string;
    turnover:string;
    constructor (id,date, ast,blk,min,oreb,dreb,pf,pts,fg3_pct,fg3a,fg3m,fg_pct,fga,fgm,ft_pct,fta,ftm,turnover){
        this.id = id;
        this.date = date;
        this.ast=ast;
        this.blk=blk;
        this.min=min;
        this.oreb=oreb;
        this.dreb=dreb;
        this.pf=pf;
        this.pts = pts;
        this.fg3_pct=fg3_pct;
        this.fg3a=fg3a;
        this.fg3m = fg3m;
        this.fg_pct=fg_pct;
        this.fga=fga;
        this.fgm=fgm;
        this.ft_pct=ft_pct;
        this.fta=fta;
        this.ftm=ftm;
        this.turnover = turnover;

    }
    // "game": {
    //             "id": 62596,
    //             "date": "2019-10-23T00:00:00.000Z",
    //             "home_team_id": 29,
    //             "home_team_score": 100,
    //             "period": 4,
    //             "postseason": false,
    //             "season": 2019,
    //             "status": "Final",
    //             "time": "     ",
    //             "visitor_team_id": 21,
    //             "visitor_team_score": 95
    //         },
    //         "min": "27:42",
    //         "oreb": 3,
    //         "pf": 4,
            
    //         "pts": 3,
    //         "reb": 11,
    //         "stl": 1,
    //         "team": {
    //             "id": 21,
    //             "abbreviation": "OKC",
    //             "city": "Oklahoma City",
    //             "conference": "West",
    //             "division": "Northwest",
    //             "full_name": "Oklahoma City Thunder",
    //             "name": "Thunder"
    //         },
    //         "turnover": 2
}