Error: listen EADDRINUSE: address already in use :::3100

lsof -i tcp:3100
$ kill -9 PID

---

docker-compose up -d

npm run dev

---

eliminar migraciones
npm run migrations:clean

---

ejecutando migraciones
npm run migrations:run

---

creando seed user-admin
sequelize seed:generate --name admin-user

---

Ejecutar todos los seeders
sequelize db:seed:all

---

revertir el seeder más reciente
sequelize db:seed:undo

---

revertir todas los seeders ejecutados
sequelize db:seed:undo:all

---

ejecutar solo un seed
npx sequelize-cli db:seed --seed 20220708154719-users.js

---

Acceso a la base de datos

docker-compose exec postgres bash
psql -h localhost -d lab_store -U labadmin

\d+

\d table

---

# lab-backend

https://polar-wave-19678.herokuapp.com/api/v1/products
