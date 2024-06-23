export interface InstalationsData {     
    code_instalation?: string; 
    description_instalation: string;
    status_instalation: boolean;
    created_at: Date;
    updated_at: Date;
}


export interface InstalationInput {    
    code_instalation?: string;       
    description_instalation: string;
    status_instalation: boolean;
    created_at?: Date;
    updated_at: Date;
}
