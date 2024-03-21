import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

import { RegisterDto } from "src/auth/dto/register.dto";

@ValidatorConstraint()
export class IsPasswordsMatchingConstraint implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments): boolean {
    const obj = args.object as RegisterDto;
    return obj.password === obj.passwordRepeat;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return "Passwords do not match";
  }
}
