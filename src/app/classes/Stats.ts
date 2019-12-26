export class Stats {
    id: number;
    date: string;
    ast: number;
    blk: string;
    min: string;
    oreb: string;
    dreb: string;
    pf: string;
    pts: number;
    fg3_pct: number;
    fg3a: string;
    fg3m: string;
    fg_pct: string;
    fga: string;
    fgm: string;
    ft_pct: string;
    fta: string;
    ftm: string;
    turnover: string;
    constructor(id, date, ast, blk, min, oreb, dreb, pf, pts, fg3_pct, fg3a, fg3m, fg_pct, fga, fgm, ft_pct, fta, ftm, turnover) {
        this.id = id;
        this.date = date;
        this.ast = ast;
        this.blk = blk;
        this.min = min;
        this.oreb = oreb;
        this.dreb = dreb;
        this.pf = pf;
        this.pts = pts;
        this.fg3_pct = fg3_pct;
        this.fg3a = fg3a;
        this.fg3m = fg3m;
        this.fg_pct = fg_pct;
        this.fga = fga;
        this.fgm = fgm;
        this.ft_pct = ft_pct;
        this.fta = fta;
        this.ftm = ftm;
        this.turnover = turnover;
    }
}
