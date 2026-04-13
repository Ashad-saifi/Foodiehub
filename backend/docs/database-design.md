# Database Design - FoodieHub

---

## User
- _id
- name
- email
- password
- isLoggedIn
- createdAt

---

## Restaurant
- _id
- name
- image
- rating
- reviews
- priceRange
- cuisine
- distance
- deliveryTime
- isOpen
- description

---

## MenuItem
- _id
- restaurantId
- name
- price
- category
- image
- description

---

## Cart
- _id
- userId
- items: [
  {
    menuItemId
    name
    price
    quantity
  }
]
- totalPrice

---

## Order
- _id
- userId
- items: [
    {
      menuItemId
      name
      price
      quantity
    }
  ]
- totalPrice
- status
- createdAt