import { Provider } from '@nestjs/common';
import { PROVIDERS_INSTANCE } from 'src/constants/providers-instance.constant';
import { VehicleService } from '../vehicle.service';

export const VehicleServiceProvider: Provider = {
  provide: PROVIDERS_INSTANCE.VEHICLE_SERVICE,
  useClass: VehicleService,
};
