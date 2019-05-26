import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '../../data/data.service';
import { PersonInterface } from '../../models/person.interface';
import { PersonClass } from '../../models/person.class';
import data from '../../../assets/data/data';
import dataAsJsonString from '../../../assets/data/exported-data-as-json-string';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  peopleFromTypeScript: Array<PersonInterface>;
  peopleFromHttp: Array<PersonInterface>;
  peopleFromDataAsJsonString: Array<PersonClass>;
  person: PersonClass;
  dataServiceSubscription: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Log that we are in here
    console.log('Initializing DataComponent');

    // Fetch the data from the TypeScript file
    this.peopleFromTypeScript = data;

    // Fetch the data using HttpClient (via DataService)
    this.dataServiceSubscription = this.dataService.getData()
      .pipe(
        map((data: any) => data.people)
      )
      .subscribe((people: Array<PersonInterface>) => {
        this.peopleFromHttp = people;
      });

    // Fetch the data by parsing the data exported as a JSON string
    this.peopleFromDataAsJsonString = JSON.parse(dataAsJsonString).people;

    this.person = this.peopleFromDataAsJsonString[0];
  }

  ngOnDestroy(): void {
    // Log that DataComponent is getting destroyed :O
    console.log('Destroying DataComponent');

    this.dataServiceSubscription.unsubscribe();
  }
}