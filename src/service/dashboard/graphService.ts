export interface graphData {
  date: string;
  weight: number;
}

const apiUrl = import.meta.env.VITE_API_URL;

interface ApiResponse<T> {
  code: string;
  data: T;
}

// 공통 API 호출 함수
async function fetchGraphApi<T>(url: string, token: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      redirect: "follow",
    });

    const result: ApiResponse<T> = await response.json();
    
    if (result.code === "200") {
      return result.data;
    }

    if (result.code === "AUTH_002" || result.code === "AUTH_005") {
      return null;
    }

    console.log(result);
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// 개별 API 함수들
export async function getPurchaseGraph(token: string): Promise<graphData[] | null> {
  const url = `${apiUrl}/api/v1/purchase/graphs`;
  return fetchGraphApi<graphData[]>(url, token);
}

export async function getStockGraph(token: string): Promise<graphData[] | null> {
  const url = `${apiUrl}/api/v1/uco/stock/graphs`;
  return fetchGraphApi<graphData[]>(url, token);
}

export async function getCountryGraph(token: string): Promise<any | null> {
  const url = `${apiUrl}/api/v1/uco/stock/country-group`;
  return fetchGraphApi<any>(url, token);  // 타입을 맞춰서 지정해 주세요
}
