import { ChannelType } from 'src/utils/enums/channel-type.enum';

export class CreateSubscriptionItemDto {
  type: string;
  name: string;
  decoderId: number;
}