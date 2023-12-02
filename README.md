## Digital Cow Hut Admin With Auth

#### Live Link: https://digi-cow-hut-auth.vercel.app/api/v1/

### Application Routes:

### Auth (User)

- Route: https://digi-cow-hut-auth.vercel.app/api/v1/auth/login (POST) ✅
- Route: https://digi-cow-hut-auth.vercel.app/api/v1/auth/signup (POST) ✅
- Route: https://digi-cow-hut-auth.vercel.app/api/v1/auth/refresh-token (POST) ✅

### Auth (Admin)

- Route: https://digi-cow-hut-auth.vercel.app/api/v1/admins/create-admin (POST) ✅
- Route: https://digi-cow-hut-auth.vercel.app/api/v1/admins/login (POST) ✅

### User

- Route: https://digi-cow-hut-auth.vercel.app/api/v1/users (GET) ✅
- Route: https://digi-cow-hut-auth.vercel.app/api/v1/users/64ab858c177ebb80e6a1072b (Single GET) ✅
- Route: https://digi-cow-hut-auth.vercel.app/api/v1/users/64aba4c12a3b3c4ebee5f9bf (PATCH) ✅
- Route: https://digi-cow-hut-auth.vercel.app/api/v1/users/64aba4f62a3b3c4ebee5f9c1 (DELETE) ✅

#### Cows

- Route: https://digi-cow-hut-auth.vercel.app/api/v1/cows (POST) ✅
- Route: https://digi-cow-hut-auth.vercel.app/api/v1/cows (GET) ✅
- Route: https://digi-cow-hut-auth.vercel.app/api/v1/cows/64abc28cdac2a035b21ff36a (Single GET) ✅
- Route: https://digi-cow-hut-auth.vercel.app/api/v1/cows/64abcf55a7905f3f2744ee6e (PATCH) ✅
- Route: https://digi-cow-hut-auth.vercel.app/api/v1/cows/64abcf6ea7905f3f2744ee72 (DELETE) ✅

#### Orders

- Route: https://digi-cow-hut-auth.vercel.app/api/v1/orders (POST) ✅
- Route: https://digi-cow-hut-auth.vercel.app/api/v1/orders (GET) ✅

##

#### Admin

- Route: https://digi-cow-hut-auth.vercel.app/api/v1/admins/create-admin (POST) ✅

#### My Profile

- Route: https://digi-cow-hut-auth.vercel.app/api/v1/users/my-profile (GET) ✅
- Route: https://digi-cow-hut-auth.vercel.app/api/v1/users/my-profile (PATCH) ✅

#### Order:

- Route: https://digi-cow-hut-auth.vercel.app/api/v1/orders/64abe274dbccbe70536e0a62 ✅ (GET)

<br>
<br>

# Digital Cow Hut Admin With Auth Overview

### Auth, Admin, User, Profile, Cow, Order

## Auth APIs :

- **Create User** : https://digi-cow-hut-auth.vercel.app/api/v1/auth/signup (POST) ✅
- - Password Hashed & save at user collection.
- - **Request** :
- - - Body :

```
{
    "password": "123",
    "role": "buyer",
    "name": {
        "firstName": "Mr. John",
        "lastName": "Doe"
    },
    "phoneNumber": "0181111110",
    "address": "Mymensingh",
    "budget": 270000,
    "income": 0
}
```

- **Login User** : https://digi-cow-hut-auth.vercel.app/api/v1/auth/login (POST) ✅
- - verity : user exists at db? & hashed password matched?
- - Next create : accessToken (send in response) & refreshToken (set at browser cookies).
- - **Request** :
- - - Body :

```
{ "phoneNumber": "0160000000", "password": "123" }
```

- **Refresh Token** : https://digi-cow-hut-auth.vercel.app/api/v1/auth/refresh-token (POST) ✅
- - accessToken expires.
- - - get refreshToken from browser cookies.
- - - verity & retrieve data from token's payload
- - - user exists at db?.
- - Next create: **new** accessToken (send in response) & refreshToken (set at browser cookies).
- - **Request** :
- - - Cookies :

```
{ "refreshToken": "" }
```

## Admin APIs :

- **Create Admin** : https://digi-cow-hut-auth.vercel.app/api/v1/admins/create-admin (POST) ✅
- - Password Hashed & save at admin collection.
- - **Request** :
- - - Body :

```
{
    "password": "12345678",
    "role": "admin",
    "name": {
        "firstName": "Mr. Big",
        "lastName": "Boss"
    },
    "phoneNumber": "0160000000",
    "address": "Khulna"
}
```

- **Login Admin** : https://digi-cow-hut-auth.vercel.app/api/v1/admins/login (POST) ✅
- - verity : admin exists at db? & hashed password matched?
- - Next create : accessToken (send in response) & refreshToken (set at browser cookies).
- - **Request** :
- - - Body :

```
{ "phoneNumber": "0160000000", "password": "123" }
```

## User APIs :

- **Get all Users** : https://digi-cow-hut-auth.vercel.app/api/v1/users (GET) ✅
- - login required : `admin`
- - **Request** :
- - - Headers : `{ accessToken:""}`
- **Get a User** : https://digi-cow-hut-auth.vercel.app/api/v1/users/64ab858c177ebb80e6a1072b (GET) ✅
- - login required : `admin`
- - **Request** :
- - - Headers : `{ accessToken:""}`
- - - Params : `{ id:userId}`
- **Delete a User** : https://digi-cow-hut-auth.vercel.app/api/v1/users/64aba4f62a3b3c4ebee5f9c1 (DELETE) ✅
- - login required : `admin`
- - **Request** :
- - - Headers : `{ accessToken:""}`
- - - Params : `{ id:userId}`
- **Update User** : https://digi-cow-hut-auth.vercel.app/api/v1/users/64aba4c12a3b3c4ebee5f9bf (PATCH) ✅
- - password update? hashed.
- - login required: `admin`
- - **Request** :
- - - Headers : `{ accessToken:""}`
- - - Params : `{ id:userId}`
- - - Body :

