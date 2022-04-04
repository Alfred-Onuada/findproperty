export interface UserAuthInfo{
  id: string,
  role: 1 | 2 | 3,
}

// under the role i'm using numbers so it's a little less predictable
// 1 - Admin
// 2 - Seller
// 3 - Buyer