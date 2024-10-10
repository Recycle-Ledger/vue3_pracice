export interface LedgerData {
  ucoId: number;
  countryCodeId: number;
  type: string;
  poId: number;
  poName: string;
  poStreetAddress: string;
  tdId: number;
  tdName: string;
  whName: string;
  quantity: number;
  weight: number;
  containerType: string;
  containerWeight: number;
  dischargeDate: string;
}

export interface LedgerResponse {
  content: LedgerData[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

const apiUrl = import.meta.env.VITE_API_URL;

interface ApiResponse<T> {
  code: string;
  data: T;
  message?: string;
}

// 공통 API 호출 함수
async function fetchApi<T>(url: string, token: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    const result: ApiResponse<T> = await response.json();

    if (result.code === "200") {
      return result.data;
    }

    if (result.code === "AUTH_002" || result.code === "AUTH_005") {
      return null;
    }

    console.log(result.message);
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 개별 API 함수
export async function getLedger(
  token: string,
  page: number = 1,
  size: number = 20
): Promise<LedgerResponse | null> {
  const url = `${apiUrl}/api/v1/stock?page=${page}&size=${size}`;
  return fetchApi<LedgerResponse>(url, token);
}
