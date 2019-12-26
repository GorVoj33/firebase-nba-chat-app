import { Component, OnInit, ViewChild } from '@angular/core';
import { Player } from 'src/app/classes/player.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ApiService } from 'src/app/services/api.service';
import { Stats } from 'src/app/classes/Stats';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players : Player[] = []
  stats : Stats[] = []
  detailsDisplayed: boolean = false;
  displayedColumns: string[] = ['first_name', 'last_name', 'height', 'weight', 'position','team','action'];
  displayedColumnsStats: string[] = ['game-date', 'min', 'pts', 'ast','oreb','dreb','trn','fg3_stat','fg3_pct',
      'fg_stat','fg_pct','ft_stat','ft_pct','blk','pf'];
  dataSource: MatTableDataSource<Player>;
  dataSource2: any;
  noPlayers: boolean = false;
  criteriaEntered : boolean = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private apiService:ApiService) {

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.players);
    this.dataSource2 = new MatTableDataSource(this.stats);
  }

  ngOnInit() {
    
    this.getPlayers();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getPlayers(){
    this.apiService.getPlayers().subscribe(
      resp => {
        //this.response = resp;
        console.log('Reponse: ',resp['data'])
        for (var g of resp['data']){
          var player = new Player(g['id'],g['first_name'],g['last_name'],g['height_feet'], g['height_inches'], g['position'], g['team']['id'],g['team']['full_name'],g['weight_pounds']);
          this.players.push(player);
          
        }
        this.dataSource = new MatTableDataSource(this.players);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  search(formData){
    var name = formData.name;
    var players2 = [];
    this.apiService.findByName(name).subscribe(
      resp => {
        
        //console.log('Pronadjeni igraci: ',resp)
        for (var g of resp['data']){
          var player = new Player(g['id'],g['first_name'],g['last_name'],g['height_feet'], g['height_inches'], g['position'], g['team']['id'],g['team']['full_name'],g['weight_pounds']);
          players2.push(player);
          
        }
        if(!players2.length) {
          this.noPlayers = true;
        }
        this.dataSource = new MatTableDataSource(players2);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
    
    
  }
  displayDetails(player){
     var player_id = player.id;
     console.log('Player ID',player_id)
      this.apiService.getPlayersStats(player_id).subscribe(
        response => {
          console.log('response ',response)
          var stats = response['data'];
          for (var stat of stats){
            var s = new Stats(stat['id'],stat['game']['date'].substring(0,10),stat['ast'],stat['blk'],stat['min'],stat['oreb'],stat['dreb'],stat['pf'],stat['pts'],
            Math.round(stat['fg3_pct'] * 100) / 100,stat['fg3a'],stat['fg3m'],stat['fg_pct'],stat['fga'],stat['fgm'],stat['ft_pct'],stat['fta'],stat['ftm'],stat['turnover']);
            console.log('Stat: '+s.ast)
            this.stats.push(s)
            //console.log('Length : ', this.stats.length)
          }

          this.dataSource2 = this.stats;

        }
      )

  }
}
