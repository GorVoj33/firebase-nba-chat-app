import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Game } from 'src/app/classes/game.model';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games:Game[] = [];
  
  displayedColumns: string[] = ['home', 'visitor', 'score', 'date'];
  dataSource: MatTableDataSource<Game>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private apiService: ApiService) {
    //const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.games);
   }


  ngOnInit() {
    this.getGames();

    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getGames(){
    this.apiService.getNewestGames().subscribe(
      resp => {
        //this.response = resp;
        console.log('Reponse: ',resp['data'])
        for (var g of resp['data']){
          //var game = new Game(g['home_team_score'],g['home_team']['full_name'],g['visitor_team_score'],g['visitor_team']['full_name'], g['date'].substring(0,10));
          var game = new Game(g['home_team_score'],g['home_team']['full_name'],g['visitor_team_score'],g['visitor_team']['full_name'], g['date']);
          console.log("GAME: ",game)
          this.games.push(game);
          
        }
        this.dataSource = new MatTableDataSource(this.games);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }
}
