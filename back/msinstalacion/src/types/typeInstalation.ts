import {    
    InputType,    
    Field,     
    ObjectType,      
} from "type-graphql";

import { Min, Max, MaxLength, Length } from "class-validator";

const DateTimeISO = new Date().toISOString();

@ObjectType()
export class TypeInstalation {    
  @Field()
  code_instalation: string;
  
  @Field()
  @Length(5, 50)
  description_instalation: string;
  
  @Field()
  status_instalation: boolean;  

  @Field()  
  created_at?: Date;

  @Field()  
  updated_at: Date;
}

@ObjectType()
export class TypeResponseInstalation {      
  @Field()
  status_code: number;
  
  @Field()
  message: string;
    
  @Field(() => [TypeInstalation])
  data: TypeInstalation[];
}

@InputType()
export class InstalationInput {
  @Field()    
  code_instalation: string;
  
  @Field()
  @Length(5, 50)
  description_instalation: string;

  @Field()
  status_instalation: boolean; 
  
  @Field()  
  created_at?: Date

  @Field()  
  updated_at: Date
}