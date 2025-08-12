import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isMinLessThanMax', async: false })
export class IsMinLessThanMax implements ValidatorConstraintInterface {
  validate(minValue: number, args: ValidationArguments) {
    const object = args.object as any;
    const maxValue = object.maxValue;
    if (minValue != null && maxValue != null) {
      return minValue < maxValue;
    }
    return true;
  }

  defaultMessage() {
    return `minValue must be less than maxValue`;
  }
}
