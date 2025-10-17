import os
import psycopg2
import redis


POSTGRES_USER = os.getenv("POSTGRES_USER", "devuser")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "devpass")
POSTGRES_DB = os.getenv("POSTGRES_DB", "main_db")
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "postgres")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5432")

REDIS_HOST = os.getenv("REDIS_HOST", "redis")
REDIS_PORT = os.getenv("REDIS_PORT", "6379")

print("🔍 Probando conexión a PostgreSQL...")
try:
    conn = psycopg2.connect(
        dbname=POSTGRES_DB,
        user=POSTGRES_USER,
        password=POSTGRES_PASSWORD,
        host=POSTGRES_HOST,
        port=POSTGRES_PORT
    )
    print("✅ Conexión exitosa a PostgreSQL!")
    conn.close()
except Exception as e:
    print("❌ Error al conectar con PostgreSQL:", e)

print("\n🔍 Probando conexión a Redis...")
try:
    r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT)
    r.ping()
    print("✅ Conexión exitosa a Redis!")
except Exception as e:
    print("❌ Error al conectar con Redis:", e)