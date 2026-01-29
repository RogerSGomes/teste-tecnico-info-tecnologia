import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';

type ConstraintMeta = {
  driverAdapterError?: {
    cause?: {
      constraint?: {
        fields?: string[];
      };
    };
  };
  operation?: string;
};

export class PrismaGeneralException extends HttpException {
  constructor(error: Prisma.PrismaClientKnownRequestError) {
    const getErrorParams = (errorParam?: string) => {
      const defaultErrorOptions = {
        errorMessage: 'Error while executing operation.',
        errorStatus: HttpStatus.INTERNAL_SERVER_ERROR,
      };

      if (!errorParam) return defaultErrorOptions;

      const customErrorOptions: Record<
        string,
        { errorMessage: string; errorStatus: number }
      > = {
        name: {
          errorMessage: 'Brand with this name already exists.',
          errorStatus: HttpStatus.CONFLICT,
        },
        renavam: {
          errorMessage: 'Vehicle with this renavam already exists.',
          errorStatus: HttpStatus.CONFLICT,
        },
        chassis: {
          errorMessage: 'Vehicle with this chassis already exists.',
          errorStatus: HttpStatus.CONFLICT,
        },
        license_plate: {
          errorMessage: 'Vehicle with this license plate already exists.',
          errorStatus: HttpStatus.CONFLICT,
        },
        'an update': {
          errorMessage: 'Register for update not found.',
          errorStatus: HttpStatus.NOT_FOUND,
        },
        'a delete': {
          errorMessage: 'Register for deletion not found.',
          errorStatus: HttpStatus.NOT_FOUND,
        },
      };

      return customErrorOptions[errorParam] ?? defaultErrorOptions;
    };

    let errorKey: string | undefined;

    if (typeof error.meta === 'object' && error.meta !== null) {
      const meta = error.meta as ConstraintMeta;

      errorKey =
        meta.driverAdapterError?.cause?.constraint?.fields?.[0] ??
        meta.operation;
    }

    const { errorMessage, errorStatus } = getErrorParams(errorKey);

    super(errorMessage, errorStatus, { cause: error });
  }
}
