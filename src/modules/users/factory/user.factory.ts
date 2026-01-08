// import { UserRepository } from 'src/models';

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { User } from 'src/modules/auth/entities/auth.entity';
// import { Gender } from 'src/common';

// @Injectable()
// export class UserFactory {
//   constructor(private readonly userRepo: UserRepository) {}

//   async update(id: string, updateUserDto: UpdateUserDto, user: any) {
//     //check if user exists
//     const userExist = await this.userRepo.getOne({ _id: id });

//     if (!userExist) {
//       throw new NotFoundException('User not found');
//     }
//     const updatedUser = new User();
//     const newName = updateUserDto.userName || userExist.userName;
//     const newDob = updateUserDto.dob;
//     const newGender = updateUserDto.gender || userExist.gender;
//     updatedUser.userName = newName;
//     updatedUser.dob = newDob;
//     updatedUser.gender = newGender as Gender; // Type assertion

//     updatedUser.email = userExist.email;
//     updatedUser.password = userExist.password;
//     updatedUser.isVerified = userExist.isVerified;
//     updatedUser.otp = userExist.otp;
//     updatedUser.otpExpiration = userExist.otpExpiration;
//     updatedUser.isActive = userExist.isActive;

//     return updatedUser;
//   }
// }
