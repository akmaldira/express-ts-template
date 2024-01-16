import app from "@/app";
import { appConfig, dbConfig } from "@config/environments";
import { databaseConnect } from "@database/datasource";
import { print } from "./utils/print-express-route";

app.listen(appConfig.PORT, async () => {
  databaseConnect();
  console.table({
    NODE_ENV: appConfig.NODE_ENV,
    API_URL: "http://localhost:" + appConfig.PORT,
    DB_NAME: dbConfig.DB_NAME,
    DB_HOST: dbConfig.DB_HOST,
  });

  if (appConfig.NODE_ENV === "development") {
    console.log(`Available routes:`);
    app._router.stack.forEach(print.bind(null, []));
  }
});
