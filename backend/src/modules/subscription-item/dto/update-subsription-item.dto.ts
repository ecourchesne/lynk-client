import { ChannelType } from 'src/utils/enums/channel-type.enum';

export class UpdateSubscriptionItemDto {
  type?: string;
  name?: string;
  decoderId?: number;
}