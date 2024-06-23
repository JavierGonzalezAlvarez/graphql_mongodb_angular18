import "reflect-metadata";
import { startServer } from "./server";

async function main() {     
    const app = await startServer();     
    console.log("http://localhost:8004/graphql");
    app.listen(8004);   
}

main();
