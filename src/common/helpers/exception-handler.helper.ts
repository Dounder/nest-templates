import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

const logger = new Logger('Exception');

export function handleDBErrors(error: any): never {
  if (error.code === 11000)
    throw new BadRequestException(
      `Duplicate keys ${Object.keys(error.keyValue)}`,
    );

  logger.log(error);
  throw new InternalServerErrorException('Unexpected error, check logs.');
}
