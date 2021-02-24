import { createParamDecorator } from '@nestjs/common';
import { roleUser } from './user.entity';

export const GetUser = createParamDecorator((data, req): roleUser => {
  return req.roleuser;
});
