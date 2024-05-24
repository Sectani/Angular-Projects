import { TestBed } from '@angular/core/testing';

import { ShopingCartServiceService } from './shoping-cart-service.service';

describe('ShopingCartServiceService', () => {
  let service: ShopingCartServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopingCartServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
