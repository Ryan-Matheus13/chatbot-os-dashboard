/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { splitArrayIntoChunks } from "../../../utils/utils.helper";
import Pagination from "../Pagination/Pagination";
import ActionButton from "../ActionButton/ActionButton";
import { alpha, Chip, InputBase, Stack, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
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
  columns,
  hiddenColumns,
  onChangeStatus,
  onOpenMaps,
  onOpenPhotos,
  onViewDescription,
}) => {
  const [data, setData] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalPerPages, setTotalPerPages] = useState<number>(5);
  const handleProcessing = () => {
    const dados = splitArrayIntoChunks(rows, totalPerPages);
    setData(dados);
    setTotalPages(dados.length);
  };
  useEffect(() => {
    handleProcessing();
  }, [totalPerPages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (value: number) => {
    setCurrentPage(1);
    setTotalPerPages(value);
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
      <TableContainer component={Paper}>
        <MuiTable
          sx={{
            minWidth: 650,
            borderRadius: "7.5px",
            borderCollapse: "separate",
          }}
          aria-label="caption table"
        >
          <caption>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handlePerPageChange}
              totalItems={rows.length}
              itemsPerPage={totalPerPages}
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
          <TableBody>
            {data.length > 0 && (
              <>
                {data[currentPage - 1].map((row: any, rowIndex: number) => (
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
                                fontWeight:
                                  key == "status" || key == "relatedIn"
                                    ? "bold"
                                    : "normal",
                              }}
                            >
                              {key == "category" && (
                                <Stack direction="column" spacing={1}>
                                  <Chip
                                    label={row[key]}
                                    color="primary"
                                    variant="outlined"
                                  />
                                  <Chip
                                    label={row["subCategory"]}
                                    color="success"
                                    variant="outlined"
                                  />
                                </Stack>
                              )}
                              {key == "team" && (
                                <Stack direction="column" spacing={1}>
                                  <Chip
                                    label={row[key]}
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
                              onClick={() => onViewDescription(row.id)}
                              Icon={() => <InfoRoundedIcon fontSize="small" />}
                            />
                            <ActionButton
                              title="Ver fotos da ocorrência"
                              onClick={() => onOpenPhotos(row.id)}
                              Icon={() => <PhotosIcon fontSize="small" />}
                            />
                          </Stack>
                          <Stack direction="column" spacing={1}>
                            <ActionButton
                              title="Ver no localização no mapa"
                              onClick={() => onOpenMaps(row.id)}
                              Icon={() => <MapsIcon fontSize="small" />}
                            />
                            <ActionButton
                              title="Atualizar status da ocorrência"
                              onClick={() => onChangeStatus(row.id)}
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
