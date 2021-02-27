import { createConnection, Connection, getConnectionOptions } from 'typeorm';


export default async (): Promise<Connection> => {

    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            // se database for para teste, use tal, se nao use o default
            database: 
                process.env.NODE_ENV === 'test'
                ? "./src/database/database.test.sqlite" 
                : defaultOptions.database
        })
    );
}