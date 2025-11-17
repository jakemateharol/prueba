import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { END_POINTS } from '../../utils/end-points';
import { EntityDataService } from '../../utils/entity-data';


@Injectable({ providedIn: 'root' })
export class AuthService extends EntityDataService<any> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.category);
  }
}
 
