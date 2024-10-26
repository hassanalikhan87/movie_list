import { LogoutIcon } from './LogoutIcon';
import { PlusInCircleIcon } from './PlucInCircleIcon';
import { UploadIcon } from './UploadIcon';

export const iconByName = {
  plusInCircle: PlusInCircleIcon,
  logout: LogoutIcon,
  upload: UploadIcon
} as const;

export type IconName = keyof typeof iconByName;
