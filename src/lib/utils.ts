export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatCurrency(
  price: number | string = 0,
  currency: string = "USD",
) {
  return Intl.NumberFormat("en", { style: "currency", currency }).format(
    Number(price),
  );
}
