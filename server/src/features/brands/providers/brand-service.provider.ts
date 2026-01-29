import { Provider } from '@nestjs/common';
import { PROVIDERS_INSTANCE } from 'src/constants/providers-instance.constant';
import { BrandService } from '../brand.service';

export const BrandServiceProvider: Provider = {
  provide: PROVIDERS_INSTANCE.BRAND_SERVICE,
  useClass: BrandService,
};
