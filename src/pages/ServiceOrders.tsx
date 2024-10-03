/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Modal from "../components/common/Modal/Modal";
import Table from "../components/common/Table/Table";
import { IServiceOrder } from "../store/applicationStore/interfaces";
import ChangeTeamForm from "../components/forms/ChangeTeamForm/ChangeTeamForm";
import ChangeStatusForm from "../components/forms/ChangeStatusForm/ChangeStatusForm";
import { useAppDispatch } from "../store/hooks/useAppDispatch";
import { loadOrders } from "../store/applicationStore/actions";
import { useAppSelector } from "../store/hooks/useAppSelector";
import styles from "../styles/serviceOrders.module.css";
import CarouselComponent from "../components/common/Carousel/Carousel";
import Map from "../components/common/Map/Map";

export default function ServiceOrders() {
  const applicationStore = useAppSelector((store) => store.application);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalPage, setModalPage] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<IServiceOrder>();

  const handleClose = () => setOpen(false);

  const handleOpenModal = (
    order: IServiceOrder,
    title: string,
    page: string
  ) => {
    setSelectedOrder(order);
    setModalTitle(title);
    setModalPage(page);
    setOpen(true);
  };

  const handleLoading = (mode: boolean) => {
    setIsLoading(mode);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch("/orders.json");
      const orders = await response.json();
      if (orders && applicationStore.serviceOrders.length == 0) {
        dispatch(loadOrders(orders));
      }
    };

    fetchData();
    setIsLoading(false);
  }, []);

  return (
    <>
      <Table
        title={"Ordens de Serviço"}
        isLoading={isLoading}
        rows={applicationStore.serviceOrders}
        columns={[
          "Nº da Ordem",
          "Status",
          "Categoria",
          "Endereço",
          "Distância",
          "Equipe",
          "Abertura",
          "Atualização",
          "Ações",
        ]}
        hiddenColumns={[
          "location",
          "subCategory",
          "relatedBy",
          "description",
          "subCategoryId",
          "categoryId",
          "images",
        ]}
        onOpenModal={handleOpenModal}
      />
      <Modal open={open} close={handleClose} title={modalTitle}>
        {modalPage == "team" && (
          <ChangeTeamForm
            order={selectedOrder}
            onClose={handleClose}
            onLoading={handleLoading}
          />
        )}
        {modalPage == "status" && (
          <ChangeStatusForm
            order={selectedOrder}
            onClose={handleClose}
            onLoading={handleLoading}
          />
        )}
        {modalPage == "map" && (
          <div className={styles.mapContainer}>
            <Map
              zoom={14}
              onlyOneMarker={{
                lat: selectedOrder?.location.lat,
                lng: selectedOrder?.location.lng,
                category: selectedOrder?.category,
                title:
                  selectedOrder?.category + " - " + selectedOrder?.subCategory,
                description: selectedOrder?.description,
                photos: selectedOrder?.images,
              }}
            />
          </div>
        )}
        {modalPage == "photos" && (
          <div className={styles.photosContainer}>
            <CarouselComponent images={selectedOrder?.images} />
          </div>
        )}
        {modalPage == "description" && <span>description</span>}
      </Modal>
    </>
  );
}
