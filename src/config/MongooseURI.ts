const env = process.env;
const mongooseURI = `mongodb://${env['database_user']}:${env['database_password']}@${env['database_cluster']}/${env['database_name']}`;
export default mongooseURI;