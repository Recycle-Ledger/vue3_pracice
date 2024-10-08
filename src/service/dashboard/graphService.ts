export interface PurchaseGraphData {
  date: string;
  weight: number;
}

const apiUrl = import.meta.env.VITE_API_URL;

export async function getPurchaseGraph(
  token: string
): Promise<PurchaseGraphData[] | null> {
  const url = `${apiUrl}/api/v1/purchase/graphs`;

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
