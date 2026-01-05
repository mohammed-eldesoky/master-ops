import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { DISCOUNT_TYPE } from '../enum/enum';

export function IsValidDiscount(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidDiscount',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const obj = args.object as any;
          const discountTypeValue = obj.disCountType;

          if (discountTypeValue === DISCOUNT_TYPE.percentage) {
            return typeof value === 'number' && value > 0 && value <= 100;
          }

          if (discountTypeValue === DISCOUNT_TYPE.fixed_amount) {
            return typeof value === 'number' && value >= 0;
          }

          return false; // important!
        },

        defaultMessage(args: ValidationArguments) {
          const obj = args.object as any;
          const discountTypeValue = obj.disCountType;

          if (discountTypeValue === DISCOUNT_TYPE.percentage) {
            return 'Discount amount cannot exceed 100 when discount type is percentage';
          }

          if (discountTypeValue === DISCOUNT_TYPE.fixed_amount) {
            return 'Discount amount must be a valid positive number';
          }

          return 'Invalid discount type';
        },
      },
    });
  };
}
