from sqlalchemy import create_engine

connection_string = (
    "mssql+pyodbc://@mvp-sqlserver.database.windows.net/sqldb-mvp"
    "?driver=ODBC+Driver+18+for+SQL+Server"
    "&authentication=ActiveDirectoryDefault"
)

engine = create_engine(connection_string)

with engine.connect() as conn:
    result = conn.execute("SELECT @@VERSION")
    print(result.fetchone())