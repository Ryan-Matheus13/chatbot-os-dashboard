import Table from "../components/common/Table/Table";

export default function ServiceOrders() {
  return (
    <>
      <Table
        title={"Ordens de Serviço"}
        rows={[
          {
            id: "ufe7ysfr-ie6742niwf-982hbwfeui89-89sfy98rg",
            status: "EM ANÁLISE HUMANA",
            relatedByUser: "Ryan Matheus Santana de Oliveira",
            category: "Manutenção Urbana",
            subCategory: "Poda de Árvore",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, ",
            location: { lat: -5.0657261, lng: -42.7953762 },
            address:
              "Q.58 C.5A, bairro Conjunto Renascença II - 5A, Teresina, PI - 64082-550",
            routeDistance: "2.3 Km",
            team: "Equipe Delta",
          },
        ]}
        columns={[
          "Status",
          "Relatado Por",
          "Categoria",
          "Descrição",
          "Endereço",
          "Distância",
          "Equipe",
          "Ações",
        ]}
        hiddenColumns={["location", "subCategory"]}
        onChangeStatus={(id: string) => {
          console.log(id);
        }}
        onOpenMaps={(id: string) => {
          console.log(id);
        }}
        onOpenPhotos={(id: string) => {
          console.log(id);
        }}
        onViewDescription={(id: string) => {
          console.log(id);
        }}
      />
    </>
  );
}
