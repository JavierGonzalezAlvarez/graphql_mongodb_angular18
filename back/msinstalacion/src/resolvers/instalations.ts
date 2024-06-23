import {
    Resolver,    
    Mutation,
    Arg,    
    Query,         
} from "type-graphql";

import { InstalationService } from "../services/instalationService";
import { Service } from "typedi";
import { InstalationInput, TypeResponseInstalation } from "../types/typeInstalation";


@Service()
@Resolver()
export class InstalationsResolver {

    constructor(      
      private readonly instalationService: InstalationService // dependency injection
    ) {}             

    @Mutation(returns => TypeResponseInstalation)
    async updateInstalationResponse(      
      @Arg('code') code: string,  
      @Arg('payload', () => [InstalationInput]) payload: InstalationInput[]
    ): Promise<TypeResponseInstalation>  {
        
      return await this.instalationService.updateInstalationResponse(code, payload);
    }

    @Mutation(returns => TypeResponseInstalation) 
    async addInstalationResponse(      
      @Arg('code') code: string,  
      @Arg("payload") payload: InstalationInput
    ): Promise<TypeResponseInstalation>  {
    
      return await this.instalationService.addInstalationResponse(code, payload);
    }
    
    @Query(returns => TypeResponseInstalation)      
    async getAllInstalation(
      @Arg('code') code: string
    ): Promise<TypeResponseInstalation>  {         
      
      return await this.instalationService.getAllInstalations(code);      
    }

}

