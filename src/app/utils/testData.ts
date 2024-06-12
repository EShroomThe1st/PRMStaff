import { Category } from "../models/category";
import { Order } from "../models/order";
import { Product } from "../models/product";
import { User } from "../models/user";

export const products: Product[] = [
  {
    id: "1",
    img: [
      { name: "product1.jpg", url: "https://example.com/product1.jpg" },
      { name: "product2.jpg", url: "https://example.com/product2.jpg" },
      { name: "product3.jpg", url: "https://example.com/product3.jpg" },
    ],
    name: "Wireless Headphones",
    category: "headphones",
    price: 1000,
    ratingAmount: 4.5,
    reviewAmount: 1500,
    reviews: [
      { review: "Great product, highly recommend it!", rating: 5 },
      { review: "Good sound quality but uncomfortable after long use.", rating: 4 },
    ],
    description: "High-quality wireless headphones with noise cancellation and 20 hours of battery life.",
    status: "In Stock"
  },
  {
    id: "2",
    img: [
      { name: "product2.jpg", url: "https://example.com/product2.jpg" }
    ],
    name: "Smartphone",
    category: "smartphone",
    price: 1000,
    ratingAmount: 4.8,
    reviewAmount: 3200,
    reviews: [
      { review: "Excellent smartphone, fast performance and great camera!", rating: 5 },
      { review: "Battery drains quickly, needs improvement.", rating: 3 },
    ],
    description: "Latest model smartphone with an edge-to-edge display and advanced camera features.",
    status: "In Stock"
  },
  {
    id: "3",
    img: [
      { name: "product3.jpg", url: "https://example.com/product3.jpg" }
    ],
    name: "Laptop",
    category: "computer",
    price: 1000,
    ratingAmount: 4.7,
    reviewAmount: 900,
    reviews: [
      { review: "Sleek design and powerful performance.", rating: 5 },
      { review: "Display quality is not up to the mark.", rating: 3 },
    ],
    description: "Powerful laptop with high-resolution display, fast processor, and long battery life.",
    status: "Out of Stock"
  },
  {
    id: "4",
    img: [
      { name: "product4.jpg", url: "https://example.com/product4.jpg" }
    ],
    name: "Smartwatch",
    category: "Watch",
    price: 1000,
    ratingAmount: 4.2,
    reviewAmount: 200,
    reviews: [
      { review: "Great smartwatch, accurate fitness tracking!", rating: 4 },
      { review: "Battery life is not as advertised.", rating: 3 },
    ],
    description: "Stylish smartwatch with fitness tracking, heart rate monitor, and message notifications.",
    status: "In Stock"
  },
  {
    id: "5",
    img: [
      { name: "product5.jpg", url: "https://example.com/product5.jpg" }
    ],
    name: "Bluetooth Speaker",
    category: "speaker",
    price: 1000,
    ratingAmount: 4.0,
    reviewAmount: 450,
    reviews: [
      { review: "Good sound quality for the price.", rating: 4 },
      { review: "Speaker stopped working after a few months.", rating: 2 },
    ],
    description: "Portable Bluetooth speaker with powerful sound, long battery life, and waterproof design.",
    status: "In Stock"
  }
];


export const categoriesTestData: Category[] = [
  {id: "1", key: "Headphones", value:"Headphones", orderAmount: 10, status:"Available"},
  {id: "2", key: "Smartphone", value:"Smartphone", orderAmount: 20, status:"Unavailable" },
  {id: "3", key: "Computer", value:"Computer", orderAmount: 15, status:"Available" },
  {id: "4", key: "Watch", value:"Watch", orderAmount: 8, status:"Unavailable" },
  {id: "5", key: "Speaker", value:"Speaker", orderAmount: 12, status:"Available" }
];

