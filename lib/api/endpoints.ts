export const API = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    REQUEST_PASSWORD_RESET: "/api/auth/request-password-reset",
    RESET_PASSWORD: (token: string) => `/api/auth/reset-password/${token}`,
  },
  ADMIN: {
    USER: {
      CREATE: "/api/admin/users",
      GETALLUSERS: "/api/admin/users",
      GETCONSUMERBYID: (userId: string) =>
        `/api/admin/users/consumer/${userId}`,
      GETFARMERBYID: (userId: string) => `/api/admin/users/farmer/${userId}`,
      UPDATEUSER: (userId: string) => `/api/admin/users/${userId}`,
      DELETEUSER: (userId: string) => `/api/admin/users/${userId}`,
    },
  },
  FARMER: {
    PROFILE: {
      GETPROFILE: "/api/farmer/getProfile",
      UPDATEPROFILE: "/api/farmer/updateProfile",
    },
    PRODUCTS: {
      ADDPRODUCT: "/api/farmer/product/addProduct",
      GETPRODUCTS: "/api/farmer/product/farmerProducts",
      DELETEPRODUCTS: (productId: string) => `/api/farmer/product/${productId}`,
      GETPRODUCTBYID: (productId: string) => `/api/farmer/product/${productId}`,
    },
    ORDERS: {
      GETORDERS: "/api/farmer/order/farmer",
      UPDATESTATUS: (orderId: string) => `/api/farmer/order/updateOrderStatus/${orderId}`,
    }
  },
  CONSUMER: {
    PROFILE: {
      GETPROFILE: "/api/consumer/getProfile",
      UPDATEPROFILE: "/api/consumer/updateProfile",
    },
    PRODUCTS: {
      GETPRODUCTS: "/api/consumer/products",
      GETPRODUCTBYID: (productId: string) => `/api/consumer/${productId}`,
    },
    CART:{
      GETCART: "/api/consumer/cart/getCart",
      ADDTOCART:"/api/consumer/cart/add",
      UPDATECARTITEM:"/api/consumer/cart/update",
      REMOVEFROMCART:(cartItemId: string) => `/api/consumer/cart/remove/${cartItemId}`,
    },
    ORDER:{
      PLACEORDER: "/api/consumer/order/placeOrder",
      MYORDER: "/api/consumer/order/my",
      
    }
  },
};
