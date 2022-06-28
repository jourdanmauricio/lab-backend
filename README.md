docker-compose up -d

npm run dev

docker-compose exec postgres bash
psql -h localhost -d lab_store -U labadmin

\d+

\d table

---

Error: listen EADDRINUSE: address already in use :::3000

lsof -i tcp:3000
$ kill -9 PID

# lab-backend p
