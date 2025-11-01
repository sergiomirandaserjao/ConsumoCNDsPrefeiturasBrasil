export async function getCND(endpoint, cnpj) {
  const response = await fetch(`${endpoint}?cnpj=${cnpj}`);
  if (!response.ok) throw new Error("Erro ao consultar");
  return await response.json();
}
