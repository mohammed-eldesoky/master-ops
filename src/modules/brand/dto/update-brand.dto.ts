import { IsString, IsNotEmpty, MinLength, IsOptional, IsObject } from "class-validator";


export class UpdateBrandDto  {
      @IsString()
      @IsNotEmpty()
      @MinLength(2, { message: 'Name must be at least 2 characters long' })
      name: string;
    
      @IsString()
      @IsOptional()
      description: string;
    
      @IsObject()
      @IsOptional()
      logo: {
        secure_url: string;
        public_id: string;
      };
}