export const testOrders: Order[] = [
  {
    id: "ORD123456789",
    orderDate: "2024-05-22",
    customerName: "John Doe",
    status: "Paid",
    products: [
      {
        id: "PROD001",
        name: "Product 1",
        img: [
          { name: "product1-image1", url: "https://example.com/images/product1-img1.jpg" },
          { name: "product1-image2", url: "https://example.com/images/product1-img2.jpg" }
        ],
        price: 25.99,
        amount: 2,
        totalPrice: 51.98
      },
      {
        id: "PROD002",
        name: "Product 2",
        img: [
          { name: "product2-image1", url: "https://example.com/images/product2-img1.jpg" }
        ],
        price: 15.49,
        amount: 1,
        totalPrice: 15.49
      },
      {
        id: "PROD003",
        name: "Product 3",
        img: [],
        price: 45.00,
        amount: 1,
        totalPrice: 45.00
      }
    ],
    subTotal: 112.47,
    delivery: 5.99,
    orderPrice: 118.46,
    tax: 9.47,
    paymentMethod: "Credit Card",
    address: "1234 Test St, Test City, TC 12345"
  },
  {
    id: "ORD987654321",
    orderDate: "2024-05-20",
    customerName: "Jane Smith",
    status: "Not Paid",
    products: [
      {
        id: "PROD004",
        name: "Product 4",
        img: [
          { name: "product4-image1", url: "https://example.com/images/product4-img1.jpg" }
        ],
        price: 99.99,
        amount: 1,
        totalPrice: 99.99
      },
      {
        id: "PROD005",
        name: "Product 5",
        img: [
          { name: "product5-image1", url: "https://example.com/images/product5-img1.jpg" },
          { name: "product5-image2", url: "https://example.com/images/product5-img2.jpg" }
        ],
        price: 49.99,
        amount: 3,
        totalPrice: 149.97
      }
    ],
    subTotal: 249.96,
    delivery: 7.99,
    orderPrice: 257.95,
    tax: 19.99,
    paymentMethod: "PayPal",
    address: "5678 Example Blvd, Sample City, SC 67890"
  },
  {
    id: "ORD1122334455",
    orderDate: "2024-05-18",
    customerName: "Emily Johnson",
    status: "Canceled",
    products: [
      {
        id: "PROD006",
        name: "Product 6",
        img: [
          { name: "product6-image1", url: "https://example.com/images/product6-img1.jpg" }
        ],
        price: 29.99,
        amount: 4,
        totalPrice: 119.96
      },
      {
        id: "PROD007",
        name: "Product 7",
        img: [],
        price: 59.99,
        amount: 2,
        totalPrice: 119.98
      },
      {
        id: "PROD008",
        name: "Product 8",
        img: [
          { name: "product8-image1", url: "https://example.com/images/product8-img1.jpg" }
        ],
        price: 19.99,
        amount: 1,
        totalPrice: 19.99
      }
    ],
    subTotal: 259.93,
    delivery: 10.00,
    orderPrice: 269.93,
    tax: 20.79,
    paymentMethod: "Debit Card",
    address: "91011 Sample Rd, Demo City, DC 91011"
  }
];

export const roleOptions = [
  {
    value: 'Admin',
    label: 'Admin'
  },
  {
    value: 'Staff',
    label: 'Staff'
  },
  {
    value: 'Customer',
    label: 'Customer'
  },
]

export const users: User[] = [
  {
    user_id: 'c0d38e2b-3646-4e82-b1dc-6f45aa274c4f',
    first_name: 'Nguyen',
    middle_name: 'Van',
    last_name: 'A',
    password: '$2b$12$JAawKh1fknYsbp6KqjPqKuHCduI5UGppjebtPaGdXVbotpkeGpX5C',
    email: 'NguyenVanA@gmail.com',
    phone_number: '0901234567',
    last_update: '2024-04-20T22:47:40.501Z',
    is_active: true,
    role_id: 'dad0eada-f17a-42bd-baee-14fe2b4c767d',
    role_name: 'Admin',
    address: 'Something'
  },
  {
    user_id: '8ece8a5c-3012-4016-b1cd-2201aedcdd0b',
    first_name: 'Truong',
    middle_name: 'Quang Hong',
    last_name: 'Phuc',
    password: '$2b$12$4lYWcIOqQ9i7sUmrKaJ5i.HxSj.ppyoguadcq9hjGnntqYUukrpaC',
    email: 'Ufd34@gmail.com',
    phone_number: '0386691787',
    last_update: '2024-04-17T01:22:40.607Z',
    is_active: true,
    role_id: 'dad0eada-f17a-42bd-baee-14fe2b4c767d',
    role_name: 'Customer',
    address: 'Something'
  },
  {
    user_id: '2efb2aae-41ef-4212-999a-e10f1ef2606f',
    first_name: 'Vo',
    middle_name: 'Minh',
    last_name: 'Thang',
    password: '$2b$12$dnR4EX0uiPxv1eTPImHHM.WYcANJn56bt8wrRuiwGNhHIiMt2ldoS',
    email: 'osFg62Z@gmail.com',
    phone_number: '0344523125',
    last_update: '2024-04-17T01:28:22.841Z',
    is_active: true,
    role_id: 'dad0eada-f17a-42bd-baee-14fe2b4c767d',
    role_name: 'Staff',
    address: ''
  }
]