// app/types/payment.ts
export interface Payment {
    _id: string;
    userId: string;
    amount: number;
    remark?: string;
    user: {
      _id: string;
      name: string;
      email: string;
    };
    paymentMethod: string;
    status: 'Completed' | 'Pending' | 'Failed' | 'Refunded';
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface PaymentFilters {
    page: number;
    limit: number;
    category: string;
    paymentMethod: string;
    status: string;
    startDate: string;
    endDate: string;
    sortBy: 'createdAt' | 'amount' | 'description';
    sortOrder: 'asc' | 'desc';
  }
  
  export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    pages: number;
  }
  
  export interface PaymentStats {
    totalAmount: number;
    count: number;
    avgAmount: number;
    minAmount?: number;
    maxAmount?: number;
  }
  
  export interface PaymentsResponse {
    message: string;
    payments: Payment[];
    pagination?: PaginationInfo;
    summary?: PaymentStats;
  }