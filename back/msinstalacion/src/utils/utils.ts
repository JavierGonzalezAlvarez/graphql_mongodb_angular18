import { MongoClient } from 'mongodb';
import { COLLECTIONS, DATABASE } from './constants';


export async function getDbName(client: MongoClient, code: string): Promise<string | null> {
  try {

    // NO AGGREGATION
    const collection = client.db(DATABASE.ADMON).collection(COLLECTIONS.GENERAL_DATA_ADMON);
    const dbRecord = await collection.find({
        ff: {
            $elemMatch: {
                $elemMatch: {
                    $eq: code
                }
            }
        }
    }, {
        projection: {
            ff: {
                $filter: {
                    input: '$ff',
                    as: 'f',
                    cond: { $in: [code, '$$f'] }
                }
            }
        }
    });
    console.log("result:", dbRecord.toArray());

    // AGGREGATION
    const aggregationPipeline = [
        {
            $match: {
                ff: {
                    $elemMatch: {
                        $elemMatch: {
                            $eq: code
                        }
                    }
                }
            }
        },
        {
            $project: {
                ff: {
                    $filter: {
                        input: '$ff',
                        as: 'f',
                        cond: { $in: [code, '$$f'] }
                    }
                }
            }
        }
    ];
    
    const dbRecords = await collection.aggregate(aggregationPipeline).toArray();
    console.log("Aggregation result:", dbRecords);
    console.log("Aggregation result:", dbRecords[0].ff); 


    if (dbRecords && dbRecords[0].ff && dbRecords[0].ff.length > 0) {
        return dbRecords[0].ff[0][1];
    }
    
    return null;

  } catch (error) {
    console.error('Error fetching DB name:', error);
    return null;
  }
}
