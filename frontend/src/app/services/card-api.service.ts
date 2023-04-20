import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card, CardDto } from '../components/card/card.models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CardApiService {
  private readonly requestUrlPrefix = '/api/cards';

  constructor(private readonly apiService: ApiService) {}

  public getCardList(): Observable<CardDto[]> {
    return this.apiService.get<CardDto[]>(this.requestUrlPrefix);
  }

  public addCard(card: Card): Observable<void> {
    return this.apiService.post(`${this.requestUrlPrefix}/add`, card);
  }

  public deleteCard(id: number): Observable<void> {
    return this.apiService.delete(`${this.requestUrlPrefix}/${id}/delete`);
  }
}
