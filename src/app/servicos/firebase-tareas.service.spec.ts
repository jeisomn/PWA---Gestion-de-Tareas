import { TestBed } from '@angular/core/testing';

import { FirebaseTareasService } from './firebase-tareas.service';

describe('FirebaseTareasService', () => {
  let service: FirebaseTareasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseTareasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
