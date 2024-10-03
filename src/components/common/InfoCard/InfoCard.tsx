import React from "react";
import { InfoCardProps } from "./InfoCard.types";
import styles from "./InfoCard.module.css";
import { Img } from "react-image";
import { Stack, Chip, useTheme, Typography, Skeleton } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import InfoIcon from "@mui/icons-material/Info";

const InfoCard: React.FC<InfoCardProps> = ({ data }) => {
  const theme = useTheme();
  return (
    <div className={styles.container}>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={2}
      >
        {data?.images[0] && (
          <Img
            src={data?.images[0] ? data?.images[0] : ""}
            height={60}
            width={60}
            loader={<Skeleton variant="rounded" width={60} height={60} />}
          />
        )}
        <Stack direction="column" flex={1} spacing={0}>
          <Typography
            variant="h3"
            style={{
              color: theme.palette.primary.main,
            }}
          >
            #{data?.osNumber}
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.primary.light
                  : "#555",
            }}
          >
            {data?.category + " - " + data?.subCategory}
          </Typography>
        </Stack>
        <Stack direction="column" spacing={1}>
          <Chip label={data?.status} color="success" variant="outlined" />
          <Chip label={data?.relatedAt} color="warning" variant="outlined" />
        </Stack>
      </Stack>
      <hr />
      <Stack direction="column" spacing={1}>
        <Stack direction="row" alignItems={"center"} spacing={1}>
          <InfoIcon
            fontSize="small"
            style={{
              color: theme.palette.primary.main,
            }}
          />
          <Typography
            variant="subtitle1"
            style={{
              color: theme.palette.primary.main,
            }}
          >
            {"Descrição"}
          </Typography>
        </Stack>
        <Typography
          variant="body2"
          style={{
            color:
              theme.palette.mode === "dark"
                ? theme.palette.primary.light
                : "#555",
          }}
        >
          {data?.description}
        </Typography>
        <Stack direction="column" spacing={1}>
          <Stack direction="row" alignItems={"center"} spacing={1}>
            <NearMeIcon
              fontSize="small"
              style={{
                color: theme.palette.primary.main,
              }}
            />
            <Typography
              variant="subtitle1"
              style={{
                color: theme.palette.primary.main,
              }}
            >
              {"Localização | " + data?.routeDistance + " de distância"}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            style={{
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.primary.light
                  : "#555",
            }}
          >
            {data?.address}
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
};

export default InfoCard;
