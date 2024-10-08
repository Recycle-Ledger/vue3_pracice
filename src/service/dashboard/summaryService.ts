// services/api.ts
export interface SummaryData {
  totalStock: number;
  totalPurchased: number;
  certification: CertificationData
}

export interface CertificationData {
    inProgress: number;
    approved: number;
    reject: number;
  }

const apiUrl = import.meta.env.VITE_API_URL;

export async function getSummary(token: string): Promise<SummaryData | null> {
  const url = `${apiUrl}/api/v1/summary`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      redirect: "follow",
    });

    const result = await response.json();
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