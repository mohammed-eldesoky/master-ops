import { Types } from 'mongoose';
import { EMPLOYEE_ROLE, EMPLOYEE_STATUS } from 'src/common';

export class Employee {
  //________________ Basic Info _________________//

  fullName: string;

  email: string;

  phone: string;

  //________________ Job Info _________________//

  departmentId: Types.ObjectId;

  jobTitle: string;

  role?: EMPLOYEE_ROLE; // HR, MANAGER, ACCOUNTANT ...

  status: EMPLOYEE_STATUS;

  hireDate: Date;

  terminationDate?: Date;


  //________________ System Fields _________________//

  isActive: boolean;

  createdBy: Types.ObjectId;

  updatedBy: Types.ObjectId;
}
