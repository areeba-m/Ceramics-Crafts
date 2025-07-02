Order Api Documentation
---

POST Place Order API:
http://localhost:8080/api/orders/placeOrder

Description: User can place an order by sending a placeOrderRequest

Request:
{
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ],
  "userId": 8,
  "name": "Areeba Mujahid",
  "address": "123 Main Street",
  "city": "Lahore",
  "phoneNumber": "03001234567",
  "totalAmount": 3998.00
}

Success response:
Note: sending totalAmount in request is optional. Amount will be recalculated and sent in response
{
    "message": "Successfully placed an order.",
    "data": {
        "orderId": 1,
        "userId": 8,
        "name": "Areeba Mujahid",
        "items": [
            {
                "productId": 1,
                "productName": "Vase",
                "productPrice": 39.99,
                "productQuantity": 2
            }
        ],
        "totalAmount": 79.98,
        "orderDate": "2025-07-01T11:27:13.0518747",
        "shippingAddress": "123 Main Street Lahore"
    }
}

Errors:
1. Incorrect user id
{
    "message": "Could not place order.",
    "data": "User not found."
}

2. Incorrect product id
{
    "message": "Could not place order.",
    "data": "Product not found."
}

3. No items sent/ blank item list
{
    "message": "Validation error",
    "data": "items: Item list can not be empty."
}

4. Missing fields
{
    "message": "Validation error",
    "data": "city: City is required. "
}

5. Negative quantity
{
    "message": "Validation error",
    "data": "items[0].quantity: Quantity must be greater than 0. "
}

---

GET All Orders API:
http://localhost:8080/api/orders

Description: Fetches all orders from database

Success Response:
{
    "message": "Successfully fetched all orders.",
    "data": [
        {
            "orderId": 1,
            "userId": 8,
            "name": "Areeba Mujahid",
            "items": [
                {
                    "productId": 1,
                    "productName": "Vase",
                    "productPrice": 39.99,
                    "productQuantity": 2
                }
            ],
            "totalAmount": 79.98,
            "orderDate": "2025-07-01T11:27:13.051875",
            "shippingAddress": "123 Main Street Lahore"
        },
        {
            "orderId": 4,
            "userId": 8,
            "name": "Doraemon",
            "items": [
                {
                    "productId": 1,
                    "productName": "Vase",
                    "productPrice": 39.99,
                    "productQuantity": 2
                },
                {
                    "productId": 5,
                    "productName": "Cute Bowl",
                    "productPrice": 19.99,
                    "productQuantity": 1
                }
            ],
            "totalAmount": 99.97,
            "orderDate": "2025-07-01T11:58:50.53269",
            "shippingAddress": "123 Main Street Lahore"
        }
    ]
}

---

GET Order By ID:
http://localhost:8080/api/orders/{id}

Description:  Fetches an order by its order id.

Success Response:
{
    "message": "Successfully fetched an order.",
    "data": {
        "orderId": 4,
        "userId": 8,
        "name": "Doraemon",
        "items": [
            {
                "productId": 1,
                "productName": "Vase",
                "productPrice": 39.99,
                "productQuantity": 2
            },
            {
                "productId": 5,
                "productName": "Cute Bowl",
                "productPrice": 19.99,
                "productQuantity": 1
            }
        ],
        "totalAmount": 99.97,
        "orderDate": "2025-07-01T11:58:50.53269",
        "shippingAddress": "123 Main Street Lahore"
    }
}

Error:
1. Incorrect order id
{
    "message": "Could not find order.",
    "data": "Order not found"
}

---

GET Order by User ID:
http://localhost:8080/api/orders/user/{id}

Description: Fetches all orders placed by a user

Success Response:
{
    "message": "Successfully fetched orders by this user.",
    "data": [
        {
            "orderId": 1,
            "userId": 8,
            "name": "Areeba Mujahid",
            "items": [
                {
                    "productId": 1,
                    "productName": "Vase",
                    "productPrice": 39.99,
                    "productQuantity": 2
                }
            ],
            "totalAmount": 79.98,
            "orderDate": "2025-07-01T11:27:13.051875",
            "shippingAddress": "123 Main Street Lahore"
        },
        {
            "orderId": 4,
            "userId": 8,
            "name": "Doraemon",
            "items": [
                {
                    "productId": 1,
                    "productName": "Vase",
                    "productPrice": 39.99,
                    "productQuantity": 2
                },
                {
                    "productId": 5,
                    "productName": "Cute Bowl",
                    "productPrice": 19.99,
                    "productQuantity": 1
                }
            ],
            "totalAmount": 99.97,
            "orderDate": "2025-07-01T11:58:50.53269",
            "shippingAddress": "123 Main Street Lahore"
        }
    ]
}

Error:
1. Incorrect user id
{
    "message": "Could not find orders placed by this user.",
    "data": "User not found"
}

---

DELETE Order by Id:
http://localhost:8080/api/orders/{int}

Description: Takes integer id and deletes the order and corresponding order items from database.

Success Response:
{
    "message": "Successfully deleted order.",
    "data": null
}

Error:
1. Incorrect order id
{
    "message": "Could not delete order.",
    "data": "Order not found"
}
