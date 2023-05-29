import { ApiProperty } from '@nestjs/swagger';

export enum ApiStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export class ApiResult<T> {
  @ApiProperty()
  public status: ApiStatus = ApiStatus.ERROR;

  @ApiProperty()
  public errorCode: string;

  @ApiProperty()
  public message: string;

  @ApiProperty()
  public data: T;

  public success(data?: T, message?: string) {
    this.status = ApiStatus.SUCCESS;
    if (message) {
      this.message = 'OK';
    }
    this.data = data;

    return this;
  }
}
