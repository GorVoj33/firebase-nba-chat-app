export class Player {
    id: string;
    first_name:string;
    last_name: string;
    height_feet:string;
    height_inches:string;
    position:string;
    team_id: number;
    team: string;
    weight_pounds:string;
    constructor(id, f_name,l_name, h_feet, h_inches, position, team_id,team, w_pounds){
        this.id = id;
        this.first_name = f_name;
        this.last_name=l_name;
        this.height_feet = h_feet;
        this.height_inches=h_inches;
        this.position=position;
        this.team_id = team_id;
        this.team = team;
        this.weight_pounds = w_pounds;
        
    }
}

