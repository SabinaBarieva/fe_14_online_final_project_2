import * as React from "react";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";

const Code = styled("div")({
  textAlign: "right",
  letterSpacing: "0.015em",
  color: "#9A9292",
});
const Title = styled("div")({
  fontWeight: "400",
  fontSize: "40px",
  lineHeight: "47px",
  color: "#616467",
});
const Description = styled("div")({
  fontWeight: "400",
  fontSize: "18px",
  letterSpacing: "0.015em",
  color: "#9A9292",
  margin: "10px 0",
});
const Price = styled("div")({
  fontWeight: "500",
  fontSize: "20px",
  lineHeight: "132%",
  letterSpacing: "0.015em",
  color: "#434343",
  margin: "10px 0",
});
const CountBoxes = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "46px",
  height: "46px",
  background: "#F5F7FB",
});

const ProductDescription = () => {
  return (
    <>
      <Grid container sx={{ width: "85%", margin: "0 auto" }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="https://maclove.ua/wpics/full/pic77552_1.jpg"
            alt="iPhone-11"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={7}>
          <Code>12345</Code>
          <Title>iPhone 11 64gb Black</Title>
          <Description>
            The iPhone 11 cannot be replaced by a new smartphone, it is a direct
            fit for the iPhone XR. The smartphone has halved, the dimensions
            with the front edge are smoothed. The main innovations are
            innovations in color solutions, even the same and earlier than the
            best iPhone. I clicked one snake and another modulation of the
            camera was detected, now the ultra-wide-angle lens has reached the
            wide-angle one. This allows you to create group portraits and
            beautiful panoramas. Like the process that will now win, the faster
            and more energy efficient Apple 13 Bionic. What is worth an hour of
            autonomous robots, here the company has built a crock forward and
            the smartphone is obliged to work for at least a year in the new XR
            model.
          </Description>
          <Price>Price: 100$</Price>
          <Grid container>
            <Grid item md={4} xs={12} sx={{ display: "flex", gap: "14px" }}>
              <CountBoxes
                onClick={() => {
                  alert("треба відняти 1 одиницю товару до корзини");
                }}
              >
                -
              </CountBoxes>
              <CountBoxes>1</CountBoxes>
              <CountBoxes
                onClick={() => {
                  alert("треба додати 1 одиницю товару до корзини");
                }}
              >
                +
              </CountBoxes>
            </Grid>
            <Grid item md={8} xs={12}>
              <Button
                sx={{
                  marginTop: { xs: "10px", md: "0" },
                  padding: "9px 18px",
                  backgroundColor: "#211F1C",
                  color: "#FFF",
                  borderRadius: 0,
                  border: "1px solid #211F1C",
                  "&:hover": {
                    backgroundColor: "#FFF",
                    color: "#211F1C",
                    border: "1px solid #211F1C",
                  },
                }}
                variant="contained"
                onClick={() => {
                  alert("треба додати 1 одиницю товару до корзини");
                }}
              >
                Add to basket
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default ProductDescription;