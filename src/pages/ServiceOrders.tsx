import { useEffect, useState } from "react";
import Modal from "../components/common/Modal/Modal";
import Table from "../components/common/Table/Table";
import { IServiceOrder } from "../store/applicationStore/interfaces";
import ChangeTeamForm from "../components/forms/ChangeTeamForm/ChangeTeamForm";
import ChangeStatusForm from "../components/forms/ChangeStatusForm/ChangeStatusForm";
import { useAppDispatch } from "../store/hooks/useAppDispatch";
import { useAppSelector } from "../store/hooks/useAppSelector";
import styles from "../styles/serviceOrders.module.css";
import CarouselComponent from "../components/common/Carousel/Carousel";
import Map from "../components/common/Map/Map";
import InfoCard from "../components/common/InfoCard/InfoCard";
import { getServiceOrdersAsync } from "../store/applicationStore/thunks";
import { toast } from "react-toastify";

export default function ServiceOrders() {
  const { serviceOrders, loading, errorServiceOrders } = useAppSelector(
    (store) => store.application
  );
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    dispatch(getServiceOrdersAsync({ page: 1, perPage: 10 }));
  }, [dispatch]);

  useEffect(() => {
    toast.error(errorServiceOrders);
  }, [errorServiceOrders]);

  return (
    <>
      <Table
        title={"Ordens de Serviço"}
        isLoading={loading}
        error={errorServiceOrders}
        rows={serviceOrders}
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
      {modalPage == "team" && (
        <Modal
          maxWidth="100%"
          open={open}
          close={handleClose}
          title={modalTitle}
        >
          <ChangeTeamForm
            order={selectedOrder}
            onClose={handleClose}
            onLoading={() => {}}
          />
        </Modal>
      )}
      {modalPage == "status" && (
        <Modal
          maxWidth="100%"
          open={open}
          close={handleClose}
          title={modalTitle}
        >
          <ChangeStatusForm
            order={selectedOrder}
            onClose={handleClose}
            onLoading={() => {}}
          />
        </Modal>
      )}
      {modalPage == "map" && (
        <Modal
          maxWidth="100%"
          open={open}
          close={handleClose}
          title={modalTitle}
        >
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
        </Modal>
      )}
      {modalPage == "photos" && (
        <Modal
          maxWidth="100%"
          open={open}
          close={handleClose}
          title={modalTitle}
        >
          <div className={styles.photosContainer}>
            <CarouselComponent images={selectedOrder?.images} />
          </div>
        </Modal>
      )}
      {modalPage == "description" && (
        // adicionar campo telefone.
        <Modal
          maxWidth="600px"
          open={open}
          close={handleClose}
          title={modalTitle}
        >
          {/* adicionar campo de ultima atualização e campo atualizado e atalho para carousel de fotos */}
          <InfoCard data={selectedOrder} />
        </Modal>
      )}
    </>
  );
}
