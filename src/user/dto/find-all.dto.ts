import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@repo/database";
import { Transform, Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

enum Sort {
  ASC = "asc",
  DESC = "desc",
}

export class FindAllQueryDto {
  @ApiProperty({
    minimum: 1,
    maximum: 20,
    title: "pageSize",
    default: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: "Поле pageSize должно быть числом" })
  @Min(1, { message: "Поле pageSize имеет минимальную величину 1" })
  @Max(20, { message: "Поле pageSize имеет максимальную величину 20" })
  readonly pageSize: number = 10;

  @ApiProperty({
    minimum: 1,
    title: "page",
    default: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: "Поле page должно быть числом" })
  @Min(1, { message: "Поле page имеет минимальную величину 1" })
  readonly page: number = 1;

  @ApiProperty({
    enum: Role,
    isArray: true,
    example: Object.keys(Role),
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => (typeof value === "string" ? value.split(",") : Object.values(Role)))
  readonly roles: Role[] = Object.values(Role);

  @ApiProperty({
    type: String,
    title: "createdAt",
    default: "asc",
    required: false,
    enum: Sort,
  })
  @IsOptional()
  @IsString({
    message: "Поле createdAt должно быть строкой",
  })
  @Transform(({ value }) => (typeof value === "string" && value ? value : "asc"))
  readonly createdAt: "asc" | "desc" = "desc";
}
