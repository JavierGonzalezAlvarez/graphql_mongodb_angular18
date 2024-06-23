import { getLogger } from "../../LogConfig";
import { Service } from "typedi";
import { MESSAGES } from "../utils/messages";
import { getDbName } from "../utils/utils";
import { URL, COLLECTIONS } from '../utils/constants';

import { v4 as uuidv4 } from 'uuid';
import { MongoClient } from 'mongodb';
import * as mongoDB from "mongodb";
import { InstalationInput, TypeInstalation, TypeResponseInstalation } from "../types/typeInstalation";

const DateTimeISO = new Date().toISOString();
const logCollection = getLogger("collection");
const logInstalaciones = logCollection.getChildCategory("Instalaciones");

@Service()
export class InstalationService {

    async getAllInstalations(code: string): Promise<TypeResponseInstalation> {
        let client: MongoClient | undefined;           
        try { 
            console.log("getAllInstalations");
            const client: mongoDB.MongoClient = new mongoDB.MongoClient(URL);           
            await client.connect();                                 
                        
            const DBNAME = await getDbName(client, code)
            console.log('nombre de la collection:', DBNAME);

            const db: mongoDB.Db = client.db(DBNAME);  
            const collection: mongoDB.Collection = db.collection(COLLECTIONS.INSTALACIONES);

            const dataCursor = await collection.find({}, {
                projection: { _id: 0 }
            });
            const data = await dataCursor.toArray();
            console.log('data:', data);
      
            const formattedData: TypeInstalation[] = data.map((doc: any) => ({
                code_instalation: doc.code_instalation,
                description_instalation: doc.description_instalation,
                status_instalation: doc.status_instalation,
                created_at: doc.created_at,
                updated_at: doc.updated_at
            }));

            const responseInstalation: TypeResponseInstalation = {
                status_code: 201,                
                message: MESSAGES.listarInstalacion,
                data: formattedData
            };                                

            console.log('respose data:', responseInstalation);

            return responseInstalation;
        
        } catch (error) {            
            console.error("Error al guardar la instalación:", error);
            throw error;                      
        } finally {
            console.error('Conexion cerrada');
            if (client) {
                await client.close();
            }            
        }         
    }    

    async addInstalationResponse(code: string, data: InstalationInput): Promise<TypeResponseInstalation> {   
        let client: MongoClient | undefined;    
        try {            
            const client: mongoDB.MongoClient = new mongoDB.MongoClient(URL);           
            await client.connect();                                        
            
            const DBNAME = await getDbName(client, code)
            console.log('nombre de la collection:', DBNAME);            

            const DateTimeObject = new Date(DateTimeISO);

            const dataUpdated: InstalationInput = {
                "code_instalation": uuidv4(),
                "description_instalation": data.description_instalation,
                "status_instalation": data.status_instalation,
                "created_at": DateTimeObject,
                "updated_at": DateTimeObject
            }

            if (DBNAME) {        
                const db: mongoDB.Db = client.db(DBNAME);           
                const collection: mongoDB.Collection = db.collection(COLLECTIONS.INSTALACIONES);
            
                const result = await collection.insertOne(dataUpdated);            
                console.log('Document inserted with _id: ', result.insertedId);
        
                const responseInstalation: TypeResponseInstalation = {
                    status_code: 201,                
                    message: MESSAGES.crearInstalacion,
                    data: [data]
                };             
                console.log("payload grabado: ", data);      
    
                logInstalaciones.info("Registro grabado");  
                logInstalaciones.debug(() => "Registro grabado", data);                    
    
                return responseInstalation;
                
            } else {
                console.error('no existe DBNAME');
            }                        
        
        } catch (error) {            
            console.error("Error al guardar la instalación:", error);
            throw error;                     
        } finally {
            console.error('Conexion cerrada');            
            if (client) {
                await client.close();
            }  
        }              
    }

    async updateInstalationResponse(code: string, data: TypeInstalation[]): Promise<TypeResponseInstalation> {   
        let client: MongoClient | undefined;    
        try {            
            const client: mongoDB.MongoClient = new mongoDB.MongoClient(URL);           
            await client.connect();                
                        
            console.log('code:', code);
                        
            const DBNAME = await getDbName(client, code)
            console.log('nombre de la collection update:', DBNAME);                       
            const DateTimeObject = new Date(DateTimeISO);
        
            if (DBNAME) {        
                const db: mongoDB.Db = client.db(DBNAME);           
                const collection: mongoDB.Collection = db.collection(COLLECTIONS.INSTALACIONES);
                            
                for (const record of data) { 
                    console.log("data from front: ", record)               ;

                    const filter = { "code_instalation": record.code_instalation }

                    const dataUpdated = {
                        "code_instalation": record.code_instalation,
                        "description_instalation": record.description_instalation,
                        "status_instalation": record.status_instalation,                        
                        "updated_at": DateTimeObject
                    }

                    const updateDoc = {
                        $set: {
                            description_instalation: dataUpdated.description_instalation,
                            status_instalation: dataUpdated.status_instalation,                            
                            updated_at: dataUpdated.updated_at
                        }
                    };

                    console.log("set data: ", updateDoc)  

                    const result = await collection.findOneAndUpdate(filter, updateDoc);            
                    console.log('Document updated with _id: ', result._id);
                }
        
                const responseInstalation: TypeResponseInstalation = {
                    status_code: 201,                
                    message: MESSAGES.updateInstalacion,
                    data: data
                };             
                console.log("payload actualizado: ", data);      
    
                logInstalaciones.info("Registro actualizado");  
                logInstalaciones.debug(() => "Registro actualizado", data);                    
    
                return responseInstalation;
                
            } else {
                console.error('no existe DBNAME');
            }                        
        
        } catch (error) {            
            console.error("Error al guardar la instalación:", error);
            throw error;                 
        } finally {
            console.error('Conexion cerrada');            
            if (client) {
                await client.close();
            }  
        }              
    }

}
    