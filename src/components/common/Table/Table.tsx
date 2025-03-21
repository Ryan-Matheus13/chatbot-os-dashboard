/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// MODO MOBILE COM LINHAS VIRANDO CARDS
import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableProps } from "./Table.types";

import PhotosIcon from "@mui/icons-material/PhotoLibrarySharp";
import MapsIcon from "@mui/icons-material/Map";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import RefreshIcon from "@mui/icons-material/ChangeCircle";
import Pagination from "../Pagination/Pagination";
import ActionButton from "../ActionButton/ActionButton";
import { alpha, Chip, InputBase, Stack, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "../Loading/Loading";
import { useAppSelector } from "../../../store/hooks/useAppSelector";
import { useAppDispatch } from "../../../store/hooks/useAppDispatch";
import {
  pageChange,
  perPageChange,
} from "../../../store/applicationStore/actions";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "7.5px",
  border: theme.palette.mode === "dark" ? "none" : "1px solid #dcdcdc",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    // marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    width: "100% !important",
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    backgroundColor: "rgba(255, 255, 255, 0.595) !important",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Table: React.FC<TableProps> = ({
  rows,
  error,
  columns,
  hiddenColumns,
  onOpenModal,
  isLoading,
}) => {
  const applicationStore = useAppSelector((store) => store.application);
  const dispatch = useAppDispatch();

  const [data, setData] = useState<Array<any>>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    handleProcessing();
  }, [applicationStore.serviceOrders]);

  const handleProcessing = () => {
    if (applicationStore.total > applicationStore.perPage) {
      setTotalPages(applicationStore.total / applicationStore.perPage);
    } else {
      setTotalPages(1);
    }
    setData(rows);
  };

  const handlePageChange = (page: number) => {
    dispatch(pageChange(page));
  };

  const handlePerPageChange = (value: number) => {
    dispatch(pageChange(1));
    dispatch(perPageChange(value));
  };

  return (
    <div className={styles.container}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <TableContainer sx={{ position: "relative" }} component={Paper}>
        {isLoading && <Loading />}
        <MuiTable
          sx={{
            minWidth: 650,
            borderRadius: "0.5rem",
            borderCollapse: "separate",
            boxShadow: "none",
            backgroundColor: "#f8ffff",
          }}
          aria-label="caption table"
        >
          <caption style={{ backgroundColor: "#f8ffff" }}>
            <Pagination
              totalPages={totalPages}
              currentPage={applicationStore.page}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handlePerPageChange}
              totalItems={applicationStore.total}
              itemsPerPage={applicationStore.perPage}
            />
          </caption>
          <TableHead>
            <TableRow>
              {columns.map((col: string, index: number) => {
                return (
                  <TableCell key={index} className={styles.cell}>
                    {col}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          {error && (
            <div
              style={{
                display: "table-caption",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    backgroundColor: "#EE7070",
                    padding: "0.5rem 0",
                    width: "100%",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  ERROR
                </span>
              </div>
            </div>
          )}
          <TableBody sx={{ maxHeight: "400px" }}>
            {data.length > 0 && !isLoading && (
              <>
                {data.map((row: any, rowIndex: number) => (
                  <>
                    <TableRow key={rowIndex}>
                      {Object.keys(row)
                        .filter(
                          (key) => key !== "id" && !hiddenColumns.includes(key)
                        )
                        .map((key) => (
                          <>
                            <TableCell
                              style={{
                                fontWeight: key == "status" ? "bold" : "normal",
                                color: key == "status" ? "#035656" : "#555",
                              }}
                            >
                              {key == "category" && (
                                <Stack direction="column" spacing={1}>
                                  <Chip
                                    onClick={() =>
                                      onOpenModal(
                                        row,
                                        "Atualizar Categoria",
                                        "category"
                                      )
                                    }
                                    label={row[key]}
                                    color="info"
                                    variant="outlined"
                                  />
                                  <Chip
                                    onClick={() =>
                                      onOpenModal(
                                        row,
                                        "Atualizar Categoria",
                                        "category"
                                      )
                                    }
                                    label={row["subCategory"]}
                                    color="success"
                                    variant="outlined"
                                  />
                                </Stack>
                              )}
                              {key == "team" && (
                                <Stack direction="column" spacing={1}>
                                  <Chip
                                    onClick={() =>
                                      onOpenModal(row, "Atualizar Time", "team")
                                    }
                                    label={row[key].name}
                                    color="warning"
                                    variant="outlined"
                                  />
                                </Stack>
                              )}
                              {key != "category" && key != "team" && (
                                <>
                                  {row[key].length > 100
                                    ? row[key].substring(0, 100) + "..."
                                    : row[key]}
                                </>
                              )}
                            </TableCell>
                          </>
                        ))}
                      <TableCell>
                        <div className={styles.actionBtnContainer}>
                          <Stack direction="column" spacing={1}>
                            <ActionButton
                              title="Ver descrição completa"
                              onClick={() =>
                                onOpenModal(row, "", "description")
                              }
                              Icon={() => <InfoRoundedIcon fontSize="small" />}
                            />
                            <ActionButton
                              title="Ver fotos da ocorrência"
                              onClick={() =>
                                onOpenModal(
                                  row,
                                  "Fotos da Ocorrência",
                                  "photos"
                                )
                              }
                              Icon={() => <PhotosIcon fontSize="small" />}
                            />
                          </Stack>
                          <Stack direction="column" spacing={1}>
                            <ActionButton
                              title="Ver localização no mapa"
                              onClick={() =>
                                onOpenModal(
                                  row,
                                  "Localização da Ocorrência",
                                  "map"
                                )
                              }
                              Icon={() => <MapsIcon fontSize="small" />}
                            />
                            <ActionButton
                              title="Atualizar status da ocorrência"
                              onClick={() =>
                                onOpenModal(row, "Atualizar Status", "status")
                              }
                              Icon={() => <RefreshIcon fontSize="small" />}
                            />
                          </Stack>
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </div>
  );
};

export default Table;
