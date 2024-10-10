export function formatNumber(value: number): string {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0, // 소수점 이하 자리 제거
      maximumFractionDigits: 0, // 소수점 이하 자리 제거
    }).format(value);
  }
  