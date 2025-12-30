import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Admin,
  AdminRepository,
  adminSchema,
  Customer,
  CustomerRepository,
  customerSchema,
  Modorator,
  ModoratorRepository,
  modoratorSchema,
  User,
  UserRepository,
  userSchema,
} from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
        discriminators: [
          { name: Admin.name, schema: adminSchema },
          { name: Modorator.name, schema: modoratorSchema },
          { name: Customer.name, schema: customerSchema },
        ],
      },
    ]),
  ],
  controllers: [],
  providers: [
    ModoratorRepository,
    AdminRepository,
    CustomerRepository,
    UserRepository,
  ],
  exports: [
    ModoratorRepository,
    AdminRepository,
    CustomerRepository,
    UserRepository,
  ],
})
export class UserMongoModule {}