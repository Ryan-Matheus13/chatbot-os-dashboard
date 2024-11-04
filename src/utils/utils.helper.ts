/* eslint-disable @typescript-eslint/no-explicit-any */
export function splitArrayIntoChunks<T>(
  array: T[],
  chunkSize: number = 20
): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}

export function transformItems(inputArray: any[]): any[] {
  return inputArray.map((item) => ({
    id: item.id,
    osNumber: String(item.numero_os),
    status: item.status,
    relatedBy: item.usuario_id,
    category: item.categoria.tipo,
    subCategory: item.categoria.subtipo,
    description: item.descricao,
    location: {
      lat: item.localizacao.latitude,
      lng: item.localizacao.longitude,
    },
    address: item.endereco,
    routeDistance: "", // Valor padrão; pode ser substituído por lógica de cálculo, se necessário
    team: { id: "", name: item.time_alocado }, // `name` deve ser preenchido com dados de time, se disponíveis
    relatedAt: item.criado_em,
    updatedAt: item.atualizado_em,
    images: item.imagens,
  }));
}
