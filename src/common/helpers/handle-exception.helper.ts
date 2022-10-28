import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

const logger = new Logger('Exception');

export function HandleExceptions(error: any) {
  switch (error.code) {
    case '23505':
      throw new BadRequestException(error.detail.replace('Key ', ''));

    default:
      logger.log(error);
      throw new InternalServerErrorException('Unexpected error, check logs.');
  }
}
