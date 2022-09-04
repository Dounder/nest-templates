import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

const logger = new Logger('Exception');

export function handleDBErrors(error: any): never {
  if (error.code === '23505') throw new BadRequestException(error.detail);

  logger.log(error);
  throw new InternalServerErrorException('Unexpected error, check logs.');
}
