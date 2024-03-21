import { ApiProperty } from "@nestjs/swagger";
import { UserResponse } from ".";

export class FinAllUsersResponse {
  @ApiProperty({ type: [UserResponse] })
  users: [UserResponse];

  @ApiProperty({ type: Number, example: 9 })
  count: number;

  @ApiProperty({ type: Number, example: 1 })
  page: number = 1;

  @ApiProperty({ type: Number, example: 10 })
  pageSize: number = 10;
}
