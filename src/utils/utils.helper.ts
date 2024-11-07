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

export function formatDate(dateString: string): string {
  // Converte a string para um objeto Date
  const date = new Date(dateString);

  // Extrai as partes da data
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // getUTCMonth() é zero-based
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  // Formata a data conforme desejado
  return `${day}/${month}/${year} às ${hours}:${minutes}:${seconds}`;
}

export function transformItems(inputArray: any[]): any[] {
  return inputArray.map((item) => ({
    id: item._id,
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
    routeDistance: "1.2km", // Valor padrão; pode ser substituído por lógica de cálculo, se necessário
    team: { id: item.time._id, name: item.time.nome }, // `name` deve ser preenchido com dados de time, se disponíveis
    relatedAt: formatDate(item.criado_em),
    updatedAt: formatDate(item.atualizado_em),
    images: item.imagens.map(
      (img: string) =>
        "https://objectstorage.sa-saopaulo-1.oraclecloud.com/n/grukj7cph8n1/b/chatbot/o/" +
        img
    ),
  }));
}

export function transformTeams(inputArray: any[]): any[] {
  return inputArray.map((item) => ({
    id: item._id,
    name: item.nome,
  }));
}
