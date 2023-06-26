## Digital Cow Hut Backend:

### Live Link: https://digi-cow-hut.vercel.app/api/v1

### Application Routes :

#### User :

- api/v1/auth/signup (POST)
- api/v1/users (GET)
- api/v1/users/64925ebc7abf45bc789d10c2 (GET)
- api/v1/users/64925ebc7abf45bc789d10c2 (PATCH)
- api/v1/users/64925ebc7abf45bc789d10c2 (DELETE)

#### Cows :

- api/v1/cows (POST)
- api/v1/cows (GET)
- api/v1/cows/6493915f6b4c15647b4b09c1
- api/v1/cows/6493915f6b4c15647b4b09c1
- api/v1/cows/6493915f6b4c15647b4b09c1

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
    Examples
</h2>

### Users :

Create A Users : (POST)

`https://digi-cow-hut.vercel.app/api/v1/signup`

Body :

```
{
 "password":"abcd1234",
 "role": "buyer",
  "name": {
    "firstName": "Md. Rakib",
     "lastName": "Khan"
  },
 "phoneNumber":"01812345678",
 "address": "Dhaka",
 "budget":100000,
 "income":0
}
```

**Get All Users : (GET)**

`https://digi-cow-hut.vercel.app/api/v1/users`

**Get Single User : (GET)**

`https://digi-cow-hut.vercel.app/api/v1/users/64925ebc7abf45bc789d10c2`

**Delete A User : (DELETE)**

`https://digi-cow-hut.vercel.app/api/v1/users/64925ebc7abf45bc789d10c2`

**Update A User : (UPDATE)**

`https://digi-cow-hut.vercel.app/api/v1/users/64925ebc7abf45bc789d10c2`

Body :

```
{
  "name": {
    "firstName": "Md. Rakibul",
  },
 "budget":150000,
}
```

<h1></h1>

### Cows :

**Create A Cow : (POST)**

`https://digi-cow-hut.vercel.app/api/v1/cows`

Example Body :

```
{
  "name": "Sultan",
  "age": 3,
  "price": 50000,
  "location": "Mymensingh",
  "breed": "Kankrej",
  "weight": 300,
  "label": "for sale",
  "category": "Beef",
  "seller": "64925ebc7abf45bc789d10c2"
}
```

**Get All Cows : (GET)**

`https://digi-cow-hut.vercel.app/api/v1/cows`

Pagination :

```
https://digi-cow-hut.vercel.app/api/v1/cows?searchTerm=dai&page=1&limit=1&sortBy=price&sortOrder=asc&minPrice=5000&maxPrice=5000&location=Mymensingh

https://digi-cow-hut.vercel.app/api/v1/cows?page=1&limit=5

https://digi-cow-hut.vercel.app/api/v1/cows?searchTerm=dai

https://digi-cow-hut.vercel.app/api/v1/cows?sortBy=price&sortOrder=asc

https://digi-cow-hut.vercel.app/api/v1/cows?minPrice=5000&maxPrice=20000

https://digi-cow-hut.vercel.app/api/v1/cows?location=Mymensingh

```

**Get Single Cow : (GET)**

`https://digi-cow-hut.vercel.app/api/v1/cows/6493915f6b4c15647b4b09c1`

**Delete A Cow : (DELETE)**

`https://digi-cow-hut.vercel.app/api/v1/cows/6493915f6b4c15647b4b09c1`

**Update A Cow : (UPDATE)**

`https://digi-cow-hut.vercel.app/api/v1/cows/6493915f6b4c15647b4b09c1`

Example Body :

```
{
  "age": 4,
  "price": 55000,
  "weight": 310,
}
```

<!--  -->

<h1></h1>

### Orders :

**Create orders : (POST)**

`https://digi-cow-hut.vercel.app/api/v1/orders`

Example Body :

```
{
  "cow": "6493915f6b4c15647b4b09c1",
  "buyer": "6494cea3e58faac9231a7497"
}
```

**Get All Orders : (GET)**

`https://digi-cow-hut.vercel.app/api/v1/orders`