```
{
    "password": "123",
    "role": "seller",
    "name": {
        "firstName": "Mr. John",
        "lastName": "Wick"
    },
    "phoneNumber": "0160000000",
    "address": "Dhaka",
    "budget": 0,
    "income": 0
}
```

## Profile APIs :

- **Get Profile**: https://digi-cow-hut-auth.vercel.app/api/v1/users/my-profile (GET) ✅
- - retrieve data using accessToken
- - login required: `admin` | `buyer` | `seller`
- - **Request** :
- - - Headers : `{ accessToken:""}`
- Update Profile: https://digi-cow-hut-auth.vercel.app/api/v1/users/my-profile (PATCH) ✅
- - retrieve data using accessToken
- - login required : `admin` | `buyer` | `seller`
- - **Request** :
- - - Headers : `{ accessToken:""}`
- - - Body :

```
{
    "password": "123",
    "name": {
        "firstName": "Md. Updated",
        "lastName": "Khan"
    },
   "phoneNumber": "0160000000"
}
```

<br/>

## Cows & Orders APIs:

### Cows

- **Create Cow**: https://digi-cow-hut-auth.vercel.app/api/v1/cows (POST) ✅
- - login required : `seller`
- - **Request** :
- - - Headers : `{ accessToken:""}`
- - - Body : **NB. seller field must be user id.**

```
{
  "name": "Sultan",
  "age": 3,
  "price": 70000,
  "location": "Mymensingh",
  "breed": "Kankrej",
  "weight": 150,
  "label": "for sale",
  "category": "DualPurpose",
  "seller": "64ab858c177ebb80e6a1072b" // seller === user id
}
```

- **Get all Cows** : https://digi-cow-hut-auth.vercel.app/api/v1/cows (GET) ✅
- - **search** :
    https://digi-cow-hut-auth.vercel.app/api/v1/cows?searchTerm=dai (GET) ✅
- - **pagination** :
    https://digi-cow-hut-auth.vercel.app/api/v1/cows?page=1&limit=2 (GET) ✅
- - **sort** :
    https://digi-cow-hut-auth.vercel.app/api/v1/cows?sortBy=price&sortOrder=desc (GET) ✅
- - **range** :
    https://digi-cow-hut-auth.vercel.app/api/v1/cows?minPrice=40000&maxPrice=50000 (GET) ✅
- - login required : `admin` | `buyer` | `seller`
- - **Request** :
- - - Headers : `{ accessToken:""}`
- **Get a Cow**: https://digi-cow-hut-auth.vercel.app/api/v1/cows/64abc28cdac2a035b21ff36a (Single GET) ✅
- - login required : `admin` | `buyer` | `seller`
- - **Request** :
- - - Headers : `{ accessToken:""}`
- **Update Cow**: https://digi-cow-hut-auth.vercel.app/api/v1/cows/64abcf55a7905f3f2744ee6e (PATCH) ✅
- - login required : `seller`
- - **Specific access to only the seller of the cow.**
- - **Request** :
- - - Headers : `{ accessToken:""}`
- - - Params : `{ id:cowId}`
- - - Body : **NB. if seller update? then it must be user id**

```
{
  "name": "Sultan",
  "age": 3,
  "price": 37000,
  "location": "Mymensingh",
  "breed": "Kankrej",
  "weight": 157,
  "label": "for sale",
  "category": "DualPurpose",
  "seller": "64ab858c177ebb80e6a1072b" // seller === user id
}
```

- **Delete Cow**: https://digi-cow-hut-auth.vercel.app/api/v1/cows/64abcf6ea7905f3f2744ee72 (DELETE) ✅
- - login required : `seller`
- - **Specific access to only the seller of the cow.**
- - **Request** :
- - - Headers : `{ accessToken:""}`
- - - Params : `{ id:cowId}`

<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->
<!--  -->

## Orders APIs:

- **Create Order :** https://digi-cow-hut-auth.vercel.app/api/v1/orders (POST) ✅
- - database write operations:
- - - seller income addition
- - - buyer budget deduction
- - - cow.label : sold out
- - - save data on order collection
- - login required: `buyer`
- - **Request** :
- - - Headers : `{ accessToken:""}`
- - - Body : **NB. buyer must be user id**.

```
{
  "cow": "64abc88f8c7e1773eb5b69d6",
  "buyer": "64ab88e30d765eeea9b69a81"   // buyer must login user
}
```

- **Get Orders :** https://digi-cow-hut-auth.vercel.app/api/v1/orders (GET) ✅
- - login required : `admin` | `buyer` | `seller`
- - Access :
- - - _all admin_
- - - **specific seller** : _only the seller of the cow_
- - - **specific buyer** : _only the buyer of the cow_
- - **Request** :
- - - Headers : `{ accessToken:""}`
- **Get a Order :** https://digi-cow-hut-auth.vercel.app/api/v1/orders/64abe274dbccbe70536e0a62 ✅ (GET)
- - login required : `admin` | `buyer` | `seller`
- - Access :
- - - _all admin_
- - - **specific seller** : _only the seller of the cow_
- - - **specific buyer** : _only the buyer of the cow_
- - **Request** :
- - - Headers : `{ accessToken:""}`
- - - Params : `{ id:OrderId}`
