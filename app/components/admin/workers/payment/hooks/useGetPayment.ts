"use client";
import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Payment, PaymentFilters, PaginationInfo, PaymentStats, PaymentsResponse } from '@/app/types/payment';

interface UsePaymentsReturn {
  payments: Payment[];
  loading: boolean;
  error: string | null;
  filters: PaymentFilters;
  pagination: PaginationInfo;
  stats: PaymentStats;
  fetchPayments: () => Promise<void>;
  updateFilter: (key: keyof PaymentFilters, value: string | number) => void;
  updateFilters: (newFilters: Partial<PaymentFilters>) => void;
  resetFilters: () => void;
  goToPage: (pageNumber: number) => void;
  exportToCSV: () => void;
}

export const useGetPayments = (): UsePaymentsReturn => {
  const { data: session } = useSession();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PaymentFilters>({
    page: 1,
    limit: 20,
    category: '',
    paymentMethod: '',
    status: '',
    startDate: '',
    endDate: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 1
  });
  const [stats, setStats] = useState<PaymentStats>({
    totalAmount: 0,
    count: 0,
    avgAmount: 0
  });

  // Fetch payments with current filters
  const fetchPayments = useCallback(async (): Promise<void> => {
    if (!session) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/workers/payment/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch payments');
      }

      const {data} = await response.json();
      
      console.log('Fetched payments data:', data.payments);
      if (data.payments) {
        setPayments(data.payments);
        
        if (data.pagination) {
          setPagination(data.pagination);
        } else {
          setPagination({
            page: filters.page,
            limit: filters.limit,
            total: data.payments.length,
            pages: Math.ceil(data.payments.length / filters.limit)
          });
        }
        
        if (data.summary) {
          setStats(data.summary);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching payments:', err);
    } finally {
      setLoading(false);
    }
  }, [session, filters]);

  // Initial fetch and refetch when filters change
  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  // Update single filter
  const updateFilter = (key: keyof PaymentFilters, value: string | number): void => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  // Update multiple filters at once
  const updateFilters = (newFilters: Partial<PaymentFilters>): void => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1
    }));
  };

  // Reset all filters
  const resetFilters = (): void => {
    setFilters({
      page: 1,
      limit: 20,
      category: '',
      paymentMethod: '',
      status: '',
      startDate: '',
      endDate: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  };

  // Pagination controls
  const goToPage = (pageNumber: number): void => {
    if (pageNumber >= 1 && pageNumber <= pagination.pages) {
      updateFilter('page', pageNumber);
    }
  };

  // Export payments as CSV
  const exportToCSV = (): void => {
    const headers = ['Date', 'Amount', 'Description', 'Category', 'Payment Method', 'Status'];
    const csvContent = [
      headers.join(','),
      ...payments.map(payment => [
        new Date(payment.createdAt).toLocaleDateString(),
        payment.amount,
       ,
        
        payment.paymentMethod,
        payment.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return {
    payments,
    loading,
    error,
    filters,
    pagination,
    stats,
    fetchPayments,
    updateFilter,
    updateFilters,
    resetFilters,
    goToPage,
    exportToCSV
  };
};