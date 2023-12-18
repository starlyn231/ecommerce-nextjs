export { default } from "next-auth/middleware";



export const config = { matcher: ["/views/cart:path*", "/views/product:path*"] }
