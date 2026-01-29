import { HttpException, HttpStatus } from '@nestjs/common';

export class PrismaConsultException extends HttpException {
  constructor(error: any) {
    super(
      { message: 'Erro ao recuperar dados' },
      HttpStatus.INTERNAL_SERVER_ERROR,
      {
        cause: error,
      },
    );
  }
}
