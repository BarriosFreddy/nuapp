import { Controller, Get } from '@nestjs/common';
import { Billing } from '../../model/Billing';

@Controller({
  path: 'api/billing',
})
export class BillingController {
  @Get()
  listAll(): [Billing] {
    return [{ total: 1243 }];
  }
}
