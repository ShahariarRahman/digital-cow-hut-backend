## Digital Cow Hut Backend :

#### Live Link: https://digi-cow-hut.vercel.app/api/v1

### Application Routes :

#### User :

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/64994185e6fa9978d7a7572d (GET)
- api/v1/users/64994185e6fa9978d7a7572d (PATCH)
- api/v1/users/64994185e6fa9978d7a7572d (DELETE)

#### Cows :

- api/v1/cows (POST)
- api/v1/cows (GET)
- api/v1/cows/64994a3563250aec7641be13
- api/v1/cows/64994a3563250aec7641be13
- api/v1/cows/64994a3563250aec7641be13

### Pagination and Filtering routes of Cows

- api/v1/cows?page=1&limit=10
- api/v1/cows?sortBy=price&sortOrder=asc
- api/v1/cows?minPrice=20000&maxPrice=70000
- api/v1/cows?location=Chattogram
- api/v1/cows?searchTerm=Cha

#### Orders

- api/v1/orders (POST)
- api/v1/orders (GET)

<br>

<h2 align="center">
    Using Examples
</h2>

### Users :

**Create A User : `(POST)`**

```
https://digi-cow-hut.vercel.app/api/v1/signup
```

Example Body :

```
{
  "password": "12345",
  "role": "buyer",
  "name": {
      "firstName": "Md. Sakib",
      "lastName": "Khan"
  },
  "phoneNumber": "01815123456",
  "address": "Dhaka",
  "budget": 200000,
  "income": 0
}
```

**Get All Users : `(GET)`**

```
https://digi-cow-hut.vercel.app/api/v1/users
```

**Get Single User : `(GET)`**

```
https://digi-cow-hut.vercel.app/api/v1/users/64994185e6fa9978d7a7572d
```

**Delete A User : `(DELETE)`**

```
https://digi-cow-hut.vercel.app/api/v1/users/64994185e6fa9978d7a7572d
```

**Update A User : `(UPDATE)`**

```
https://digi-cow-hut.vercel.app/api/v1/users/64994185e6fa9978d7a7572d
```

Example Body :

```
{
  "name": {
    "firstName": "Md. Rakibul"
  },
 "budget":250000
}
```

<h1></h1>

### Cows :

**Create A Cow : `(POST)`**

```
https://digi-cow-hut.vercel.app/api/v1/cows
```

Example Body :

```
{
  "name": "Shah Jahan",
  "age": 3,
  "price": 77000,
  "location": "Mymensingh",
  "breed": "Kankrej",
  "weight": 300,
  "label": "for sale",
  "category": "Beef",
  "seller": "64994185e6fa9978d7a7572d"
}
```

**Get All Cows : `(GET)`**

```
https://digi-cow-hut.vercel.app/api/v1/cows
```

Pagination | Filtering | Search | Sort :

```

https://digi-cow-hut.vercel.app/api/v1/cows?page=1&limit=5

https://digi-cow-hut.vercel.app/api/v1/cows?searchTerm=Cha

https://digi-cow-hut.vercel.app/api/v1/cows?sortBy=price&sortOrder=asc

https://digi-cow-hut.vercel.app/api/v1/cows?minPrice=60000&maxPrice=80000

https://digi-cow-hut.vercel.app/api/v1/cows?location=Chattogram

// all
cows?searchTerm=Kankrej&page=1&limit=3&sortBy=price&sortOrder=asc&minPrice=60000&maxPrice=80000&location=Chattogram
```

**Get Single Cow : `(GET)`**

```
https://digi-cow-hut.vercel.app/api/v1/cows/64994a3563250aec7641be13
```

**Delete A Cow : `(DELETE)`**

```
https://digi-cow-hut.vercel.app/api/v1/cows/64994a3563250aec7641be13
```

**Update A Cow : `(UPDATE)`**

```
https://digi-cow-hut.vercel.app/api/v1/cows/64994a3563250aec7641be13
```

Example Body :

```
{
  "age": 4,
  "price": 75000,
  "weight": 270,
}
```

<h1></h1>

### Orders :

**Create orders : `(POST)`**

```
https://digi-cow-hut.vercel.app/api/v1/orders
```

Example Body :

```
{
  "cow": "64994a3563250aec7641be13",
  "buyer": "649943b0810ac783b4b1f444"
}
```

**Get All Orders : `(GET)`**

```
https://digi-cow-hut.vercel.app/api/v1/orders
```
