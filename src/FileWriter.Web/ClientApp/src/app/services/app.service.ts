import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SnackerService } from './snacker.service';

import {
  WriterInput,
  ConsoleOutput
} from '../models';

@Injectable()
export class AppService {
  private files = new BehaviorSubject<string[]>(null);
  files$ = this.files.asObservable();

  constructor(
    private http: HttpClient,
    private snacker: SnackerService
  ) { }

  getOutputFiles = () => this.http.get<string[]>(`/api/app/getOutputFiles`)
    .subscribe(
      data => this.files.next(data),
      err => this.snacker.sendErrorMessage(err.error)
    );

  writeText = (input: WriterInput): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post<ConsoleOutput>(`/api/app/writeText`, input)
        .subscribe(
          data => {
            data.hasError ?
              this.snacker.sendErrorMessage(data.error) :
              this.snacker.sendSuccessMessage(data.result);

            resolve(!data.hasError);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          }
        );
    });

  removeOutputFile = (path: string): Promise<boolean> =>
    new Promise((resolve) => {
      this.http.post(`/api/app/removeOutputFile`, { key: 'data', value: path })
        .subscribe(
          () => {
            this.snacker.sendSuccessMessage(`File successfully removed`);
            resolve(true);
          },
          err => {
            this.snacker.sendErrorMessage(err.error);
            resolve(false);
          }
        );
    });
}
