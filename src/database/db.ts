import mysql from 'serverless-mysql';

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});

export default async function excuteQuery<T>({
  query,
  values,
}: {
  query: string;
  values?: any[];
}): Promise<{ res?: T; error?: Error }> {
  try {
    const results = await db.query<T>(query, values);
    await db.end();
    return { res: results };
  } catch (error) {
    return { error: new Error(String(error)) };
  }
}
