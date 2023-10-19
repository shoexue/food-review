# How to set up the project

1. MySql setup

To install MySql (ex. Ubuntu)

```
sudo apt install mysql-server
mysql --version
sudo /etc/init.d/mysql start
```

MySql Setup:

```
sudo mysql_secure_installation
```

> ```
> Securing the MySQL server deployment.
> Enter password for user root:
>
> VALIDATE PASSWORD COMPONENT can be used to test passwords
> and improve security. It checks the strength of password
> and allows the users to set only those passwords which are
> secure enough. Would you like to setup VALIDATE PASSWORD component?
>
> Press y|Y for Yes, any other key for No: n
> Using existing password for root.
> Change the password for root ? ((Press y|Y for Yes, any other key for No) : n
>
> ... skipping.
> By default, a MySQL installation has an anonymous user,
> allowing anyone to log into MySQL without having to have
> a user account created for them. This is intended only for
> testing, and to make the installation go a bit smoother.
> You should remove them before moving into a production
> environment.
>
> Remove anonymous users? (Press y|Y for Yes, any other key for No) : y
> Success.
>
> Normally, root should only be allowed to connect from
> 'localhost'. This ensures that someone cannot guess at
> the root password from the network.
>
> Disallow root login remotely? (Press y|Y for Yes, any other key for No) : y
> Success.
>
> By default, MySQL comes with a database named 'test' that
> anyone can access. This is also intended only for testing,
> and should be removed before moving into a production
> environment.
>
> Remove test database and access to it? (Press y|Y for Yes, any other key for No) : n
>
> ... skipping.
> Reloading the privilege tables will ensure that all changes
> made so far will take effect immediately.
>
> Reload privilege tables now? (Press y|Y for Yes, any other key for No) : y
> Success.
>
> All done!
> ```

For simplicity's sake, for your dev environemnt, set the password to 'root' or something else easy to remember. If you change it to something other than 'root', save it as you will need it later for setting up environment variables.

2. Project setup

Make an env file (a file called `.env` in the root folder of the project (the same folder that has `package.json` in it)) with the following line:

```
DATABASE_URL="mysql://root:root@localhost:3306/reviews"
```

If you changed the root password or made a custom config, the format for the connection string is

```
DATABASE_URL="mysql://<USERNAME>:<PASSWORD>@localhost:<PORT>/reviews"
```

Port 3306 is the mysql default.

Then run

```
pnpm i
npx prisma db push
npx prisma generate
npx prisma db seed
```

You can run `npx prisma studio` to visualize data in the databases;
Run `npx prisma db seed` to seed the database with tags

Admin page password setup:
Generate admin password:

```
openssl rand -hex 4096
```

Add line to env file:

```
SECRET_KEY="<random bytes>"

```

You can then access the page by going to /admin?password=\<the password you generated\>

Planned features (in decreasing order of importance):

- image support
- item search
- email notifications for specific meals
- multiple dining hall support
